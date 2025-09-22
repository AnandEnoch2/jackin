export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
  quality: 'Premium' | 'Standard' | 'Economy';
  quantityType: 'pcs' | 'kg' | 'ltr' | 'g' | 'ml';
  discounts?: {
    active: boolean;
    value: number;
    type: 'percentage' | 'fixed';
    startDate: string;
    endDate: string;
  }[];
}

export interface ProductFormData {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
  quality: 'Premium' | 'Standard' | 'Economy';
  quantityType: 'pcs' | 'kg' | 'ltr' | 'g' | 'ml';
}