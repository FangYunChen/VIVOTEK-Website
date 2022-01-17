export interface Coverage {
  id?: number;
  title?: string;
  description?: string;
  publishAt?: string;
  status?: number;
  url?: string;
  updatedAt?: string;
  updatedUser?: {
    id: string;
    name: string;
    email: string;
  };
}
