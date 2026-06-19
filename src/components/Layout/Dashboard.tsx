import data from "../../data/books.json";
import { BookCard } from '../BookInformation/BookCard';
import { Loading } from "../Loading";
import { useEffect, useState } from "react";
import type { Book, LibraryData, ApiBook } from "../../types";
import { useOutletContext } from "react-router-dom";
import { BrushCleaning } from "lucide-react";
import { fetchBooks } from '../../utils/api';


interface FilterContext {
  selectedFormat: string;
  selectedCategories: string[];
  setSelectedFormat: (format: string) => void;
  onAddToCart: (book: Book) => void;
}

const Dashboard = () => {
  const typedData = data as LibraryData;
  const { categories } = typedData;
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);

  const { selectedFormat, selectedCategories, onAddToCart } = useOutletContext<FilterContext>();

  useEffect(() => {
    setIsLoading(true);

    fetchBooks()
      .then((apiBooks: ApiBook[]) => {
        const mapped = apiBooks.map((api) => {
          const matchedCategory = categories.find(
            (category) => category.name.toLowerCase() === api.category.toLowerCase()
          );

          const b: Book = {
            id: api.id,
            title: api.title,
            author: api.author,
            categoryId: matchedCategory?.id ?? api.category.toLowerCase().replace(/\s+/g, '-'),
            year: new Date(api.publication_date).getFullYear(),
            price: api.price,
            format: api.book_type === 'DIGITAL' ? 'digital' : 'fisico',
            summary: `ISBN ${api.isbn} · Categoría: ${api.category}`,
            coverUrl: `https://picsum.photos/seed/book-${api.id}/400/600`,
            stock: api.stock,
          };

          return b;
        });

        setBooks(mapped);
      })
      .catch(() => {
        setBooks([]);
      })
      .finally(() => setIsLoading(false));
  }, [categories, selectedFormat, selectedCategories]);


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



  // (fetch handled above) no-op


  const handleClearFilters = () => {
    setSearchQuery(""); 
      
  };

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

        {(searchQuery || selectedFormat !== "TODOS") && (
          <button
            onClick={handleClearFilters}
            className="flex items-center border gap-2 rounded-md py-2 px-4 whitespace-nowrap text-sm text-red-600 hover:text-red-800 font-medium transition-colors"
          >
            <BrushCleaning  size={16} />
            
          </button>
        )}

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