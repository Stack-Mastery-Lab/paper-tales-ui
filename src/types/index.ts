export interface CategoryBook {
  id: string;
  name: string;
  slug: string;
  description: string;
}


export type BookFormat = 'fisico' | 'digital';

export interface Book {
  id: number;
  title: string;
  author: string;
  categoryId: string;
  year: number;
  price: number;
  format: BookFormat;
  summary: string;
  coverUrl: string;
  stock?: number; // El '?' hace que sea opcional
  quantity?: number; // cantidad en el carrito
}


export interface LibraryData {
  categories: CategoryBook[];
  books: Book[];
}

export interface ApiBook {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publication_date: string;
  category: string;
  rating: number;
  visible: boolean;
  price: number;
  book_type: 'PHYSICAL' | 'DIGITAL';
  stock: number;
}