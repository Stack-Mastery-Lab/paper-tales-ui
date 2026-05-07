import { useParams, useNavigate } from 'react-router-dom';
import { BookSideBar } from '../components/Layout/BookSideBar';
import { useMemo } from 'react';
import type { Book } from '../types'; 
import data from "../data/books.json";
import type { LibraryData } from "../types";
import { BookDetailContent } from '../components/BookInformation/BookInformation';

const getRandomBooksFromCategory = (
    books: Book[],
  categoryId: string,
  excludeBookId: number,
  count: number = 2
): Book[] => {
  // Filtrar libros de la misma categoría excluyendo el actual
  const booksInCategory = books.filter(
    book => book.categoryId === categoryId && book.id !== excludeBookId
  );

  // Seleccionar aleatoriamente
  const shuffled = [...booksInCategory].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};


const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const typedData = data as LibraryData;
  const book = typedData.books.find(b => b.id === Number(id));
  const category = typedData.categories.find(c => c.id === book.categoryId)?.name || "N/A";
  /* Obtener dos libros relacionados para colocar en el sidebar */
  const relatedBooks = useMemo(() => {
  if (!book) return [];
  return getRandomBooksFromCategory(typedData.books, book.categoryId, book.id, 2);
}, [book, typedData.books]);



    return (
      <div className="flex h-screen bg-white w-full">
        <BookSideBar books={relatedBooks} />
        <div className="flex-1">
          <BookDetailContent book={book} category={category} />
        </div>
      </div>




      );

};

export default BookDetail;