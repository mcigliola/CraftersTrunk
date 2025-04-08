export interface Pattern {
    craft: {
        name: string;
        id: number;
        permalink: string;
    }; // e.g. "Knitting"
    created_at: Date; // Date created
    currency?: string; // Currency used
    currency_symbol?: string; // Currency symbol
    difficulty_average: number; // Difficulty rating
    difficulty_count: number; // Number of ratings
    download_location: {
        url: string;
        free: boolean;
        type: string;
    }; // Download location
    downloadable: boolean; // Is it downloadable?
    favorites_count: number; // How many users favorited it
    free?: boolean; // Is it free?
    gauge?: string; // Gauge info
    gauge_description?: string; // Gauge description
    gauge_divisor?: number; // Gauge divisor
    gauge_pattern?: string; // Gauge pattern
    generally_available?: Date; // Date available
    has_uk_terminology?: boolean; // Uses UK terminology?
    has_us_terminology?: boolean; // Uses US terminology?
    id: number;
    languages?: {
        code: string;
        id: number;
        name: string;
        permalink: string;
        short_name: string;
        universal: boolean;
    }[]; // Languages available
    name: string;
    notes?: string; // Notes
    notes_html?: string; 
    packs: {
        color_family_id?: string;
        colorway?: string;
        dye_lot?: string;
        grams_per_skein?: number;
        id?: number;
        meters_per_skein?: number;
        personal_name?: string;
        primary_pack_id?: number;
        project_id?: number;
        quantity_description?: string;
        shop_id?: number;
        shop_name?: string;
        skeins?: string;
        stash_id?: number;
        thread_size?: string;
        total_grams?: number;
        total_meters?: number;
        total_ounces?: number;
        total_yards?: number;
        yards_per_skein?: number;
        yarn?: string;
        yarn_id?: number;
        yarn_name?: string;
        yarn_weight?: string;
    }[]; // Array of packs
    pattern_attributes?: {  
        description: string;
        id: number;
        name: string;
        permalink: string;
    }[]; // Array of attributes
    pattern_author?: {
        crochet_pattern_count: number;
        favorites_count: number;
        id: number;
        knitting_pattern_count: number;
        name: string;
        notes_html: string;
        patterns_count: number;
        permalink: string;
    }; // Author details
    pattern_categories?: {
        id: number;
        name: string;
        permalink: string;
    }[];// Array of categories
    pattern_needle_sizes: {
        crochet: boolean;
        hook: string;
        id: number;
        knitting: boolean;
        metric: number;
        name: string;
        needle_size_id: number;
        pretty_metric: string;
        pretty_us: string;
        us: string;
        us_steel: string;
    }[]; // Hook or needle size
    pdf_in_library?: boolean; // Is it in the user's library?
    pdf_url?: string; // PDF URL
    permalink: string;
    designer?: { name: string }; // Designer details
    first_photo?: { medium_url: string }; // Main pattern image
    photos?: {
        caption: string;
        caption_html: string;
        id: number;
        medium_url: string
        medium2_url: string;
        small_url: string;
        small2_url: string;
        square_url: string;
        thumbnail_url: string;
    }[]; // Array of photos
    price?: number; // Price
    projects_count?: number; // How many projects use this pattern
    published?: string; // Published date
    queued_projects_count?: number; // How many users have queued it
    rating_average?: number; // Star rating
    rating_count?: number; // Number of ratings
    ravelry_download?: boolean; // Is it available on Ravelry?
    row_gauge?: string; // Row gauge
    sizes_available?: string; // Available sizes
    updated_at?: Date; // Date updated
    url?: string; // URL
    yardage?: number; // Yardage
    yardage_description?: string; // Yardage description
    yardage_max?: number; // Maximum yardage
    yarn?: Yarn; // Yarn details
    yarn_weight_description?: string; // e.g. "Bulky"
    
};

export interface Yarn {
    certified_organic: boolean;
    discontinued: boolean;
    first_photo: { medium_url: string };
    gauge_divisor: number;
    grams: number;
    id: number;
    machine_washable: boolean;
    max_gauge: number;
    min_gauge: number;
    name: string;
    permalink: string;
    rating_average: number;
    rating_count: number;
    rating_total: number;
    texture: string;
    thread_size: string;
    wpi: number;
    yardage: number;
    yarn_company_name: string;
    yarn_weight: {
        crochet_gauge: string;
        id: number;
        knit_gauge: string;
        max_gauge: string;
        min_gauge: string;
        name: string;
        ply: number;
        wpi: number;
    };
};