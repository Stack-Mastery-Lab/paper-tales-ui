export interface Order {
  id: number;
  userId: number;        // debe coincidir con un id real de user.json
  date: string;          // formato "YYYY-MM-DD"
  status: 'completado' | 'enviado' | 'pendiente';
  items: {
    bookId: number;      // debe coincidir con un id real de books.json
    title: string;
    quantity: number;
    price: number;
  }[];
  total: number;         // suma real de quantity * price de cada item
}