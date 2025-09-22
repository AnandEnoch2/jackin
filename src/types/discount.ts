export interface Discount {
  _id: string;
  name: string;
  description?: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  startDate: string;
  endDate: string;
  minPurchaseAmount?: number;
  maxDiscountAmount?: number;
  applicableProducts: string[]; // Product IDs
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DiscountFormData {
  name: string;
  description?: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  startDate: string;
  endDate: string;
  minPurchaseAmount?: number;
  maxDiscountAmount?: number;
  applicableProducts: string[];
  isActive: boolean;
}