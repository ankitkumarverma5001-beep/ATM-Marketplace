
export interface Store {
    id: string;
    name: string;
    description: string;
    category: string;
    logoUrl: string;
    rating: number;
    location: string;
}


export const MOCK_STORES: Store[] = [
    {
        id: 'store-1',
        name: 'The Fashion Hub',
        description: 'Latest trends in apparel and accessories for all ages.',
        category: 'Fashion',
        logoUrl: 'https://placehold.co/200x200/4A7C59/white?text=FH',
        rating: 4.8,
        location: 'Bandra, Mumbai'
    },
    {
        id: 'store-2',
        name: 'Neighborhood Books',
        description: 'New releases, bestsellers, and community favorites.',
        category: 'Books',
        logoUrl: 'https://placehold.co/200x200/8B4513/white?text=NB',
        rating: 4.5,
        location: 'Koramangala, Bangalore'
    },
    {
        id: 'store-3',
        name: 'Smart Solutions',
        description: 'Quality electronics and home gadgets at local prices.',
        category: 'Electronics',
        logoUrl: 'https://placehold.co/200x200/2F4F4F/white?text=SS',
        rating: 4.2,
        location: 'Indiranagar, Bangalore'
    },
    {
        id: 'store-4',
        name: 'Urban Lifestyle',
        description: 'Curated home decor and daily essentials.',
        category: 'Home Decor',
        logoUrl: 'https://placehold.co/200x200/E9967A/white?text=UL',
        rating: 4.6,
        location: 'Hauz Khas, Delhi'
    },
    {
        id: 'store-5',
        name: 'Green Corner',
        description: 'Exotic indoor plants and gardening tools.',
        category: 'Plants',
        logoUrl: 'https://placehold.co/200x200/2E8B57/white?text=GC',
        rating: 4.9,
        location: 'Jayanagar, Bangalore'
    },
    {
        id: 'store-6',
        name: 'The Botanical',
        description: 'Rare succulents and bonsai trees.',
        category: 'Plants',
        logoUrl: 'https://placehold.co/200x200/3CB371/white?text=TB',
        rating: 4.7,
        location: 'Vasant Vihar, Delhi'
    }
];

export const CATEGORIES = [
    { id: 'fashion', name: 'Fashion', icon: '👕' },
    { id: 'books', name: 'Books', icon: '📚' },
    { id: 'electronics', name: 'Electronics', icon: '🔌' },
    { id: 'home', name: 'Home Decor', icon: '🏠' },
    { id: 'plants', name: 'Plants', icon: '🌿' }
];

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    category: string;
    storeId: string;
    condition: string;
    details: string[];
}

export const MOCK_PRODUCTS: Product[] = [
    {
        id: 'p1',
        name: 'Vintage Denim Jacket',
        price: 1299,
        description: 'Classic 90s denim jacket in excellent condition.',
        imageUrl: 'https://placehold.co/400x400/333/white?text=Denim+Jacket',
        category: 'Fashion',
        storeId: 'store-1',
        condition: 'Good',
        details: ['Size: M', 'Material: Denim', 'Brand: Levi\'s']
    },
    {
        id: 'p2',
        name: 'Retro Floral Dress',
        price: 899,
        description: 'Beautiful localized floral print dress.',
        imageUrl: 'https://placehold.co/400x400/555/white?text=Floral+Dress',
        category: 'Fashion',
        storeId: 'store-1',
        condition: 'Like New',
        details: ['Size: S', 'Material: Cotton', 'Brand: Unknown']
    },
    {
        id: 'p3',
        name: 'Harry Potter Box Set',
        price: 1500,
        description: 'Complete set of Harry Potter books.',
        imageUrl: 'https://placehold.co/400x400/777/white?text=HP+Books',
        category: 'Books',
        storeId: 'store-2',
        condition: 'Used',
        details: ['Hardcover', 'Language: English', 'Author: J.K. Rowling']
    },
    {
        id: 'p4',
        name: 'Sony WH-1000XM3',
        price: 12000,
        description: 'Noise canceling headphones in great condition.',
        imageUrl: 'https://placehold.co/400x400/999/white?text=Sony+Headphones',
        category: 'Electronics',
        storeId: 'store-3',
        condition: 'Good',
        details: ['Wireless', 'Noise Canceling', 'Black']
    },
    {
        id: 'p5',
        name: 'Ceramic Vase',
        price: 450,
        description: 'Handcrafted ceramic vase for home decor.',
        imageUrl: 'https://placehold.co/400x400/bbb/white?text=Vase',
        category: 'Home Decor',
        storeId: 'store-4',
        condition: 'New',
        details: ['Height: 10 inches', 'Material: Ceramic']
    }
];

// Helper to generate a store product on the fly if needed
const generateStoreProduct = (id: string): Product | undefined => {
    const match = id.match(/store-(.+)-(\d+)/);
    if (!match) return undefined;

    const parts = id.split('-');
    let storeId: string;
    let index: number;

    if (parts.length >= 4 && parts[0] === 'store' && parts[1] === 'store') {
        storeId = `store-${parts[2]}`;
        index = parseInt(parts[3]);
    } else if (parts.length >= 3 && parts[0] === 'store') {
        storeId = `store-${parts[1]}`;
        index = parseInt(parts[2]);
    } else {
        return undefined;
    }

    const store = MOCK_STORES.find(s => s.id === storeId);

    return {
        id: id,
        name: `Local Find #${index}`,
        price: 299 + (index * 50) % 3000,
        description: `Exclusive item from ${store?.name || 'Local Store'}.`,
        imageUrl: `https://placehold.co/400x300/e8e8e8/4A7C59?text=StoreItem+${index}`,
        category: store?.category || 'Misc',
        storeId: storeId,
        condition: 'Good',
        details: ['Store Exclusive', 'Verified Seller']
    };
};

// Helper to generate a global feed product
const generateFeedProduct = (id: string): Product | undefined => {
    const match = id.match(/generated-(\d+)/);
    if (!match) return undefined;

    const index = parseInt(match[1]);

    return {
        id: id,
        name: `Vintage Treasure #${index}`,
        price: 499 + (index * 100) % 4000,
        description: `A unique, pre-loved item looking for a new home. Verified quality and authentic vintage appeal.`,
        imageUrl: `https://placehold.co/400x300/e8e8e8/4A7C59?text=Item+${index}`,
        category: 'Fashion',
        storeId: 'store-1',
        condition: 'Good',
        details: ['Verified Authentic', 'Vintage Condition']
    };
};

export const getProductById = (id: string): Product | undefined => {
    // 1. Check static mock products
    const staticProduct = MOCK_PRODUCTS.find(p => p.id === id);
    if (staticProduct) return staticProduct;

    // 2. Check for generated store products
    if (id.startsWith('store-')) {
        return generateStoreProduct(id);
    }

    // 3. Check for generated feed products
    if (id.startsWith('generated-')) {
        return generateFeedProduct(id);
    }

    return undefined;
};
