# syntax=docker/dockerfile:1.5

# -------------------- ETAPA 1: DEPENDENCIAS (deps) --------------------
# Propósito: Instalar TODAS las dependencias para maximizar el uso del caché.
FROM node:22-slim AS deps

WORKDIR /app
COPY package*.json ./

# Siempre instala todas las dependencias para que las herramientas de build estén disponibles.
RUN --mount=type=cache,id=npm-cache,target=/root/.npm \
    npm ci --no-audit --no-fund --loglevel=error


# -------------------- ETAPA 2: CONSTRUCTOR (builder) --------------------
# Propósito: Construir la app y ejecutar la limpieza adecuada para el entorno.
FROM deps AS builder

# Acepta el argumento de entorno. Puede ser 'production', 'staging', o cualquier otro.
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY tsconfig*.json nest-cli.json ./
COPY src ./src

# 1. CONSTRUIR SIEMPRE LA APLICACIÓN
RUN --mount=type=cache,id=npm-cache,target=/root/.npm \
    echo ">>> Building the application..." && \
    npm run build

# 2. LIMPIEZA MULTI-NIVEL (if / elif / else)
RUN if [ "$NODE_ENV" = "production" ]; then \
        echo ">>> Production environment: Performing FULL cleanup..."; \
        npm prune --omit=dev && \
        npm dedupe --omit=dev && \
        # Limpieza agresiva: BORRA .d.ts y .map
        find node_modules -type f \( -name "*.md" -o -name "LICENSE*" -o -name "*.d.ts" -o -name "*.map" \) -delete && \
        find node_modules -type d \( -name "test" -o -name "__tests__" \) -exec rm -rf {} +; \
    elif [ "$NODE_ENV" = "staging" ]; then \
        echo ">>> Staging environment: Performing INTERMEDIATE cleanup..."; \
        npm dedupe && \
        find node_modules -type f \( -name "*.md" -o -name "LICENSE*" -o -name "*.map" \) -delete && \
        find node_modules -type d \( -name "test" -o -name "__tests__" \) -exec rm -rf {} +; \
    else \
        echo ">>> Development environment ('$NODE_ENV'): Skipping cleanup..."; \
    fi


# -------------------- ETAPA 3: EJECUCIÓN (runtime) --------------------
# Propósito: Crear la imagen final, mínima y segura, usando distroless.
FROM gcr.io/distroless/nodejs22-debian12

WORKDIR /app
USER nonroot

# Copia los artefactos ya preparados (con el nivel de limpieza correcto).
COPY --from=builder --chown=nonroot:nonroot /app/node_modules ./node_modules
COPY --from=builder --chown=nonroot:nonroot /app/dist          ./dist

EXPOSE 8080
CMD ["dist/main.js"]