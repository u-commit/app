
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  specs?: Record<string, string>;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface PaymentMethod {
  id: string;
  type: 'momo' | 'bank';
  name: string;
  accountNumber: string;
  icon?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  linkedPayments: PaymentMethod[];
}
