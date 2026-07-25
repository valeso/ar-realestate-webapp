export interface User {
  id: string;
  email: string;
  password_hash: string;
  full_name: string;
  avatar_url?: string;
  role: 'buyer' | 'seller' | 'admin';
  created_at: Date;
  updated_at: Date;
}

export interface Property {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  price: number;
  property_type: 'house' | 'apartment' | 'commercial' | 'land';
  bedrooms?: number;
  bathrooms?: number;
  square_feet?: number;
  address: string;
  latitude: number;
  longitude: number;
  images: PropertyImage[];
  model_3d_url?: string;
  created_at: Date;
  updated_at: Date;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  url: string;
  order: number;
}

export interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  property_id?: string;
  content: string;
  read: boolean;
  created_at: Date;
}

export interface JWTPayload {
  id: string;
  email: string;
  role: string;
}
