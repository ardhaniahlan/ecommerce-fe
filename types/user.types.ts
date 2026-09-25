export interface User {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  province: string | null;
  city: string | null;
  district: string | null;
  postal_code: string | null;
  street_address: string | null;
}

export type UserProfileUpdate = Omit<User, "id">;