export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface UserProfile extends User {
  totalListings: number;
}
