import React, { type JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Book } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { Monitor, BookText, Book as BooksLuci, CheckCircle } from 'lucide-react';


interface BookCardProps {
    book: Book;
    onAddToCart?: (book: Book) => void;
}

const formatIcons: Record<string, JSX.Element> = {
    FISICO: <BooksLuci className="w-4 h-4" />,
    DIGITAL: <Monitor className="w-4 h-4" />,
};

export const BookCard: React.FC<BookCardProps> = ({ book }) => {

    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const isDigital = book.format.toUpperCase() === 'DIGITAL';

    const showBookDetails = () => {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            console.log(`Libro ${book.title} añadido al carrito`);
            navigate(`/bookdetail/${book.id}`);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col">
            <img
                className="h-48 w-full object-cover"
                src={book.coverUrl}
                alt={book.title}
            />
            <div className="p-5 grow">
                <h3 className="text-xl font-bold text-gray-800">{book.title}</h3>
                <p className="text-sm text-indigo-600 font-medium mb-2">{book.author}</p>
                <p className="text-gray-600 text-sm line-clamp-3">{book.summary}</p>
                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-start justify-baseline gap-2">
                    {formatIcons[book.format.toUpperCase()]}
                    {isDigital ? (
                        <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                            <CheckCircle size={14} /> Inmediato
                        </span>
                    ) : (
                        <span className="text-sm text-gray-500">
                            {book.stock && book.stock > 0 ? `${book.stock} stock` : 'Agotado'}
                        </span>
                    )}
                    </div>
                    <p className="text-lg font-bold text-indigo-600">${book.price.toFixed(2)}</p>
                </div>

            </div>

            <div className="p-5 pt-0">
                <button
                    onClick={showBookDetails}
                    disabled={!isDigital && (book.stock ?? 0) === 0}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg hover:hover:bg-green-700 transition font-semibold"
                >
                    <BookText size={20} />
                    <span>Ver Libro</span>
                </button>

            </div>
        </div>
    );
};