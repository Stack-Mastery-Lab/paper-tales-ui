import React from 'react';
import {  useNavigate } from 'react-router-dom';

import type { Book } from '../types';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart } from 'lucide-react';

interface BookCardProps {
    book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {

    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleAddToCart = () => {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            console.log(`Libro ${book.title} añadido al carrito`);
            alert("¡Libro añadido al carrito!");
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
            </div>

            <div className="p-5 pt-0">
                <button
                    onClick={handleAddToCart}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
                >
                    <ShoppingCart size={20} /> 
                    <span>Añadir al carrito</span>
                </button>
                
            </div>
        </div>
    );
};