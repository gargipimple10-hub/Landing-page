export type Category = 
  | 'All'
  | 'Electronics'
  | 'Tools'
  | 'Cameras'
  | 'Accessories'
  | 'Sports'
  | 'Home & Kitchen';

export interface RentalItem {
  id: string;
  name: string;
  category: Exclude<Category, 'All'>;
  pricePerDay: number;
  location: string;
  distanceKm: number;
  rating: number;
  reviewCount: number;
  description: string;
  condition: 'Like New' | 'Excellent' | 'Good';
  securityDeposit: number;
  owner: {
    name: string;
    avatarInitials: string;
    memberSince: string;
    verified: boolean;
    responseRate: string;
  };
  features: string[];
  imageSvgType: 'camera' | 'drill' | 'projector' | 'speaker' | 'tent' | 'tripod' | 'custom';
}
