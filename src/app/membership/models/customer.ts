export interface Customer {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  birthDate: string;
  age: number;
  phoneNo: string;
  location: string;
  memberShip: string;
  isRegistered?: boolean;
  social?: string[];
}
