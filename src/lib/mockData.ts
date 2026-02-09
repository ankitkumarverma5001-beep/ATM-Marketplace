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
        name: 'Vintage Vault',
        description: 'Premium curated vintage pieces from the 80s and 90s.',
        category: 'Fashion',
        logoUrl: 'https://placehold.co/200x200/4A7C59/white?text=VV',
        rating: 4.8,
        location: 'Bandra, Mumbai'
    },
    {
        id: 'store-2',
        name: 'Retro Reads',
        description: 'Second-hand rare books and classic literature.',
        category: 'Books',
        logoUrl: 'https://placehold.co/200x200/8B4513/white?text=RR',
        rating: 4.5,
        location: 'Koramangala, Bangalore'
    },
    {
        id: 'store-3',
        name: 'Eco Electronics',
        description: 'Refurbished electronics with 1-year warranty.',
        category: 'Electronics',
        logoUrl: 'https://placehold.co/200x200/2F4F4F/white?text=EE',
        rating: 4.2,
        location: 'Indiranagar, Bangalore'
    },
    {
        id: 'store-4',
        name: 'Thrift Threads',
        description: 'Affordable daily wear and street style.',
        category: 'Fashion',
        logoUrl: 'https://placehold.co/200x200/E9967A/white?text=TT',
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
