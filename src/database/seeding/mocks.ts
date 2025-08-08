import { CreatePlatformUserWithStoreDto } from "src/modules/_platform/platform-users/dto/create-platform-user-with-store.dto";
import { CreatePlatformUserDto } from "src/modules/_platform/platform-users/dto/create-platform-user.dto";
import { CreateStoreDto } from "src/modules/_platform/stores/dto/create-store.dto";
import { CreateCategoryDto } from "src/modules/inventory/categories/dto/create-category.dto";
import { CreateProductVariantDto } from "src/modules/inventory/products/dto/create-product-variant.dto";
import { ProductVariant } from "src/modules/inventory/products/entities/product-variant.entity";
import { DeepPartial } from "typeorm";

export const platformUserMock: CreatePlatformUserWithStoreDto = {
    email: 'administracion@seintalashop.com.ar',
    password: 'Admin@1234*',
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
    Consumibles: ['Guantes', 'Vonixx', 'Cintas']
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
            { isDefault: true, optionName: 'Talle', optionValue: '8', sku: 'PG008', listPrice:11140.41 },
            { optionName: 'Talle', optionValue: '9', sku: 'PG009', listPrice:11140.41 },
        ]
    },
    {
        name: 'CUTTER EXTRA LARGO SEMI PROFESIONAL',
        description: 'Cutter de 25mm para trabajos profesionales y semi-profesionales.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '15-063XD', listPrice: 15368.46 },
        ]
    },
    {
        name: 'SCRAPER MINI PLASTICO ECONOMICO',
        description: 'Scraper de plástico económico para trabajos de limpieza y preparación de superficies.',
        categories: ['Herramientas', 'Scrapers'],
        variants: [
            { isDefault: true, optionName: 'Material', optionValue: 'Plastico', sku: '15-078', listPrice: 4257.46 },
        ]
    },
    {
        name: 'SCRAPER PLASTICO',
        description: 'Scraper de plástico de alta resistencia para uso profesional.',
        categories: ['Herramientas', 'Scrapers'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '15-079', listPrice: 16532.05 },
        ]
    },
    {
        name: 'FILO P/ CUTTER ACERO CARBONO PROFESIONAL 45° (10 Un.)',
        description: 'Repuesto de filos de acero al carbono de 45° para cutters de 9mm.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Angulo', optionValue: '45', sku: '2061SPRO', listPrice: 5335.14 },
        ]
    },
    {
        name: 'FILO P/ CUTTER ACERO CARBONO PROFESIONAL 30° (10 Un.)',
        description: 'Repuesto de filos de acero al carbono de 30° para cutters de 9mm.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Angulo', optionValue: '30°', sku: '206130', listPrice: 12691.76 },
        ]
    },
    {
        name: 'FILO P/ CUTTER ACERO CARBONO 45° CS (10 Un.)',
        description: 'Repuesto de filos de acero al carbono de 45° para cutters de 9mm.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2061CS', listPrice: 2667.98 },
        ]
    },
    {
        name: 'FILO P/ CUTTER ACERO CARBONO NEGRO 30° (10 un)',
        description: 'Repuesto de filos de acero al carbono negros de 30° para cutters de 9mm.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2061BL30', listPrice: 14709.78 },
        ]
    },
    {
        name: 'FILO P/ CUTTER ACERO CARBONO 45° HOBBY (10 Un.)',
        description: 'Repuesto de filos de acero al carbono de 45° para cutters de 9mm de uso hobby.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2061HY', listPrice: 2002.81 },
        ]
    },
    {
        name: 'FILO P/ CUTTER ACERO CARBONO PROFESIONAL 45° (10 Un.)',
        description: 'Repuesto de filos de acero al carbono de 45° para cutters de 18mm.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2060SPRO', listPrice: 8356.70 },
        ]
    },
    {
        name: 'FILO P/ CUTTER ACERO CARBONO HOBBY 45° (10 Un.)',
        description: 'Repuesto de filos de acero al carbono de 45° para cutters de 18mm de uso hobby.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2060HY', listPrice: 2667.98
 },
        ]
    },
    {
        name: 'FILO P/ CUTTER ACERO CARBONO SEMI PROFESIONAL 45° (10 Un.)',
        description: 'Repuesto de filos de acero al carbono de 45° para cutters de 25mm.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2063SPRO', listPrice: 19578.66
 },
        ]
    },
    {
        name: 'FILO DE PLASTICO NARANJA P/SCRAPER',
        description: 'Filos de plástico de color naranja para scrapers.',
        categories: ['Herramientas', 'Scrapers'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '8-47PLJ', listPrice: 909.51 },
        ]
    },
    {
        name: 'FILO DE PLASTICO AMARILLO P/SCRAPER',
        description: 'Filos de plástico de color amarillo para scrapers.',
        categories: ['Herramientas', 'Scrapers'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '8-47PLAST', listPrice: 909.51 },
        ]
    },
    {
        name: 'LAMINA DE PLASTICO NEGRA P/SCRAPER',
        description: 'Láminas de plástico de color negro para scrapers.',
        categories: ['Herramientas', 'Scrapers'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '847PBK', listPrice: 909.51 },
        ]
    },
    {
        name: 'FILO DE ACERO CARBONO P/SCRAPER',
        description: 'Filos de acero al carbono para scrapers.',
        categories: ['Herramientas', 'Scrapers'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '847C12', listPrice: 909.51 },
        ]
    },
    {
        name: 'Cinta de corte Knifeless Lineal x 50 Mts (CF CUT)',
        description: 'Cinta lineal Knifeless para corte de vinilo.',
        categories: ['Consumibles', 'Cintas'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: 'CFCUT', listPrice: 33651.57 },
        ]
    },
    {
        name: 'CUTTER DE VINILO',
        description: 'Cutter especializado para el corte de vinilos.',
        categories: ['Herramientas', 'Otros'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '15012', listPrice: 9428.39 },
        ]
    },
    {
        name: 'BUFFER PARA ESP. TRAPEZOIDAL (135mm)',
        description: 'Buffer para espátulas trapezoidales de 135mm.',
        categories: ['Herramientas', 'Buffers y fundas'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '57345', listPrice: 12659.20
 },
        ]
    },
    {
        name: 'BUFFER PARA ESP. TRAPEZOIDAL BIG (190mm)',
        description: 'Buffer para espátulas trapezoidales grandes de 190mm.',
        categories: ['Herramientas', 'Buffers y fundas'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '57352', listPrice: 14007.18
 },
        ]
    },
    {
        name: 'BUFFER PARA ESP.BIG RECTANGULAR (190mm)',
        description: 'Buffer para espátulas rectangulares grandes de 190mm.',
        categories: ['Herramientas', 'Buffers y fundas'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '57353', listPrice: 14007.18
 },
        ]
    },
    {
        name: 'BUFFER PARA ESP. AMERICANA (135mm)',
        description: 'Buffer para espátulas americanas de 135mm.',
        categories: ['Herramientas', 'Buffers y fundas'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '57354', listPrice: 12326.41
 },
        ]
    },
    {
        name: 'CUTTER ESTRECHO PROFESIONAL',
        description: 'Cutter de 9mm para uso profesional.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '15-0439', listPrice: 17203.20
 },
        ]
    },
    {
        name: 'CUTTER EXTRA FINO SEMI PROFESIONAL',
        description: 'Cutter extra fino para trabajos de precisión.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '15-400', listPrice: 10106.24
 },
        ]
    },
    {
        name: 'CUTTER ESTRECHO PROFESIONAL',
        description: 'Cutter de 9mm para uso profesional.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '15-061PRO', listPrice: 18311.91
 },
        ]
    },
    {
        name: 'CUTTER ESTRECHO HOBBY',
        description: 'Cutter de 9mm para uso hobby.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '15061HO', listPrice: 5964.00
 },
        ]
    },
    {
        name: 'CUTTER EXTRA FINO HOBBY',
        description: 'Cutter extra fino para uso hobby.',
        categories: ['Herramientas', 'Cutters y filos'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '15-409', listPrice: 2002.81
 },
        ]
    },
    {
        name: 'V-Plastic Pro 50ml',
        description: 'Protector de plásticos de alta duración.',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2018015', listPrice: 135353.34
 },
        ]
    },
    {
        name: 'ClayBar - Barra descontaminante Vintex 100g',
        description: 'Barra descontaminante para la limpieza de superficies.',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2011093', listPrice: 22855.51
 },
        ]
    },
    {
        name: 'V-Eco Fast 500ml',
        description: 'Limpiador desengrasante biodegradable.',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2011070', listPrice: 18714.95
 },
        ]
    },
    {
        name: 'V-FLOC 1500ml',
        description: 'Shampoo de alta performance para lavado de vehículos.',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2011004', listPrice: 41489.48
 },
        ]
    },
    {
        name: 'V-FLOC 500ml',
        description: 'Shampoo de alta performance para lavado de vehículos.',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2011069', listPrice: 20744.74
 },
        ]
    },
    {
        name: 'STRIKE 500ml',
        description: 'Removedor de ceras, selladores y siliconas.',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2018010', listPrice: 41489.48
 },
        ]
    },
    {
        name: 'Strike 1.5L',
        description: 'Removedor de ceras, selladores y siliconas en formato de 1.5L.',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2018020', listPrice: 93427.40
 },
        ]
    },
    {
        name: 'SiO2-PRO 500ml',
        description: 'Producto para mantenimiento de superficies con recubrimiento de sílice.',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2018005', listPrice: 51368.60
 },
        ]
    },
    {
        name: 'Blend Black Spray Wax 500 ml',
        description: 'Cera en spray para vehículos de color negro.',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2026005', listPrice: 51268.80 },
        ]
    },
    {
        name: 'Blend Spray Wax 500ml',
        description: 'Cera en spray para todo tipo de vehículos.',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2026002', listPrice: 52001.21
 },
        ]
    },
    {
        name: 'Revelax 500ml',
        description: 'Limpiador de superficies para detailing.',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2009036', listPrice: 31957.10
 },
        ]
    },
    {
        name: 'V40 500ml',
        description: 'Abrillantador de alta calidad para pinturas.',
        categories: ['Consumibles', 'Vonixx'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '2009033', listPrice: 37400.10
 },
        ]
    },
    {
        name: 'CUTTER DE LINER MANGO LARGO',
        description: 'Cutter con mango largo para corte de liner de vinilo.',
        categories: ['Herramientas', 'Otros'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '15-010M', listPrice: 33800.97
 },
        ]
    },
    {
        name: 'KIT IMAN STRONG',
        description: 'Kit de imanes fuertes para sujetar vinilo.',
        categories: ['Herramientas', 'Accesorios'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '50025', listPrice: 40896.00
 },
        ]
    },
    {
        name: 'MAGNETO BARRA AZUL EXTRA FUERTE',
        description: 'Barra magnética azul extra fuerte.',
        categories: ['Herramientas', 'Accesorios'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '50029', listPrice: 41992.34
 },
        ]
    },
    {
        name: 'IMAN PARA COLGAR SOPLADOR 66MM BIG',
        description: 'Imán grande para colgar sopladores.',
        categories: ['Herramientas', 'Accesorios'],
        variants: [
            { isDefault: true, optionName: 'Modelo', optionValue: '97384', listPrice: 80426.97
 },
        ]
    }
]
