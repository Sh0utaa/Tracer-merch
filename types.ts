export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Apparel' | 'Accessories' | 'Stationery';
  image: string;
  description: string; // Static description
  aiPromptContext: string; // Context for Gemini to generate dynamic copy
}

export interface CartItem extends Product {
  quantity: number;
}

export enum ViewState {
  HOME = 'HOME',
  CART = 'CART',
  CHECKOUT = 'CHECKOUT'
}

export interface AIGeneratedContent {
  slogan: string;
  extendedDescription: string;
}
