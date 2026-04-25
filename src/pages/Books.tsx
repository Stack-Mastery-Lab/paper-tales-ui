import { useSearchParams } from 'react-router-dom';
import { BookCard } from '../components/BookCard';
import { useEffect, useState } from 'react';
import data from "../data/books.json";
import type { LibraryData } from '../types';
import { Loading } from '../components/Loading';


export const Books = () => {
    const typedData = data as LibraryData;
    const { books, categories } = typedData;

    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get('category');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, [categoryId]);

    const filteredBooks = categoryId
        ? books.filter(book => book.categoryId === categoryId)
        : books;

    const currentCategory = categories.find(c => c.id === categoryId);
    const pageTitle = currentCategory ? `Categoría: ${currentCategory.name}` : "Todos los Libros";

    if (isLoading) {
        return <Loading/>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">{pageTitle}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))
                ) : (
                    <p className="text-center text-gray-500">No hay libros en esta categoría.</p>
                )}
            </div>
        </div>
    );
};