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
    name: string;
    description?: string;
    longDescription?: string;
    isFeatured?: boolean;
    categories: string[];
    variants: DeepPartial<ProductVariant>[];
};

export const productsMock: ProductMock[] = [
    {
        name: 'Espátula de Fieltro Anti-Rayas',
        description: 'Espátula suave para aplicar vinilos sin dañar la superficie.',
        longDescription: 'Fabricada con un borde de fieltro de alta densidad, esta espátula permite una aplicación suave y uniforme de vinilos adhesivos sobre superficies delicadas como carrocerías de vehículos. Minimiza el riesgo de rayones y burbujas.',
        categories: ['Herramientas', 'Espatulas'],
        variants: [
            { optionName: 'Tamaño', optionValue: '10cm', price: 3500.15 },
            { optionName: 'Tamaño', optionValue: '15cm', price: 4800.00 },
        ]
    },
    {
        name: 'Pinza de Sujeción de Lona con Muelle',
        description: 'Pinza robusta para tensar y sostener lonas durante la instalación.',
        longDescription: 'Diseñada con un muelle de alta tensión y mordazas de agarre firme, esta pinza es esencial para mantener las lonas y gigantografías tensas mientras se fijan a la estructura. Su construcción metálica garantiza durabilidad.',
        categories: ['Herramientas', 'Pinzas'],
        variants: [
            { optionName: 'Pack', 
                optionValue: 'x4 Unidades', 
                price: 9500.00,
                discount: 20
             },
        ]
    },
    {
        name: 'Cinta Doble Faz de Alta Adherencia 3M',
        description: 'Cinta adhesiva transparente para uniones permanentes y resistentes.',
        longDescription: 'Cinta acrílica de doble cara marca 3M, diseñada para uniones de alta resistencia en interiores y exteriores. Ideal para montar cartelería y unir materiales diversos como metal, vidrio y plásticos.',
        categories: ['Consumibles', 'Cintas'],
        variants: [
            { optionName: 'Ancho', optionValue: '12mm', price: 11500.00, discount: 15 },
            { optionName: 'Ancho', optionValue: '24mm', price: 21000.00, discount: 15 },
        ]
    },
    {
        name: 'Cúter de Precisión Olfa con Cuchillas Intercambiables',
        description: 'Herramienta de corte esencial para acabados limpios en vinilo y papel.',
        longDescription: 'Cúter profesional marca Olfa, reconocido por su filo duradero y su sistema de bloqueo seguro. Perfecto para cortes rectos y detallados en una amplia variedad de materiales gráficos.',
        categories: ['Herramientas', 'Otros'],
        isFeatured: true,
        variants: [
            { optionName: 'Material', optionValue: 'Metálico', price: 8800.00 },
            { optionName: 'Material', optionValue: 'Plástico Reforzado', price: 6500.00 },
        ]
    },
    {
        name: 'Pegamento para Lonas de PVC (Adhesivo Vinílico)',
        description: 'Adhesivo específico para uniones soldadas en frío de lonas vinílicas.',
        longDescription: 'Fórmula de secado rápido que crea una unión química permanente entre dos piezas de lona de PVC, tan resistente como una soldadura por calor. Ideal para realizar dobladillos y uniones en gigantografías.',
        categories: ['Consumibles', 'Pegamentos'],
        isFeatured: true,
        variants: [
            { optionName: 'Contenido', optionValue: '250ml', price: 14500.00, },
            { optionName: 'Contenido', optionValue: '1L', price: 49000.00 },
        ]
    },
    {
        name: 'Rodillo de Presión de Goma para Vinilos',
        description: 'Rodillo para asegurar la máxima adherencia del vinilo a la superficie.',
        longDescription: 'Herramienta con rueda de goma maciza que permite aplicar una presión uniforme sobre el vinilo recién aplicado, eliminando burbujas de aire y asegurando un contacto total del adhesivo con el sustrato.',
        categories: ['Herramientas', 'Otros'],
        isFeatured: true,
        variants: [
            { optionName: 'Ancho', optionValue: '10cm', price: 17800.00 },
        ]
    },
    {
        name: 'Cinta de Enmascarar de Papel (Masking Tape) 20mts',
        description: 'Cinta de baja adherencia para posicionamiento y protección.',
        longDescription: 'Cinta de papel crepado que se adhiere firmemente pero se retira sin dejar residuos de adhesivo. Perfecta para fijar temporalmente gráficas, crear guías de instalación o proteger áreas durante el trabajo.',
        categories: ['Consumibles', 'Cintas'],
        variants: [
            { optionName: 'Ancho', optionValue: '24mm', price: 2900.00 },
            { optionName: 'Ancho', optionValue: '48mm', price: 5500.00 },
        ]
    },
    {
        name: 'Imanes de Neodimio para Sujeción de Gráficas',
        description: 'Imanes potentes para sostener vinilos en superficies metálicas.',
        longDescription: 'Pequeños pero extremadamente potentes, estos imanes con mango permiten sostener sin manos las gráficas sobre vehículos o paneles metálicos, facilitando el posicionamiento antes de la aplicación final.',
        categories: ['Herramientas', 'Accesorios'],
        variants: [
            { optionName: 'Pack', optionValue: 'x2 Unidades', price: 12500.00 },
        ]
    },
    {
        name: 'Guantes de Algodón Anti-Huellas',
        description: 'Guantes finos para manipular materiales sin dejar marcas.',
        longDescription: 'Fabricados en algodón sin pelusa, estos guantes evitan que la grasa y las huellas de los dedos se transfieran a los vinilos y superficies impresas, asegurando una instalación limpia y profesional.',
        categories: ['Herramientas', 'Accesorios'],
        variants: [
            { optionName: 'Pack', optionValue: 'Par', price: 4100.00 },
        ]
    },
    {
        name: 'Líquido Aplicador de Vinilos "Rapid Tac"',
        description: 'Solución que facilita la aplicación y reposicionamiento de vinilos.',
        longDescription: 'Fórmula líquida que se pulveriza sobre la superficie y el adhesivo del vinilo, permitiendo deslizar y reposicionar la gráfica hasta encontrar la ubicación perfecta. Se evapora sin afectar la adherencia final.',
        categories: ['Consumibles', 'Otros'],
        variants: [
            { optionName: 'Presentación', optionValue: 'Spray 1L', price: 24500.00 },
        ]
    },
    {
        name: 'Espátula "Gold" de Teflón Rígida',
        description: 'Espátula de alta durabilidad para aplicaciones exigentes.',
        longDescription: 'Una espátula estándar de la industria, fabricada en teflón que combina rigidez para una buena presión y un deslizamiento suave. Resistente a solventes y al desgaste, ideal para uso diario intensivo.',
        categories: ['Herramientas', 'Espatulas'],
        variants: [
            { optionName: 'Modelo', optionValue: 'Estándar', price: 5900.00 },
        ]
    },
    {
        name: 'Pinza de Depilado de Vinilo (Weeding) Punta Fina',
        description: 'Herramienta de precisión para remover excesos de vinilo de corte.',
        longDescription: 'Con una punta afilada y fina, esta pinza permite levantar y retirar con facilidad las pequeñas piezas de vinilo sobrantes después del ploteado de corte (proceso de "depilado"). Indispensable para trabajos de rotulación.',
        categories: ['Herramientas', 'Pinzas'],
        variants: [
            { optionName: 'Punta', optionValue: 'Recta', price: 4950.00 },
            { optionName: 'Punta', optionValue: 'Curva', price: 4950.00 },
        ]
    },
    {
        name: 'Regla Metálica de Corte con Base Antideslizante',
        description: 'Regla robusta de seguridad para cortes rectos y precisos.',
        longDescription: 'Regla de acero o aluminio de alta resistencia con una base de goma que evita el deslizamiento durante el corte. Posee un borde protector para los dedos, garantizando seguridad y precisión al usar un cúter.',
        categories: ['Herramientas', 'Otros'],
        variants: [
            { optionName: 'Longitud', optionValue: '50cm', price: 19800.00 },
            { optionName: 'Longitud', optionValue: '100cm', price: 35500.00 },
        ]
    },
    {
        name: 'Alcohol Isopropílico para Limpieza de Superficies',
        description: 'Solvente de alta pureza para desengrasar superficies antes de la aplicación.',
        longDescription: 'Alcohol de rápida evaporación que elimina eficazmente polvo, grasa y otros contaminantes de la superficie de aplicación, garantizando una adherencia óptima del vinilo. No deja residuos.',
        categories: ['Consumibles', 'Otros'],
        isFeatured: true,
        variants: [
            { optionName: 'Volumen', optionValue: '1L', price: 9800.00 },
            { optionName: 'Volumen', optionValue: '5L', price: 42000.00 },
        ]
    },
    {
        name: 'Kit de Cuchillas de Repuesto para Cúter (10 unidades)',
        description: 'Repuestos afilados para mantener la precisión de corte.',
        longDescription: 'Blíster con 10 cuchillas de acero de alta calidad, compatibles con los principales modelos de cúteres de precisión. Disponibles en diferentes ángulos para adaptarse a distintos tipos de corte y materiales.',
        categories: ['Herramientas', 'Accesorios'],
        variants: [
            { optionName: 'Ángulo', optionValue: '30°', price: 7200.00 },
            { optionName: 'Ángulo', optionValue: '45°', price: 6800.00 },
        ]
    },
    {
        name: 'Cinta de Montaje Espumada (Foam Tape)',
        description: 'Cinta de doble cara con cuerpo de espuma para montar sobre superficies irregulares.',
        longDescription: 'Cinta con un núcleo de espuma que se adapta a las irregularidades, ideal para montar cartelería liviana, letras corpóreas o paneles sobre paredes no perfectamente lisas. Ofrece una fuerte adherencia.',
        categories: ['Consumibles', 'Cintas'],
        variants: [
            { optionName: 'Rollo', optionValue: '10mts', price: 13500.00 },
        ]
    },
    {
        name: 'Espátula Flexible "Lil Chizler"',
        description: 'Pequeña espátula para remover adhesivos y detalles.',
        longDescription: 'Herramienta de plástico pequeña y flexible pero resistente, ideal para raspar residuos de adhesivo, remover calcomanías antiguas o para aplicar presión en áreas de difícil acceso. No daña la pintura.',
        categories: ['Herramientas', 'Espatulas'],
        variants: [
            { optionName: 'Color', optionValue: 'Rosa', price: 2800.00 },
        ]
    },
    {
        name: 'Adhesivo en Aerosol Reposicionable 3M',
        description: 'Pegamento en spray que permite pegar y despegar múltiples veces.',
        longDescription: 'Aerosol que crea una capa de adhesivo de baja adherencia, ideal para crear plantillas temporales o para posicionar elementos livianos antes de una fijación permanente. No deja residuos.',
        categories: ['Consumibles', 'Pegamentos'],
        variants: [
            { optionName: 'Lata', optionValue: '305g', price: 29800.00 },
        ]
    },
    {
        name: 'Pinza Larga de Precisión para Detallado',
        description: 'Pinza extendida para alcanzar lugares de difícil acceso.',
        longDescription: 'Pinza de acero inoxidable con un cuerpo largo y puntas finas, diseñada para manipular pequeñas piezas de vinilo en el interior de letras o en áreas complejas de una gráfica vehicular.',
        categories: ['Herramientas', 'Pinzas'],
        variants: [
            { optionName: 'Tipo', optionValue: 'Anti-estática', price: 7900.00 },
        ]
    },
    {
        name: 'Termómetro Infrarrojo para Control de Temperatura',
        description: 'Pistola láser para medir la temperatura de la superficie sin contacto.',
        longDescription: 'Herramienta indispensable para trabajos con vinilo termo-transferible o para post-calentado (post-heating) de vinilos de car wrapping, asegurando que el material alcance la temperatura correcta para su curado.',
        categories: ['Herramientas', 'Accesorios'],
        variants: [
            { optionName: 'Marca', optionValue: 'Genérico', price: 45000.00 },
        ]
    },
    {
        name: 'Cinta Métrica de Lona (5 metros)',
        description: 'Cinta métrica flexible para medir superficies curvas.',
        longDescription: 'A diferencia de las cintas métricas metálicas, esta cinta de lona o fibra de vidrio se adapta a las curvas de un vehículo o pared, permitiendo mediciones precisas para centrar y alinear las gráficas.',
        categories: ['Herramientas', 'Otros'],
        variants: [
            { optionName: 'Tipo', optionValue: 'Retráctil', price: 11200.00 },
        ]
    },
    {
        name: 'Pulverizador de Presión para Líquidos Aplicadores',
        description: 'Botella con bomba manual para una pulverización fina y constante.',
        longDescription: 'Recipiente rellenable con una bomba de presión manual que permite aplicar líquidos (como agua con jabón o soluciones aplicadoras) de manera uniforme y controlada sobre grandes superficies.',
        categories: ['Herramientas', 'Accesorios'],
        variants: [
            { optionName: 'Capacidad', optionValue: '1.5L', price: 14900.00 },
        ]
    },
    {
        name: 'Espátula de Goma para Bordes y Curvas',
        description: 'Espátula blanda para sellar los bordes del vinilo.',
        longDescription: 'Diseñada con una punta de goma flexible, esta herramienta es perfecta para aplicar presión en los bordes y contornos de una gráfica, asegurando un sellado perfecto en áreas complejas y previniendo que se levante.',
        categories: ['Herramientas', 'Espatulas'],
        variants: [
            { optionName: 'Dureza', optionValue: 'Blanda', price: 4200.00 },
            { optionName: 'Dureza', optionValue: 'Media', price: 4200.00 },
        ]
    },
    {
        name: 'Pegamento de Cianocrilato (La Gotita) con Pincel',
        description: 'Adhesivo instantáneo para reparaciones rápidas y pequeñas.',
        longDescription: 'Pegamento instantáneo de alta resistencia, útil para reparaciones de emergencia en soportes o para fijar pequeños elementos plásticos de cartelería. La presentación con pincel permite una aplicación precisa.',
        categories: ['Consumibles', 'Pegamentos'],
        variants: [
            { optionName: 'Presentación', optionValue: '5g', price: 3900.00 },
        ]
    },
    {
        name: 'Cinta de Teflón para Altas Temperaturas',
        description: 'Cinta resistente al calor para proteger superficies durante el termo-sellado.',
        longDescription: 'Cinta con un adhesivo de silicona que resiste altas temperaturas, utilizada para proteger las placas de las planchas de calor o para reparaciones temporales en equipamiento de sellado.',
        categories: ['Consumibles', 'Cintas'],
        variants: [
            { optionName: 'Rollo', optionValue: '10mts', price: 8500.00 },
        ]
    },
    {
        name: 'Gancho de Depilado de Vinilo con Mango Ergonómico',
        description: 'Herramienta de depilado diseñada para un uso cómodo y prolongado.',
        longDescription: 'Similar a la pinza de depilado, pero con forma de gancho y un mango más grande y ergonómico, lo que reduce la fatiga en la mano durante trabajos de depilado de vinilo a gran escala.',
        categories: ['Herramientas', 'Accesorios'],
        variants: [
            { optionName: 'Marca', optionValue: 'Genérica', price: 6200.00 },
        ]
    },
    {
        name: 'Nivel de Burbuja Magnético',
        description: 'Nivel para asegurar que las instalaciones queden perfectamente horizontales.',
        longDescription: 'Un nivel de burbuja es esencial para instalar cartelería y gráficas de pared de forma recta. La base magnética permite adherirlo a estructuras metálicas para tener las manos libres.',
        categories: ['Herramientas', 'Otros'],
        variants: [
            { optionName: 'Longitud', optionValue: '40cm', price: 16500.00 },
        ]
    },
    {
        name: 'Espátula con Imán Integrado "Mag-Roller"',
        description: 'Espátula que se adhiere a superficies metálicas para un fácil acceso.',
        longDescription: 'Una espátula de aplicación estándar que cuenta con dos potentes imanes integrados en su cuerpo. Permite al instalador "pegar" la herramienta a la carrocería de un vehículo mientras usa ambas manos para posicionar el vinilo.',
        categories: ['Herramientas', 'Espatulas'],
        variants: [
            { optionName: 'Tipo', optionValue: 'Estándar', price: 9900.00 },
        ]
    },
    {
        name: 'Limpia Contactos en Aerosol',
        description: 'Solvente dieléctrico para limpieza de componentes electrónicos.',
        longDescription: 'Aunque no es para gráficas, es un consumible común en talleres para el mantenimiento de plotters de corte e impresoras, limpiando cabezales, conectores y sensores sin dejar residuos y evaporándose rápidamente.',
        categories: ['Consumibles', 'Otros'],
        variants: [
            { optionName: 'Marca', optionValue: 'Delta', price: 7500.00 },
        ]
    },
    {
        name: 'Pinza de Presión Ajustable (Perro)',
        description: 'Pinza de bloqueo para una sujeción extremadamente firme.',
        longDescription: 'Una pinza que se bloquea en su posición con una gran fuerza, ideal para sostener bastidores, marcos o materiales pesados durante el montaje o pegado. Su mecanismo de liberación rápida facilita su uso.',
        categories: ['Herramientas', 'Pinzas'],
        variants: [
            { optionName: 'Tamaño', optionValue: '5 pulgadas', price: 12800.00 },
        ]
    }
]