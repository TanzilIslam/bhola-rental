import { User } from "./user";
import { Property } from "./property";

export interface AdminOverview {
  totalUsers: number;
  totalProperties: number;
  totalRented: number;
  totalAvailable: number;
}

export interface AdminUser extends User {
  role: "admin" | "user";
  status: "active" | "suspended";
}

export interface AdminProperty extends Property {
  ownerName: string;
  ownerEmail: string;
}
