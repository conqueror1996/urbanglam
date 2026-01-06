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
    basePrice: number;
    image: string;
}

export interface CategoryDetails {
    tier: Tier;
    label?: string; // e.g. "Most Booked"
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
        stylist: "Junior Stylist",
        products: "Standard Professional",
        privacy: "Open Floor",
        beverage: "Water / Tea",
        priceRange: "₹",
        brands: [
            { name: "L'Oreal", description: "Standard Care", logo: "" },
            { name: "Lotus", description: "Herbal", logo: "" }
        ]
    },
    Standard: {
        tier: 'Standard',
        priceMultiplier: 1.5,
        stylist: "Senior Stylist",
        products: "Premium International",
        privacy: "Semi-Private",
        beverage: "Cappuccino / Beverages",
        priceRange: "₹₹",
        brands: [
            { name: "Schwarzkopf", description: "Advanced Tech", logo: "" },
            { name: "O3+", description: "Pro Skin", logo: "" }
        ]
    },
    Premium: {
        tier: 'Premium',
        label: "Signature",
        priceMultiplier: 2.5,
        stylist: "Art Director",
        products: "Luxury Global Imports",
        privacy: "Private Suite",
        beverage: "Gourmet Menu / Wine",
        priceRange: "₹₹₹",
        brands: [
            { name: "Kérastase", description: "Couture Hair", logo: "" },
            { name: "Dyson", description: "Styling", logo: "" },
            { name: "Forest Essentials", description: "Ayurveda", logo: "" }
        ]
    }
};

export const SERVICES: Service[] = [
    {
        id: 's1',
        name: 'Signature Haircut',
        description: 'Designed by our Art Director to match your face geometry, lifestyle, and maintenance preference. Includes wash & blow-dry.',
        basePrice: 1200,
        image: '/services/haircut.png'
    },
    {
        id: 's2',
        name: 'UrbanGlam Radiance Facial',
        description: 'A deeply restorative session using ultrasonic exfoliation and gold-infused serums for immediate glass-skin texture.',
        basePrice: 2500,
        image: '/services/facial.png'
    },
    {
        id: 's3',
        name: 'Velvet Touch Manicure',
        description: 'The ultimate hand ritual featuring organic scrub, deep hydration mask, and breathable gel polish application.',
        basePrice: 900,
        image: '/services/manicure.png'
    }
];

export const TIME_SLOTS = [
    "10:00 AM", "11:30 AM", "01:00 PM", "03:00 PM", "05:00 PM", "07:00 PM"
];

export const TESTIMONIALS = [
    { name: "Aisha K.", role: "Model", text: "The AI consultation was a game changer. It knew exactly what my hair needed before I did." },
    { name: "Priya S.", role: "CEO", text: "Privacy in the Premium suite is unmatched. Finally a place where I can work and relax." },
    { name: "Meera R.", role: "Influencer", text: "Hygiene standards are clinical level, but the vibe is pure luxury. My go-to spot." }
];

export const MEMBERSHIPS = [
    {
        name: "Privé",
        price: "₹15,000 /yr",
        perks: ["10% curated benefit on all rituals", "Priority window scheduling", "Complimentary digital diagnostic", "Monthly scalp oxygenation ritual"]
    },
    {
        name: "Estate",
        price: "₹45,000 /yr",
        perks: ["20% curated benefit on all rituals", "Dedicated floor concierge", "Lifetime diagnostic intelligence", "Guaranteed suite privacy", "Quarterly global prestige box"]
    },
    {
        name: "Sovereign",
        price: "₹95,000 /yr",
        perks: ["30% curated benefit on all rituals", "Portal-to-portal chauffeur valet", "Exclusive brand premiere access", "Artist-in-Chief oversight", "At-residence ritual availability"]
    }
];

export const EXPERIENCE_STEPS = [
    { step: "01", title: "Arrival Sanctuary", desc: "A transition from the chaos into silence. Aromatherapy-diffused linens and a private concierge greeting." },
    { step: "02", title: "Biometric Audit", desc: "Our medical-grade AI performs a deep texture and porosity analysis across 10 million data points." },
    { step: "03", title: "The Private Vault", desc: "Your experience takes place in complete isolation or semi-private suites, designed for total focus." },
    { step: "04", title: "Master Curation", desc: "Your Artist-in-Chief executes a treatment plan dictated by your AI biometric results." },
    { step: "05", title: "Digital Passport", desc: "Depart with a cloud-stored preservation routine and curated home maintenance essentials." }
];

export const NOT_FOR_SERVICES = [
    "We are not a high-volume walk-in establishment.",
    "We do not rush rituals for the sake of efficiency.",
    "We do not compromise on medical-grade hygiene standards.",
    "We do not serve clients—we curate experiences for partners."
];

export const MANIFESTO = {
    quote: "UrbanGlam was created to bring medical-grade precision and uncompromised private luxury into the heart of Indian beauty culture.",
    author: "Founder & Visionary",
    standard: "Each day, we limit our intake to just 8 distinguished guests to ensure every second is intentionally unhurried."
};

export const TRANSFORMATIONS = [
    {
        title: "Follicular Reconstruction",
        category: "Hair Artistry",
        before: "/services/haircut.png",
        after: "/services/haircut.png",
        metric: "320% Density Improvement"
    },
    {
        title: "Epidermal Hydration",
        category: "Skin Precision",
        before: "/services/facial.png",
        after: "/services/facial.png",
        metric: "94% Moisture Retention"
    }
];

export const SANCTUARY_SPACES = [
    {
        title: "The Private Vault",
        desc: "A singular isolation suite designed for absolute focus. Features medical-grade ergonomics and personalized climate calibration.",
        image: "/private_sanctuary_vault_1767659401538.png"
    },
    {
        title: "The Sterilization Lab",
        desc: "Our surgical-grade hygiene infrastructure ensures every tool is processed through a 12-step UV and thermal audit.",
        image: "/hygiene_protocol_lab_1767659419309.png"
    }
];

export const HYGIENE_PROTOCOLS = [
    { step: "01", title: "ULTRASONIC AUDIT", desc: "Chemical-free removal of micro-contaminants using precision sound waves." },
    { step: "02", title: "UV-C INFUSION", desc: "Continuous DNA-level sterilization in pressurized glass cabinets." },
    { step: "03", title: "SEALED HAND-OFF", desc: "Every tool set is unboxed by the Artist only in the presence of the client." }
];

export const CONCERNS = [
    { id: 'c1', type: 'Hair', label: 'Follicular Thinning', icon: '🧬' },
    { id: 'c2', type: 'Hair', label: 'Scalp Inflammation', icon: '🔥' },
    { id: 'c3', type: 'Hair', label: 'Texture Damage', icon: '🥀' },
    { id: 'c4', type: 'Skin', label: 'Epidermal Dehydration', icon: '💧' },
    { id: 'c5', type: 'Skin', label: 'Cellular Congestion', icon: '🌑' },
    { id: 'c6', type: 'Skin', label: 'Oxidative Stress', icon: '⚖️' },
];

export const ARTISTS = [
    { id: 'a1', name: 'Elena Vance', role: 'Art Director', expertise: 'Face Geometry & Structural Cuts', image: '/artists/elena.png' },
    { id: 'a2', name: 'Marcus Thorne', role: 'Clinical Trichologist', expertise: 'Scalp Health & Reconstruction', image: '/artists/marcus.png' },
    { id: 'a3', name: 'Sofia Chen', role: 'Dermal Specialist', expertise: 'Ultrasonic Radiance & Hydration', image: '/artists/sofia.png' },
];

export const SEASONAL_ADVICE = {
    season: "Monsoon",
    advice: [
        "High humidity (88%) triggers follicular swelling. Use the Anti-Frizz Molecular Shield.",
        "Scalp pH is currently acidic due to rain exposure. Recommend the Alkaline Rinse ritual.",
        "Skin sebum production is elevated. Switch to the Matte Peptide infusion."
    ]
};
