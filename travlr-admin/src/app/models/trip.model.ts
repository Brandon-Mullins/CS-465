export interface Trip {
  _id?: string;
  title: string;
  price: number;
  startDate: string;   // ISO date string from API
  nights: number;
  image?: string;

  // optional fields from Mongo
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

