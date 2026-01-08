export type Tier = 'Normal' | 'Standard' | 'Premium';

export interface Brand {
    name: string;
    description: string;
    logo: string;
}

export interface Service {
    id: string;
    name: string;
    description: string;
    basePrice: number | string;
    image: string;
}

export interface MenuServiceItem {
    name: string;
    price: string | number;
    description?: string;
    isPremium?: boolean;
    isMaintenance?: boolean; // New flag to hide "commodity" services from main view
}

export interface MenuCategory {
    category: string;
    items: MenuServiceItem[];
}

export interface CategoryDetails {
    tier: Tier;
    label?: string;
    priceMultiplier: number;
    stylist: string;
    products: string;
    privacy: string;
    beverage: string;
    brands: Brand[];
    priceRange: string;
}

export const TIERS: Record<Tier, CategoryDetails> = {
    Normal: {
        tier: 'Normal',
        priceMultiplier: 1,
        stylist: "Associate Technician",
        products: "Standard Professional",
        privacy: "Open Gallery",
        beverage: "Hydration Service",
        priceRange: "₹",
        brands: [
            { name: "L'Oreal", description: "Standard Care", logo: "" },
            { name: "Lotus", description: "Herbal", logo: "" }
        ]
    },
    Standard: {
        tier: 'Standard',
        priceMultiplier: 1.5,
        stylist: "Senior Architect",
        products: "Premium International",
        privacy: "Semi-Private Bay",
        beverage: "Artisan Coffee / Infusions",
        priceRange: "₹₹",
        brands: [
            { name: "Schwarzkopf", description: "Advanced Tech", logo: "" },
            { name: "O3+", description: "Pro Skin", logo: "" }
        ]
    },
    Premium: {
        tier: 'Premium',
        label: "Sovereign",
        priceMultiplier: 2.5,
        stylist: "Artist-in-Chief",
        products: "Couture Global Imports",
        privacy: "Biometric Vault",
        beverage: "Gourmet / Rare Vintages",
        priceRange: "₹₹₹",
        brands: [
            { name: "Kérastase", description: "Couture Hair", logo: "" },
            { name: "Dyson", description: "Styling", logo: "" },
            { name: "Forest Essentials", description: "Ayurveda", logo: "" }
        ]
    }
};

export const SALON_MENU: MenuCategory[] = [
    {
        category: "Structural Architecture",
        items: [
            {
                name: "The 90-Minute Reconstruction",
                price: "Investments from ₹5,500",
                description: "PROTOCOL: Geometric analysis > Bond-Repair Infusion > Precision Calibration. For those with chemically compromised cortex structures.",
                isPremium: true
            },
            {
                name: "The Scientific Cleanse",
                price: "₹2,200",
                description: "PROTOCOL: Ultrasonic Debris Removal > pH Balancing > Hydration Seal. Solves accumulated scalp toxicity."
            },
            {
                name: "Chromatic Layering (Bespoke)",
                price: "Consultation Required",
                description: "PROTOCOL: Pigment Theory Analysis > Ammonia-Free Deposit > Gloss Locking. Zero-damage colourization.",
                isPremium: true
            },
            {
                name: "Keratin Polymerization",
                price: "Starts @ ₹8,000",
                description: "PROTOCOL: Formaldehyde-Free Smoothing > Thermal Sealing. Transforms unmanageable texture into silk."
            },
        ]
    },
    {
        category: "Epidermal Resurfacing",
        items: [
            {
                name: "The Glass Skin Protocol",
                price: "₹4,500",
                description: "TARGET: Dullness & Texture. METHOD: Ultrasonic Exfoliation > Gold-Peptide Infusion. RESULT: Hyper-reflective surface.",
                isPremium: true
            },
            {
                name: "Melanin Correction System",
                price: "₹5,200",
                description: "TARGET: Hyperpigmentation. METHOD: Clinical Brightening Agents > LED Photo-Therapy. RESULT: Uniform tone."
            },
            {
                name: "High-Pressure Oxygenation",
                price: "₹3,500",
                description: "TARGET: Cellular Asphyxiation. METHOD: 98% Pure O2 Infusion. RESULT: Instant event-ready plumpness."
            },
        ]
    },
    {
        category: "Bridal Operations",
        items: [
            {
                name: "The Sovereign Blueprint",
                price: "Strictly By Application",
                description: "6-Month operational timeline managing every visible square inch. Includes dermatology & dietary coordination.",
                isPremium: true
            },
            {
                name: "The Engagement Profile",
                price: "₹18,000",
                description: "High-Definition sculpting for 4K lens capture. Sweat-resistant, flash-optimized."
            },
        ]
    },
    {
        category: "Extremity Restoration",
        items: [
            { name: "Velvet Touch Restoration", price: "₹4,000", description: "Medical-grade peel and hydration for hands. Reverses visibly aged texture." },
            { name: "Clinical Pedicure", price: "₹2,500", description: "Fungal prevention and callus removal using surgical tools. Not a standard soak." }
        ]
    }
];

export const SERVICES: Service[] = [
    {
        id: 's1',
        name: 'Structural Architecture',
        description: 'A transformative cutting session based on face geometry and lifestyle physics. Includes deep-cleanse.',
        basePrice: "Investments from ₹1,200",
        image: '/services/haircut.png'
    },
    {
        id: 's2',
        name: 'Epidermal Glass Ritual',
        description: 'Our signature restorative protocol using ultrasonic exfoliation and nan-gold serums.',
        basePrice: "Investments from ₹3,500",
        image: '/services/facial.png'
    },
    {
        id: 's3',
        name: 'Extremity Restoration',
        description: 'The ultimate hand and foot ritual featuring organic peels and breathable gel technology.',
        basePrice: "Investments from ₹2,000",
        image: '/services/manicure.png'
    }
];

export const TIME_SLOTS = [
    "10:00 - PRIORITY", "12:00 - ALLOCATED", "15:00 - ALLOCATED", "17:00 - WAITLIST", "19:00 - PRIORITY"
];

// REPLACING TESTIMONIALS WITH CLINICAL STANDARDS MOCK DATA
export const TESTIMONIALS = [
    { name: "Protocol #841", role: "Hygiene Scale", text: "Sterilization Audit Passed: 99.99% pathogen clearance via Autoclave & UV-C." },
    { name: "Biometric Scan", role: "Result", text: "Client 092 recorded 44% increase in hair tensile strength after structural repair." },
    { name: "Privacy Log", role: "Status", text: "Suite 4 maintained <30dB variance specifically for neuro-divergent relaxation." }
];

export const MEMBERSHIPS = [
    {
        name: "Restricted",
        price: "INVITE ONLY",
        perks: ["Access to Booking Engine", "Quarterly Audit", "Waitlist Priority"]
    },
    {
        name: "Estate",
        price: "₹45,000 /yr",
        perks: ["20% Ritual Benefit", "Dedicated Concierge", "Guaranteed Suite Privacy", "Global Product Access"]
    },
    {
        name: "Sovereign",
        price: "₹95,000 /yr",
        perks: ["30% Ritual Benefit", "Chauffeur Port-to-Port", "Artist-in-Chief Oversight", "At-Residence availability"]
    }
];

export const EXPERIENCE_STEPS = [
    { step: "01", title: "Arrival Sanctuary", desc: "A transition from chaos to silence. Aromatherapy-diffused linens and a private concierge greeting." },
    { step: "02", title: "Biometric Audit", desc: "Medical-grade AI analysis of texture and porosity across 10 million data points." },
    { step: "03", title: "The Vault", desc: "Total isolation suites designed for focus. No mirrors until the final reveal." },
    { step: "04", title: "Master Curation", desc: "Artist-In-Chief executes the treatment plan dictated by your biometric data." },
    { step: "05", title: "Digital Passport", desc: "Depart with a cloud-stored preservation routine and curated home essentials." }
];

export const NOT_FOR_SERVICES = [
    "We do not cater to the hurried or the bargain-hunter.",
    "We do not negotiate on clinical hygiene protocols.",
    "We do not perform 'quick fixes' meant to last a day.",
    "We do not serve customers; we treat private members."
];

export const MANIFESTO = {
    quote: "We Engineer The Face You Show The World.",
    author: "Clinical Director",
    standard: "Daily intake is strictly capped at 8 individuals. This ensures zero deviation from our surgical-grade standards."
};

export const TRANSFORMATIONS = [
    {
        title: "Follicular Reconstruction",
        category: "Hair Artistry",
        before: "/services/haircut.png",
        after: "/services/haircut.png",
        metric: "+320% Density Index"
    },
    {
        title: "Epidermal Glass-Level",
        category: "Skin Precision",
        before: "/services/facial.png",
        after: "/services/facial.png",
        metric: "+94% Moisture Retention"
    }
];

export const SANCTUARY_SPACES = [
    {
        title: "The Private Vault",
        desc: "A singular isolation suite designed for absolute focus. Features medical-grade ergonomics and climate calibration.",
        image: "/private_sanctuary_vault_1767659401538.png"
    },
    {
        title: "The Sterilization Lab",
        desc: "Surgical-grade hygiene infrastructure. Every tool processed through 12-step UV and thermal audit.",
        image: "/hygiene_protocol_lab_1767659419309.png"
    }
];

export const HYGIENE_PROTOCOLS = [
    { step: "01", title: "ULTRASONIC AUDIT", desc: "Chemical-free removal of micro-contaminants using precision sound waves." },
    { step: "02", title: "UV-C INFUSION", desc: "Continuous DNA-level sterilization in pressurized glass cabinets." },
    { step: "03", title: "SEALED HAND-OFF", desc: "Tools unsealed by the Artist only in your presence." }
];

export const CONCERNS = [
    { id: 'c1', type: 'Hair', label: 'Follicular Thinning', icon: '🧬' },
    { id: 'c2', type: 'Hair', label: 'Scalp Inflammation', icon: '🔥' },
    { id: 'c3', type: 'Hair', label: 'Structural Damage', icon: '🥀' },
    { id: 'c4', type: 'Skin', label: 'Epidermal Lipid Loss', icon: '💧' },
    { id: 'c5', type: 'Skin', label: 'Cellular Congestion', icon: '🌑' },
    { id: 'c6', type: 'Skin', label: 'Oxidative Stress', icon: '⚖️' },
];

export const ARTISTS = [
    { id: 'a1', name: 'Elena Vance', role: 'Art Director', expertise: 'Structural Geometry', image: '/artists/elena.png' },
    { id: 'a2', name: 'Marcus Thorne', role: 'Clinical Trichologist', expertise: 'Reconstruction', image: '/artists/marcus.png' },
    { id: 'a3', name: 'Sofia Chen', role: 'Dermal Specialist', expertise: 'Ultrasonic Radiance', image: '/artists/sofia.png' },
];

export const SEASONAL_ADVICE = {
    season: "Monsoon",
    advice: [
        "Humidity (88%) triggers follicular swelling. Anti-Frizz Shield recommended.",
        "Scalp pH acidic. Alkaline Rinse protocol advised.",
        "Sebum elevated. Matte Peptide infusion required."
    ]
};
