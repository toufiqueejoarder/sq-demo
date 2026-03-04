export type Category =
  | 'Power Transformers'
  | 'Distribution Transformers'
  | 'Industrial Cables'
  | 'Control Cables'
  | 'Switchgear'
  | 'Protection Systems';

export type BangladeshDivision =
  | 'Dhaka'
  | 'Chittagong'
  | 'Khulna'
  | 'Sylhet'
  | 'Rajshahi'
  | 'Barisal'
  | 'Rangpur'
  | 'Mymensingh';

export type LeadStatus =
  | 'new'
  | 'assigned'
  | 'contacted'
  | 'qualified'
  | 'converted'
  | 'lost';

export type DemandLevel = 'low' | 'medium' | 'high';

export type UserRole = 'public' | 'distributor' | 'admin';

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: Category;
  description: string;
  specifications: Record<string, string>;
  images: string[];
  priceRange: { min: number; max: number };
  inStock: boolean;
  featured: boolean;
  createdAt: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface InventoryItem {
  productId: string;
  available: boolean;
}

export interface Distributor {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  division: BangladeshDivision;
  district: string;
  location: Coordinates;
  coverageArea: string[];
  inventory: InventoryItem[];
  isActive: boolean;
  createdAt: string;
}

export interface Lead {
  id: string;
  productId: string;
  customerName: string;
  companyName: string;
  email: string;
  phone: string;
  division: BangladeshDivision;
  district: string;
  quantity: number;
  message: string;
  status: LeadStatus;
  assignedDistributorId: string | null;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  distributorId?: string;
}

export interface DemoState {
  products: Product[];
  distributors: Distributor[];
  leads: Lead[];
  currentRole: UserRole;
  currentUser: User | null;
  currentDistributorId: string | null;
  demandLevel: DemandLevel;
  showDemoIndicator: boolean;
}

export interface DemandHeatmapPoint {
  lat: number;
  lng: number;
  intensity: number;
}
