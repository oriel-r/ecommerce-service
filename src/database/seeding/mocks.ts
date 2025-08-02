import { CreatePlatformUserWithStoreDto } from "src/modules/_platform/platform-users/dto/create-platform-user-with-store.dto";
import { CreatePlatformUserDto } from "src/modules/_platform/platform-users/dto/create-platform-user.dto";
import { CreateStoreDto } from "src/modules/_platform/stores/dto/create-store.dto";
import { CreateCategoryDto } from "src/modules/inventory/categories/dto/create-category.dto";
import { CreateProductVariantDto } from "src/modules/inventory/products/dto/create-product-variant.dto";
import { ProductVariant } from "src/modules/inventory/products/entities/product-variant.entity";
import { DeepPartial } from "typeorm";

export const platformUserMock: CreatePlatformUserWithStoreDto = {
    email: 'admin@admin.com',
    password: 'Admin@1234',
    fullName: 'Usuario Admin',
    storeName: 'seinstalashop',
    domain: 'localhost',
}

export const defaultStoreMock = {
    name: 'seinstalashop',
    domain: 'localhost',
};

export const categoriesMock = {
    Herramientas: ['Cutters y filos', 'Scrapers', 'Buffers y fundas', 'Accesorios', 'Otros'],
    Consumibles: ['Guantes', 'Vonixx']
}

export type ProductMock = {
    name: string;
    description?: string;
    longDescription?: string;
    isFeatured?: boolean;
    categories: string[];
    variants: CreateProductVariantDto[];
};

export const productsMock: ProductMock[] = [
    {
        name: 'PROTOOLS WRAP GLOVES / Guantes Protools',
        description: 'Guantes Protools para wrapping de vehículos.',
        categories: ['Consumibles', 'Guantes'],
        variants: [
            { isDefault: true, optionName: 'Talle', optionValue: '8', sku: 'PG008', price: 10983.50 },
            { optionName: 'Talle', optionValue: '9', sku: 'PG009', price: 10983.50 },
        ]
    },
    {
        name: 'CUTTER EXTRA LARGO SEMI PROFESIONAL',
        description: 'Cutter de 25mm para trabajos profesionales y semi-profesionales.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '15-063XD', price: 15152.00 },
        ]
    },
    {
        name: 'SCRAPER MINI PLASTICO ECONOMICO',
        description: 'Scraper de plástico económico para trabajos de limpieza y preparación de superficies.',
        categories: ['Herramientas', 'Scrapers'],
        variants: [
            { isDefault: true, optionName: 'Material', optionValue: 'Plastico', sku: '15-078', price: 4197.90 },
        ]
    },
    {
        name: 'SCRAPER PLASTICO',
        description: 'Scraper de plástico de alta resistencia para uso profesional.',
        categories: ['Herramientas', 'Scrapers'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '15-079', price: 16299.20 },
        ]
    },
    {
        name: 'FILO P/ CUTTER ACERO CARBONO PROFESIONAL 45° (10 Un.)',
        description: 'Repuesto de filos de acero al carbono de 45° para cutters de 9mm.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Angulo', optionValue: '45', sku: '2061SPRO', price: 5260.80 },
        ]
    },
    {
        name: 'FILO P/ CUTTER ACERO CARBONO PROFESIONAL 30° (10 Un.)',
        description: 'Repuesto de filos de acero al carbono de 30° para cutters de 9mm.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Angulo', optionValue: '30°', sku: '206130', price: 12513.20 },
        ]
    },
    {
        name: 'FILO P/ CUTTER ACERO CARBONO 45° CS (10 Un.)',
        description: 'Repuesto de filos de acero al carbono de 45° para cutters de 9mm.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2061CS', price: 2630.40 },
        ]
    },
    {
        name: 'FILO P/ CUTTER ACERO CARBONO NEGRO 30° (10 un)',
        description: 'Repuesto de filos de acero al carbono negros de 30° para cutters de 9mm.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2061BL30', price: 14502.60 },
        ]
    },
    {
        name: 'FILO P/ CUTTER ACERO CARBONO 45° HOBBY (10 Un.)',
        description: 'Repuesto de filos de acero al carbono de 45° para cutters de 9mm de uso hobby.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2061HY', price: 1974.60 },
        ]
    },
    {
        name: 'FILO P/ CUTTER ACERO CARBONO PROFESIONAL 45° (10 Un.)',
        description: 'Repuesto de filos de acero al carbono de 45° para cutters de 18mm.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2060SPRO', price: 8239.00 },
        ]
    },
    {
        name: 'FILO P/ CUTTER ACERO CARBONO HOBBY 45° (10 Un.)',
        description: 'Repuesto de filos de acero al carbono de 45° para cutters de 18mm de uso hobby.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2060HY', price: 2630.40 },
        ]
    },
    {
        name: 'FILO P/ CUTTER ACERO CARBONO SEMI PROFESIONAL 45° (10 Un.)',
        description: 'Repuesto de filos de acero al carbono de 45° para cutters de 25mm.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2063SPRO', price: 19302.90 },
        ]
    },
    {
        name: 'FILO DE PLASTICO NARANJA P/SCRAPER',
        description: 'Filos de plástico de color naranja para scrapers.',
        categories: ['Herramientas', 'Scrapers'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '8-47PLJ', price: 896.70 },
        ]
    },
    {
        name: 'FILO DE PLASTICO AMARILLO P/SCRAPER',
        description: 'Filos de plástico de color amarillo para scrapers.',
        categories: ['Herramientas', 'Scrapers'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '8-47PLAST', price: 896.70 },
        ]
    },
    {
        name: 'LAMINA DE PLASTICO NEGRA P/SCRAPER',
        description: 'Láminas de plástico de color negro para scrapers.',
        categories: ['Herramientas', 'Scrapers'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '847PBK', price: 896.70 },
        ]
    },
    {
        name: 'FILO DE ACERO CARBONO P/SCRAPER',
        description: 'Filos de acero al carbono para scrapers.',
        categories: ['Herramientas', 'Scrapers'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '847C12', price: 896.70 },
        ]
    },
    {
        name: 'Cinta de corte Knifeless Lineal x 50 Mts (CF CUT)',
        description: 'Cinta lineal Knifeless para corte de vinilo.',
        categories: ['Consumibles', 'Cintas'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: 'CFCUT', price: 33177.60 },
        ]
    },
    {
        name: 'CUTTER DE VINILO',
        description: 'Cutter especializado para el corte de vinilos.',
        categories: ['Herramientas', 'Otros'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '15012', price: 9295.00 },
        ]
    },
    {
        name: 'BUFFER PARA ESP. TRAPEZOIDAL (135mm)',
        description: 'Buffer para espátulas trapezoidales de 135mm.',
        categories: ['Herramientas', 'Buffers y fundas'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '57345', price: 12480.90 },
        ]
    },
    {
        name: 'BUFFER PARA ESP. TRAPEZOIDAL BIG (190mm)',
        description: 'Buffer para espátulas trapezoidales grandes de 190mm.',
        categories: ['Herramientas', 'Buffers y fundas'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '57352', price: 13809.90 },
        ]
    },
    {
        name: 'BUFFER PARA ESP.BIG RECTANGULAR (190mm)',
        description: 'Buffer para espátulas rectangulares grandes de 190mm.',
        categories: ['Herramientas', 'Buffers y fundas'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '57353', price: 13809.90 },
        ]
    },
    {
        name: 'BUFFER PARA ESP. AMERICANA (135mm)',
        description: 'Buffer para espátulas americanas de 135mm.',
        categories: ['Herramientas', 'Buffers y fundas'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '57354', price: 12157.80 },
        ]
    },
    {
        name: 'CUTTER ESTRECHO PROFESIONAL',
        description: 'Cutter de 9mm para uso profesional.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '15-0439', price: 16960.90 },
        ]
    },
    {
        name: 'CUTTER EXTRA FINO SEMI PROFESIONAL',
        description: 'Cutter extra fino para trabajos de precisión.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '15-400', price: 9963.90 },
        ]
    },
    {
        name: 'CUTTER ESTRECHO PROFESIONAL',
        description: 'Cutter de 9mm para uso profesional.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '15-061PRO', price: 18054.00 },
        ]
    },
    {
        name: 'CUTTER ESTRECHO HOBBY',
        description: 'Cutter de 9mm para uso hobby.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '15061HO', price: 5880.00 },
        ]
    },
    {
        name: 'CUTTER EXTRA FINO HOBBY',
        description: 'Cutter extra fino para uso hobby.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '15-409', price: 1974.60 },
        ]
    },
    {
        name: 'V-Plastic Pro 50ml',
        description: 'Protector de plásticos de alta duración.',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2018015', price: 133446.96 },
        ]
    },
    {
        name: 'ClayBar - Barra descontaminante Vintex 100g',
        description: 'Barra descontaminante para la limpieza de superficies.',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2011093', price: 22533.60 },
        ]
    },
    {
        name: 'V-Eco Fast 500ml',
        description: 'Limpiador desengrasante biodegradable.',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2011070', price: 18451.36 },
        ]
    },
    {
        name: 'V-FLOC 1500ml',
        description: 'Shampoo de alta performance para lavado de vehículos.',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2011004', price: 40905.12 },
        ]
    },
    {
        name: 'V-FLOC 500ml',
        description: 'Shampoo de alta performance para lavado de vehículos.',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2011069', price: 20452.56 },
        ]
    },
    {
        name: 'STRIKE 500ml',
        description: 'Removedor de ceras, selladores y siliconas.',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2018010', price: 40905.12 },
        ]
    },
    {
        name: 'Strike 1.5L',
        description: 'Removedor de ceras, selladores y siliconas en formato de 1.5L.',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2018020', price: 92111.52 },
        ]
    },
    {
        name: 'SiO2-PRO 500ml',
        description: 'Producto para mantenimiento de superficies con recubrimiento de sílice.',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2018005', price: 50645.10 },
        ]
    },
    {
        name: 'Blend Black Spray Wax 500 ml',
        description: 'Cera en spray para vehículos de color negro.',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2026005', price: 51268.80 },
        ]
    },
    {
        name: 'Blend Spray Wax 500ml',
        description: 'Cera en spray para todo tipo de vehículos.',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2026002', price: 51268.80 },
        ]
    },
    {
        name: 'Revelax 500ml',
        description: 'Limpiador de superficies para detailing.',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2009036', price: 31507.00 },
        ]
    },
    {
        name: 'V40 500ml',
        description: 'Abrillantador de alta calidad para pinturas.',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2009033', price: 36873.34 },
        ]
    },
    {
        name: 'CUTTER DE LINER MANGO LARGO',
        description: 'Cutter con mango largo para corte de liner de vinilo.',
        categories: ['Herramientas', 'Otros'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '15-010M', price: 33324.90 },
        ]
    },
    {
        name: 'KIT IMAN STRONG',
        description: 'Kit de imanes fuertes para sujetar vinilo.',
        categories: ['Herramientas', 'Accesorios'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '50025', price: 40320.00 },
        ]
    },
    {
        name: 'MAGNETO BARRA AZUL EXTRA FUERTE',
        description: 'Barra magnética azul extra fuerte.',
        categories: ['Herramientas', 'Accesorios'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '50029', price: 41400.90 },
        ]
    },
    {
        name: 'IMAN PARA COLGAR SOPLADOR 66MM BIG',
        description: 'Imán grande para colgar sopladores.',
        categories: ['Herramientas', 'Accesorios'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '97384', price: 79294.20 },
        ]
    }
]
