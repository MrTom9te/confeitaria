export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  deliveryDate: string;
  deliveryTime: string;
  observations?: string;
  status:
    | "pending"
    | "confirmed"
    | "production"
    | "ready"
    | "delivered"
    | "cancelled";
  createdAt: string;
  updatedAt: string;
}
