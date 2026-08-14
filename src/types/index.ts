export interface Product {
  id: string;
  name: string;
  collection: 'Chronograph' | 'Automatic' | 'Classic' | 'Sport' | 'Heritage' | 'Limited';
  category: string;
  gender: 'Men' | 'Women' | 'Unisex';
  price: number;
  compareAtPrice?: number;
  images: string[];
  description: string;
  rating: number;
  reviewCount: number;
  materials: string;
  movement: string;
  caseSize: string;
  caseMaterial: string;
  strapMaterial: string;
  waterResistance: string;
  warranty: string;
  colors: string[];
  stock: number;
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedStrap?: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  productName?: string;
}

export interface FilterState {
  search: string;
  collection: string[];
  gender: string[];
  priceRange: [number, number];
  movement: string[];
  caseMaterial: string[];
  strapMaterial: string[];
  availability: 'all' | 'in-stock';
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
}

export interface UserOrder {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'In Transit';
  total: number;
  items: {
    productName: string;
    productImage: string;
    quantity: number;
    price: number;
  }[];
  trackingNumber: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}
