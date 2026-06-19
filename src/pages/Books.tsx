import { useSearchParams } from 'react-router-dom';
import { BookCard } from '../components/BookInformation/BookCard';
import { useEffect, useState } from 'react';
import data from '../data/books.json';
import type { ApiBook, Book, LibraryData } from '../types';
import { Loading } from '../components/Loading';
import { fetchBooks } from '../utils/api';

const mapApiBookToBook = (apiBook: ApiBook, categories: LibraryData['categories']): Book => {
  const matchedCategory = categories.find(
    (category) => category.name.toLowerCase() === apiBook.category.toLowerCase()
  );

  return {
    id: apiBook.id,
    title: apiBook.title,
    author: apiBook.author,
    categoryId: matchedCategory?.id ?? apiBook.category.toLowerCase().replace(/\s+/g, '-'),
    year: new Date(apiBook.publication_date).getFullYear(),
    price: apiBook.price,
    format: apiBook.book_type === 'DIGITAL' ? 'digital' : 'fisico',
    summary: `ISBN ${apiBook.isbn} · Categoría: ${apiBook.category}`,
    coverUrl: `https://picsum.photos/seed/book-${apiBook.id}/400/600`,
    stock: apiBook.stock,
  };
};

export const Books = () => {
  const typedData = data as LibraryData;
  const { categories } = typedData;

  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category');
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setError('');

    fetchBooks()
      .then((apiBooks) => {
        const mappedBooks = apiBooks.map((book) => mapApiBookToBook(book, categories));
        setBooks(mappedBooks);
      })
      .catch(() => {
        setError('No se pudo cargar el catálogo. Intenta de nuevo.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [categories]);

  const categoryName = categoryId
    ? categories.find((category) => category.id === categoryId)?.name
    : undefined;
  const filteredBooks = categoryName
    ? books.filter((book) => book.categoryId === categoryId)
    : books;

  const currentCategory = categories.find((c) => c.id === categoryId);
  const pageTitle = currentCategory ? `Categoría: ${currentCategory.name}` : 'Todos los Libros';

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">{pageTitle}</h1>

      {error ? (
        <p className="text-center text-red-500 mb-6">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => <BookCard key={book.id} book={book} />)
          ) : (
            <p className="text-center text-gray-500">No hay libros en esta categoría.</p>
          )}
        </div>
      )}
    </div>
  );
};