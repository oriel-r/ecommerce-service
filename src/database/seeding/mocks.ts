import { CreatePlatformUserDto } from "src/modules/_platform/platform-users/dto/create-platform-user.dto";
import { CreateStoreDto } from "src/modules/_platform/stores/dto/create-store.dto";
import { CreateCategoryDto } from "src/modules/inventory/categories/dto/create-category.dto";
import { ProductVariant } from "src/modules/inventory/products/entities/product-variant.entity";
import { DeepPartial } from "typeorm";

export const platformUserMock: CreatePlatformUserDto = {
    email: 'admin@admin.com',
    password: 'Admin@1234',
    fullName: 'Usuario Admin',
}

export const storeMock = (platformUserId: string): CreateStoreDto => {
    
    return {
        domain: 'localhost',
        name: 'seinstalashop',
        platformUserId: platformUserId,
    }
}

export const categoriesMock = {
    Herramientas: ['Espatulas', 'Pinzas', 'Accesorios', 'Otros'],
    Consumibles: ['Pegamentos', 'Cintas']
}

export type ProductMock = {
    name: string,
    categories: string[]
    variants: DeepPartial<ProductVariant>[]
}

export const productsMock: ProductMock[] = [
    {
        name: 'Espátula de Fieltro Anti-Rayas',
        categories: ['Herramientas', 'Espatulas'],
        variants: [
            { optionName: 'Tamaño', optionValue: '10cm', price: 3500.15 },
            { optionName: 'Tamaño', optionValue: '15cm', price: 4800.00 },
        ]
    },
    {
        name: 'Pinza de Sujeción de Lona con Muelle',
        categories: ['Herramientas', 'Pinzas'],
        variants: [
            { optionName: 'Pack', optionValue: 'x4 Unidades', price: 9500.00 },
        ]
    },
    {
        name: 'Cinta Doble Faz de Alta Adherencia 3M',
        categories: ['Consumibles', 'Cintas'],
        variants: [
            { optionName: 'Ancho', optionValue: '12mm', price: 11500.00 },
            { optionName: 'Ancho', optionValue: '24mm', price: 21000.00 },
        ]
    },
    {
        name: 'Cúter de Precisión Olfa con Cuchillas Intercambiables',
        categories: ['Herramientas', 'Otros'],
        variants: [
            { optionName: 'Material', optionValue: 'Metálico', price: 8800.00 },
            { optionName: 'Material', optionValue: 'Plástico Reforzado', price: 6500.00 },
        ]
    },
    {
        name: 'Pegamento para Lonas de PVC (Adhesivo Vinílico)',
        categories: ['Consumibles', 'Pegamentos'],
        variants: [
            { optionName: 'Contenido', optionValue: '250ml', price: 14500.00 },
            { optionName: 'Contenido', optionValue: '1L', price: 49000.00 },
        ]
    },
    {
        name: 'Rodillo de Presión de Goma para Vinilos',
        categories: ['Herramientas', 'Otros'],
        variants: [
            { optionName: 'Ancho', optionValue: '10cm', price: 17800.00 },
        ]
    },
    {
        name: 'Cinta de Enmascarar de Papel (Masking Tape) 20mts',
        categories: ['Consumibles', 'Cintas'],
        variants: [
            { optionName: 'Ancho', optionValue: '24mm', price: 2900.00 },
            { optionName: 'Ancho', optionValue: '48mm', price: 5500.00 },
        ]
    },
    {
        name: 'Imanes de Neodimio para Sujeción de Gráficas',
        categories: ['Herramientas', 'Accesorios'],
        variants: [
            { optionName: 'Pack', optionValue: 'x2 Unidades', price: 12500.00 },
        ]
    },
    {
        name: 'Guantes de Algodón Anti-Huellas',
        categories: ['Herramientas', 'Accesorios'],
        variants: [
            { optionName: 'Pack', optionValue: 'Par', price: 4100.00 },
        ]
    },
    {
        name: 'Líquido Aplicador de Vinilos "Rapid Tac"',
        categories: ['Consumibles', 'Otros'],
        variants: [
            { optionName: 'Presentación', optionValue: 'Spray 1L', price: 24500.00 },
        ]
    },
    {
        name: 'Espátula "Gold" de Teflón Rígida',
        categories: ['Herramientas', 'Espatulas'],
        variants: [
            { optionName: 'Modelo', optionValue: 'Estándar', price: 5900.00 },
        ]
    },
    {
        name: 'Pinza de Depilado de Vinilo (Weeding) Punta Fina',
        categories: ['Herramientas', 'Pinzas'],
        variants: [
            { optionName: 'Punta', optionValue: 'Recta', price: 4950.00 },
            { optionName: 'Punta', optionValue: 'Curva', price: 4950.00 },
        ]
    },
    {
        name: 'Regla Metálica de Corte con Base Antideslizante',
        categories: ['Herramientas', 'Otros'],
        variants: [
            { optionName: 'Longitud', optionValue: '50cm', price: 19800.00 },
            { optionName: 'Longitud', optionValue: '100cm', price: 35500.00 },
        ]
    },
    {
        name: 'Alcohol Isopropílico para Limpieza de Superficies',
        categories: ['Consumibles', 'Otros'],
        variants: [
            { optionName: 'Volumen', optionValue: '1L', price: 9800.00 },
            { optionName: 'Volumen', optionValue: '5L', price: 42000.00 },
        ]
    },
    {
        name: 'Kit de Cuchillas de Repuesto para Cúter (10 unidades)',
        categories: ['Herramientas', 'Accesorios'],
        variants: [
            { optionName: 'Ángulo', optionValue: '30°', price: 7200.00 },
            { optionName: 'Ángulo', optionValue: '45°', price: 6800.00 },
        ]
    },
    {
        name: 'Cinta de Montaje Espumada (Foam Tape)',
        categories: ['Consumibles', 'Cintas'],
        variants: [
            { optionName: 'Rollo', optionValue: '10mts', price: 13500.00 },
        ]
    },
    {
        name: 'Espátula Flexible "Lil Chizler"',
        categories: ['Herramientas', 'Espatulas'],
        variants: [
            { optionName: 'Color', optionValue: 'Rosa', price: 2800.00 },
        ]
    },
    {
        name: 'Adhesivo en Aerosol Reposicionable 3M',
        categories: ['Consumibles', 'Pegamentos'],
        variants: [
            { optionName: 'Lata', optionValue: '305g', price: 29800.00 },
        ]
    },
    {
        name: 'Pinza Larga de Precisión para Detallado',
        categories: ['Herramientas', 'Pinzas'],
        variants: [
            { optionName: 'Tipo', optionValue: 'Anti-estática', price: 7900.00 },
        ]
    },
    {
        name: 'Termómetro Infrarrojo para Control de Temperatura',
        categories: ['Herramientas', 'Accesorios'],
        variants: [
            { optionName: 'Marca', optionValue: 'Genérico', price: 45000.00 },
        ]
    },
    {
        name: 'Cinta Métrica de Lona (5 metros)',
        categories: ['Herramientas', 'Otros'],
        variants: [
            { optionName: 'Tipo', optionValue: 'Retráctil', price: 11200.00 },
        ]
    },
    {
        name: 'Pulverizador de Presión para Líquidos Aplicadores',
        categories: ['Herramientas', 'Accesorios'],
        variants: [
            { optionName: 'Capacidad', optionValue: '1.5L', price: 14900.00 },
        ]
    },
    {
        name: 'Espátula de Goma para Bordes y Curvas',
        categories: ['Herramientas', 'Espatulas'],
        variants: [
            { optionName: 'Dureza', optionValue: 'Blanda', price: 4200.00 },
            { optionName: 'Dureza', optionValue: 'Media', price: 4200.00 },
        ]
    },
    {
        name: 'Pegamento de Cianocrilato (La Gotita) con Pincel',
        categories: ['Consumibles', 'Pegamentos'],
        variants: [
            { optionName: 'Presentación', optionValue: '5g', price: 3900.00 },
        ]
    },
    {
        name: 'Cinta de Teflón para Altas Temperaturas',
        categories: ['Consumibles', 'Cintas'],
        variants: [
            { optionName: 'Rollo', optionValue: '10mts', price: 8500.00 },
        ]
    },
    {
        name: 'Gancho de Depilado de Vinilo con Mango Ergonómico',
        categories: ['Herramientas', 'Accesorios'],
        variants: [
            { optionName: 'Marca', optionValue: 'Genérica', price: 6200.00 },
        ]
    },
    {
        name: 'Nivel de Burbuja Magnético',
        categories: ['Herramientas', 'Otros'],
        variants: [
            { optionName: 'Longitud', optionValue: '40cm', price: 16500.00 },
        ]
    },
    {
        name: 'Espátula con Imán Integrado "Mag-Roller"',
        categories: ['Herramientas', 'Espatulas'],
        variants: [
            { optionName: 'Tipo', optionValue: 'Estándar', price: 9900.00 },
        ]
    },
    {
        name: 'Limpia Contactos en Aerosol',
        categories: ['Consumibles', 'Otros'],
        variants: [
            { optionName: 'Marca', optionValue: 'Delta', price: 7500.00 },
        ]
    },
    {
        name: 'Pinza de Presión Ajustable (Perro)',
        categories: ['Herramientas', 'Pinzas'],
        variants: [
            { optionName: 'Tamaño', optionValue: '5 pulgadas', price: 12800.00 },
        ]
    }
]