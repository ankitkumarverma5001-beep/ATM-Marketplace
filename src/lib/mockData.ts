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
    }
];

export const CATEGORIES = [
    { id: 'fashion', name: 'Fashion', icon: '👕' },
    { id: 'books', name: 'Books', icon: '📚' },
    { id: 'electronics', name: 'Electronics', icon: '🔌' },
    { id: 'home', name: 'Home Decor', icon: '🏠' }
];
