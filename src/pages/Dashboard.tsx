import data from "../data/books.json";
import { BookCard } from '../components/BookCard';
import { Loading } from "../components/Loading";
import { useEffect, useState } from "react";
import type { Book, LibraryData } from "../types";
import { useOutletContext } from "react-router-dom";


interface FilterContext {
  selectedFormat: string;
  selectedCategories: string[];
  onAddToCart: (book: Book) => void;
}

const Dashboard = () => {
  const typedData = data as LibraryData;
  const { books } = typedData;
  const [isLoading, setIsLoading] = useState(true);
  
  const { selectedFormat, selectedCategories, onAddToCart } = useOutletContext<FilterContext>();

    useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedFormat, selectedCategories]);


  const filteredBooks = books.filter((book) => {
    // Filtro por formato
    const matchesFormat = 
      selectedFormat === "TODOS" || 
      book.format.toUpperCase() === selectedFormat;

    // Filtro por categorías (múltiple)
    const matchesCategory = 
      selectedCategories.length === 0 || 
      selectedCategories.includes(book.categoryId);

    return matchesFormat && matchesCategory;
  });



  useEffect(() => {
          setIsLoading(true);
  
          const timer = setTimeout(() => {
              setIsLoading(false);
          }, 800);
  
          return () => clearTimeout(timer);
      }, [selectedFormat, selectedCategories]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-5 h-screen w-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} onAddToCart={onAddToCart} />
          ))
        ) : (
          <p className="text-center text-gray-500">No hay libros en esta categoría.</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard;