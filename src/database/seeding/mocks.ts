import { CreatePlatformUserWithStoreDto } from "src/modules/_platform/platform-users/dto/create-platform-user-with-store.dto";
import { CreateProductVariantDto } from "src/modules/inventory/products/dto/create-product-variant.dto";
import { ProductVariant } from "src/modules/inventory/products/entities/product-variant.entity";
import { DeepPartial } from "typeorm";
import { config as dotenvConfig }from 'dotenv'

dotenvConfig({ path: '.env.development.local' });

const adminUsername = process.env.TEST_ADMIN_USERNAME
const adminPass = process.env.TEST_ADMIN_PASSWORD

const getData = () => {
    if(!adminPass || !adminUsername) throw Error
    return {
        email: adminUsername,
        password: adminPass
    }
}


export const platformUserMock: CreatePlatformUserWithStoreDto = {
    email: getData().email,
    password: getData().password,
    fullName: 'SeInstala Shop',
    storeName: 'seinstalashop',
    domain: 'localhost',
}

export const defaultStoreMock = {
    name: 'seinstalashop',
    domain: 'localhost',
};

export const categoriesMock = {
    Herramientas: ['Cutters y filos', 'Scrapers', 'Buffers y fundas', 'Accesorios', 'Otros'],
    Consumibles: ['Guantes', 'Vonixx', 'Cintas']
}

export type ProductMock = {
    name: string;
    description?: string;
    longDescription?: string;
    isFeatured?: boolean;
    categories: string[];
    variants: Record<string, string | string[] | number | boolean>[];
};

export const productsMock: ProductMock[] = [
    {
        name: 'Guantes Protools',
        description: 'Guantes Protools para wrapping de vehículos.',
        categories: ['Consumibles', 'Guantes'],
        variants: [
            { isDefault: true, optionName: 'Talle', optionValue: '8', sku: 'PG008', listPrice:11140.41 },
            { optionName: 'Talle', optionValue: '9', sku: 'PG009', listPrice:11140.41 },
        ]
    },
    {
        name: 'Cutter Extra largo Semi-Profesional',
        description: 'Cutter de 25mm para trabajos profesionales y semi-profesionales.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '25mm' ,sku:'15-063XD', listPrice: 15559.63 },
        ]
    },
    {
        name: 'Scraper Mini de plastico EXFAK',
        description: 'Scraper de plástico económico para trabajos de limpieza y preparación de superficies.',
        categories: ['Herramientas', 'Scrapers'],
        variants: [
            {   images: ['https://storage.googleapis.com/ecommerce-uploads/FOTO%2037_processed.webp'],
                isDefault: true, optionName: 'Material', optionValue: 'Plastico', sku: '15-078', listPrice: 4338.58 },
        ]
    },
    {
        name: 'Scraper de plastico EXFAK',
        description: 'Scraper de plástico de alta resistencia para uso profesional.',
        categories: ['Herramientas', 'Scrapers'],
        variants: [
            {   images: ['https://storage.googleapis.com/ecommerce-uploads/FOTO%2038_processed.webp'],
                isDefault: true, optionName: 'Material', optionValue: 'Plastico', sku: '15-079', listPrice: 16866.43 },
        ]
    },
    {
        name: 'Filo P/ Cutter de 9mm (Pack x10) PRO/CS/CB/HOBBY',
        description: 'Repuesto de filos para cutters de 9mm en acero al carbono.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Tipo/Angulo', optionValue: 'Profesional 45°', sku: '2061SPRO', listPrice: 5436.29,
                images: ['https://storage.googleapis.com/ecommerce-uploads/FOTO%2060_processed.webp']
            },
            { optionName: 'Tipo/Angulo', optionValue: 'Profesional 30°', sku: '206130', listPrice: 12928.61,
                images: ['https://storage.googleapis.com/ecommerce-uploads/FOTO%2061_processed.webp']
            },
            { optionName: 'Tipo/Angulo', optionValue: 'Black 45°', sku: '2061CS', listPrice: 12691.76 },
            { optionName: 'Tipo/Angulo', optionValue: 'Cs 30°', sku: '2061BL30', listPrice: 2718.14 },
            { images: ['https://storage.googleapis.com/ecommerce-uploads/FOTO%2064_processed.webp']
                , optionName: 'Tipo/Angulo', optionValue: 'Hobby 45°', sku: '2061HY', listPrice: 2038.61 }
        ]
    },
    {
        name: 'Filo P/ Cutter de 18mm (Pack x10)',
        description: 'Repuesto de filos de acero al carbono de 45° para cutters de 18mm.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Tipo', optionValue: 'Profesional', sku: '2060SPRO', listPrice: 8537.76,
                images: ['https://storage.googleapis.com/ecommerce-uploads/FOTO%2057_processed.webp']
             },
            {optionName: 'Tipo', optionValue: 'Hobby' ,sku:'2060HY', listPrice: 2718.14,
                images: ['https://storage.googleapis.com/ecommerce-uploads/FOTO%2063_processed.webp']
            }
        ]
    },
    {
        name: 'Filo P/ Cutter de 25mm (Pack x10)',
        description: 'Repuesto de filos de acero al carbono de 45° para cutters de 25mm.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Tipo', optionValue: 'Semi-Profesional', sku: '2063SPRO', listPrice: 19915.63},
        ]
    },
    {
        name: 'Filo de Scraper P/ Superficies blandas EXFAK',
        description: 'Repuesto de filos de scraper para superficies blandas color naranja.',
        longDescription: 'Filo para quitar adhesivo de superficies blandas. Indicada para carrocería de autos, madera acabada, plástico y superficies con pintura.',
        categories: ['Herramientas', 'Scrapers'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '8-47PLJ', listPrice: 923.47,
                images: ['https://storage.googleapis.com/ecommerce-uploads/repuesto%20naranja_processed.webp']
            },
        ]
    },
    {
        name: 'Filo de Scraper P/ Superficies rigidas EXFAK',
        description: 'Repuesto de plástico de color amarillo para scrapers.',
        longDescription: 'Filo para quitar adhesivo de superficies rígidas. Indicada para vidrio, granito y mármol, metales, madera sin terminar. Color amarillo',
        categories: ['Herramientas', 'Scrapers'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '8-47PLAST', listPrice: 923.47},
        ]
    },
    {
        name: 'Filo de Scraper P/ Superficies duras EXFAK',
        description: 'Láminas de plástico de color negro para scrapers.',
        longDescription: 'De uso industrial para quitar adhesivo de superficies duras. Lamina mas rígida y mas duradera.',
        categories: ['Herramientas', 'Scrapers'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '847PBK', listPrice: 923.47 },
        ]
    },
    {
        name: 'Filo de acero al carbono P/ Scraper EXFAK',
        description: 'Filos de acero al carbono para scrapers.',
        longDescription: 'Ideal para quitar pegamento o vinilo de las superficies evitando rayaduras y daños',
        categories: ['Herramientas', 'Scrapers'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '847C12', listPrice: 923.47,
                images: ['https://storage.googleapis.com/ecommerce-uploads/repuesto%20metal_processed.webp']
            },
        ]
    },
    {
        name: 'Cinta de corte Knifeless Lineal x50m CFCUT',
        description: 'Cinta lineal Knifeless para corte de vinilo.',
        longDescription: 'Logra instalaciones más rápidas y con un acabado perfecto. Esta herramienta te permite realizar cortes precisos sin arriesgarte a rayar el automóvil, ya que no necesitarás utilizar un cúter.',
        categories: ['Consumibles', 'Cintas'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: 'CFCUT', listPrice: 33651.57,
                images: ['https://storage.googleapis.com/ecommerce-uploads/FOTO%2053_processed.webp']
            },
        ]
    },
    {
        name: 'Cutter de vinilo EXFAK',
        description: 'Cutter especializado para el corte de vinilos.',
        longDescription: 'Ahorra tiempo y consigue resultados impecables con este cortador de forros. Es una herramienta esencial que facilita la eliminación del papel protector de los adhesivos, haciendo que la aplicación sea más rápida y profesional.',
        categories: ['Herramientas', 'Otros'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '15012', listPrice: 9583.20 },
        ]
    },
    {
        name: 'Buffers P/ Espatulas Exfak',
        description: 'Protección Anti-rayas para Vinilos, elegí entre varios modelos',
        longDescription: 'Optimiza tus instalaciones de vinilo con los buffers de fieltro Exfak. Elige entre los modelos Americana, Trapezoidal o Rectangular para un deslizamiento suave y una aplicación sin rayas.',
        categories: ['Herramientas', 'Buffers y fundas'],
        variants: [
            { optionName: 'P/ Espatula', optionValue: 'Trapezoidal 135mm' , sku: '57345', listPrice: 12912.18,
                images: ['https://storage.googleapis.com/ecommerce-uploads/buffer%20para%20espatula%201.35mm%2057345_processed.webp']
            },
            { optionName: 'P/ Espatula', optionValue: 'Trapezoidal BIG 190mm' , sku: '57352', listPrice: 14270.26,
                images: ['https://storage.googleapis.com/ecommerce-uploads/bufferpara%20espatula%201.90mm%2057352_processed.webp']
            },
            { optionName: 'P/ Espatula', optionValue: 'Rectangular 190mm' , sku: '57353', listPrice: 14270.26,
                images: ['https://storage.googleapis.com/ecommerce-uploads/Fieltro%20big%20rectangular%20amarillo%205%20und%20%2057353_processed.webp']
            },
            { isDefault: true, optionName: 'P/ Espatula', optionValue: 'Americana 135mm' , sku: '57354', listPrice: 12580.36,
                images: ['https://storage.googleapis.com/ecommerce-uploads/buffer%20para%20espatula%201.35mm%2057354_processed.webp']
            },    
        ]
    },
    {
        name: 'Cutter Profesional 9mm marca EXFAK',
        description: 'Cutter de 9mm para uso profesional, opciones para filo de 30° o 45°.',
        longDescription: 'La herramienta definitiva para el uso diario y los trabajos más exigentes. Construido con un cuerpo metálico y un sistema de bloqueo superior, este cutter está diseñado para ofrecer máxima durabilidad y un rendimiento inquebrantable. La elección de los expertos.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '15-0439 - 30°', listPrice: 19497.46,
                images: ['https://storage.googleapis.com/ecommerce-uploads/FOTO%2054_processed.webp']
            },
            { optionName: 'Modelo', optionValue: '15-061PRO - 45°', listPrice: 18643.68 },
        ]
    },
    {
        name: 'Cutter de 9mm Semi-pro marca EXFAK',
        description: 'Cutter extra fino para trabajos de precisión.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '15-400', listPrice: 10297.58,
                images: ['https://storage.googleapis.com/ecommerce-uploads/FOTO%2022_processed.webp']
             },
        ]
    },
    {
        name: 'Cutter extra largo Semi-pro marca EXFAK',
        description: 'Cutter extra largo 25mm con cuerpo de goma.',
        longDescription: 'Diseñado para la máxima potencia y control. Este cutter de 25mm cuenta con una empuñadura de goma para un agarre antideslizante',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '15063XD', listPrice: 15559.63 },
        ]
    },
    {
        name: 'Cutter de 9mm Hobby marca EXFAK',
        description: 'Cutter de 9mm versatil y ecnomico para principiantes. Varias opciones',
        longDescription: 'La herramienta esencial para tus proyectos creativos y manualidades. Ligero, manejable y preciso, es perfecto para cortar papel, cartulina y vinilo. Disponible con hoja estrecha para cortes generales o hoja extra fina para el máximo detalle.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '15061HO - 45°', listPrice: 6098.40,
                images: ['https://storage.googleapis.com/ecommerce-uploads/FOTO%2055_processed.webp']
            },
            { optionName: 'Modelo', optionValue: '15-409 - 30°', listPrice: 2038.61}
        ]
    },
    {
        name: 'Restaurador/Protector de plasticos V-Plastic Pro',
        description: 'Marca Vonixx.',
        longDescription: 'Revestimiento semipermanente, desarrollado exclusivamente para el tratamiento de superficies plásticas, con el fin de renovar y restaurar el plástico por un período de hasta tres años. Promueve la resistencia y la protección UV. También se puede utilizar sobre plásticos nuevos para evitar la degradación del material y prolongar hasta tres veces su vida útil',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { isDefault: true, optionName: 'Contenido', optionValue: '50nl', sku:'2018015', listPrice: 137538.10 },
        ]
    },
    {
        name: 'ClayBar - Barra descontaminante Vintex 100g',
        description: 'Barra descontaminante para la limpieza de superficies.',
        longDescription: 'Elimina fácilmente contaminantes como pulverizados de pintura, savia y residuos industriales de la pintura, cristales y cromados.',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2011093', listPrice: 23268.00,
                images: ['https://storage.googleapis.com/ecommerce-uploads/FOTO%2047_processed.webp']
            },
        ]
    },
    {
        name: 'Limpiador V-Eco Fast 500ml',
        description: 'Limpiador desengrasante biodegradable.',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2011070', listPrice: 19051.40 },
        ]
    },
    {
        name: 'Shampoo V-FLOC P/ lavado de vehiculos',
        description: 'Shampoo de alta performance para lavado de vehículos.',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { optionName: 'Tamaño', optionValue: '1.5L' ,sku: '2011004', listPrice: 42319.41 },
            { isDefault: true, optionName: 'Tamaño', optionValue: '500ml' ,sku: '2011069', listPrice: 21159.71},
        ]
    },
    {
        name: 'Revividor de ceras, selladores y siliconas Strike',
        description: 'Removedor de ceras, selladores y siliconas.',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2018010', listPrice: 42319.41 },
            { optionName: 'Modelo', optionValue: '2018020', listPrice: 95218.68 },
        ]
    },
    {
        name: 'Recubrimiento SiO2-PRO',
        description: 'Producto para mantenimiento de superficies con recubrimiento de sílice.',
        longDescription: 'El toque final para tus servicios de vitrificado. Este spray de mantenimiento añade un tacto aterciopelado que los clientes notan al instante, potencia la hidrorepelencia y eleva la calidad de tu entrega, protegiendo tu aplicación principal.',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { isDefault: true, optionName: 'Presentación', optionValue: '500ml' ,sku:'2018005', listPrice: 52228.44 },
        ]
    },
    {
        name: 'Blend Spray Wax 500 ml',
        description: 'Cera en spray para vehículos, varias opciones.',
        longDescription: 'Ofrece a tus clientes lo mejor de dos mundos: la durabilidad cerámica del SiO2 y el brillo profundo de la carnaúba. Protección premium de hasta siete meses en una sola aplicación, ideal para un servicio de encerado superior.',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { isDefault: true, optionName: 'Uso', optionValue: 'Universal' , sku: '2026005', listPrice: 52899.26 },
            { optionName: 'Uso', optionValue: 'Color negro' , sku: '2026002', listPrice: 52899.26 },
        ]
    },
    {
        name: 'Revelax 500ml',
        description: 'Limpiador de superficies para detailing.',
        longDescription: 'La herramienta de inspección final. Revela cualquier imperfección oculta y prepara la superficie para garantizar el anclaje perfecto de tu trabajo.',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2009036', listPrice: 32582.88
 },
        ]
    },
    {
        name: 'Pulidor V40 500ml 4 en 1',
        description: 'Corte, reparación, brillo y protección',
        longDescription: 'El compuesto "todo en uno" definitivo. Realiza el corte, refinado, pulido y encerado con un solo producto, simplemente cambiando la boina. Ahorra tiempo y entrega un acabado hidrofóbico y brillante gracias a su fórmula con carnaúba.',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2009033', listPrice: 38083.64},
        ]
    },
    {
        name: 'Cutter de liner Doble C/ mango largo EXFAK',
        description: 'Cutter con mango largo para corte de liner de vinilo.',
        longDescription: 'Este instrumento está diseñado para que el instalador pueda cortar el papel protector del vinilo con total seguridad, evitando cualquier daño o corte accidental sobre el material.',
        categories: ['Herramientas', 'Otros'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '15-010MD', listPrice: 43108.98,
                images: ['https://storage.googleapis.com/ecommerce-uploads/FOTO%2024_processed.webp']
            },
        ]
    },
    {
        name: 'Cutter de liner C/ mango largo EXFAK',
        description: 'Cutter con mango largo para corte de liner de vinilo.',
        longDescription: 'Corta el liner, no el vinilo. La herramienta esencial para exponer el adhesivo con precisión y seguridad, facilitando las instalaciones más complejas sin dañar el material.',
        categories: ['Herramientas', 'Otros'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '15-010M', listPrice: 43108.98,
                images: ['https://storage.googleapis.com/ecommerce-uploads/FOTO%2017_processed.webp']
            },
        ]
    },
    {
        name: 'Kit iman STRONG (1 par)',
        description: 'Kit de imanes extra fuertes para sujetar vinilo.',
        longDescription: 'Herramienta indispensablepara el ploteo, carwrap, gráfica y polarizados vehicular. incluye dos imanes ',
        categories: ['Herramientas', 'Accesorios'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '50025', listPrice: 41817.40,
            images: ['https://storage.googleapis.com/ecommerce-uploads/FOTO%206_processed.webp']
            }
        ]
    },
    {
        name: 'iman para vidrio EXTRA FUERTE',
        description: 'Barra magnética azul extra fuerte marca EXFAK.',
        longDescription: 'Imán en forma de barra para vidrio. Este imán es muy potente y tiene gran área de apoyo. Es apto para utilizar en vidrio',
        categories: ['Herramientas', 'Accesorios'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '50029', listPrice: 42775.92 },
        ]
    },
    {
        name: 'Iman P/ colgar soplador 66MM (Grande)',
        description: 'Imán grande para colgar sopladores.',
        longDescription: 'Este imán extra grande y resistente esta desarrollado especialmente para sostener la pistola de calor durante el ploteo.',
        categories: ['Herramientas', 'Accesorios'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '97384', listPrice: 81823.10 },
        ]
    }
]
