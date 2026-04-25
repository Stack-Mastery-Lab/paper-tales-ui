export type UserRole = 'admin' | 'editor' | 'user';

export interface User {
  id: number;
  username: string;
  password?: string; // Opcional, idealmente no debería viajar al cliente
  name: string;
  role: UserRole;
  photo: string;
}