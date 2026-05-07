import { BookCard } from '../BookInformation/BookCard';
import type { Book } from '../../types';
import { BookText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RelatedBooksDisplayProps {
  books: Book[];
  title?: string;
}

export const BookSideBar = ({ 
  books, 
  title = "Libros Relacionados" 
}: RelatedBooksDisplayProps) => {
  if (books.length === 0) return null;

const navigate = useNavigate();

  return (
    <aside className="w-full md:w-70 bg-paper border-r border-gray-200 p-4 md:p-6 h-screen md:h-screen flex flex-col shadow-2xl">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
        {title}
      </h2>
      
      <div className="space-y-5 flex-2">
        {books.map((book) => (
          <div 
            key={book.id}
            className="bg-white rounded-lg p-3 border border-gray-200 hover:shadow-md transition-all"
          >
            <img 
              src={book.coverUrl} 
              alt={book.title}
              className="w-full h-45 object-cover rounded mb-2"
            />
            <h3 className="font-semibold text-base text-gray-800 line-clamp-2">
              {book.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{book.author}</p>
            <p className="text-indigo-600 font-bold text-lg mb-3">${book.price}</p>
            <span></span>
                <button
                    onClick={() => navigate(`/bookdetail/${book.id}`)}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg hover:hover:bg-green-700 transition font-semibold"
                >
                    <BookText size={20} />
                    <span>Ver Libro</span>
                </button>
        </div>
        ))}
      </div>
    </aside>
  );
};