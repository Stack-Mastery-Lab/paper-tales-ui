import data from "../data/books.json";
import { BookCard } from '../components/BookInformation/BookCard';
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
  const [searchQuery, setSearchQuery] = useState("");
  
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

    // Filtro por búsqueda
    const matchesSearch = 
      searchQuery === "" || 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFormat && matchesCategory && matchesSearch;
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
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Bienvenido a nuestra librería</h1>
        <p className="text-gray-600">
          Explora nuestra selección de libros y encuentra tu próxima lectura favorita.
        </p>
      </div>

      <div className="flex items-center gap-3 justify-between mb-4">
        <input
          type="text"
          placeholder="Buscar por título"
           value={searchQuery}
           onChange={(e) => setSearchQuery(e.target.value)}
          className="border w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-500">{filteredBooks.length} libros encontrados</span>
      </div>

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