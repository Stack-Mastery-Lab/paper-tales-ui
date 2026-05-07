import { ArrowLeft, ShoppingCart, Book as BooksIcon, Monitor, Calendar, DollarSign } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import type { Book } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

interface BookDetailContentProps {
  book: Book;
  category: string;
}

export const BookDetailContent = ({ book, category }: BookDetailContentProps) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const returnToDashboard = () => {
      if (!isLoggedIn) {
            navigate('/login');
      } else {
            navigate('/');
      }

  }

  const { onAddToCart } = useOutletContext<{ onAddToCart: (book: Book) => void }>();


  const reviews = [
  { id: 1, user: 'Aura', rating: 5, text: 'Excelente libro, muy recomendado.' },
  { id: 2, user: 'Erika', rating: 4, text: 'Pudo haber tenido mejores secciones.' },
  { id: 3, user: 'Carolina', rating: 4, text: 'Impresionante, no puedo parar de leer.' }
  ];


  const [quantity, setQuantity] = useState(1);
  const isDigital = book.format.toUpperCase() === 'DIGITAL';

  return (
    <main className="flex-1 overflow-y-auto bg-slate-50 w-full mx-auto h-screen">
      <div className="max-w-full p-8">
        {/* Volver a la pagina de dashboard */}
        <button 
          onClick={returnToDashboard}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-8 font-semibold transition"
        >
          <ArrowLeft size={20} />
          Volver
        </button>

        {/* Contenido principal */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-12 px-8 py-16">
          
          {/* Portada */}
          <div className="w-full md:w-2/5 flex flex-col items-center self-start">
            <div className="flex overflow-hidden sticky w-full items-center justify-center">
              <img 
                src={book.coverUrl} 
                alt={book.title}
                className="w-2/5 h-2/5 object-cover object-center"
              />
            </div>

            {/* Reseñas */}
            <div className="mt-8 w-4/6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Reseñas</h3>
                <div className="space-y-3">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-gray-800">{review.user}</p>
                        <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
                      </div>
                      <p className="text-sm text-gray-600">{review.text}</p>
                    </div>
                  ))}
                </div>
            </div>
          </div>

          {/* Información */}
          <div className="w-full md:w-2/3 flex justify-center pt-0">
            <div className="bg-white rounded-xl shadow-md p-8 w-4/7">
              
              {/* Título y autor */}
              <h1 className="text-4xl font-bold text-gray-800 mb-3">
                {book.title}
              </h1>
              <p className="text-xl text-indigo-600 font-semibold mb-6">
                {book.author}
              </p>

              {/* Separador */}
              <hr className="mb-6" />

              {/* Info del libro */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <Calendar className="text-indigo-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Año de publicación</p>
                    <p className="font-semibold text-gray-800">{book.year}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {isDigital ? (
                    <>
                      <Monitor className="text-indigo-600" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Formato</p>
                        <p className="font-semibold text-gray-800">Digital</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <BooksIcon className="text-indigo-600" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Formato</p>
                        <p className="font-semibold text-gray-800">Físico</p>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <DollarSign className="text-indigo-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Precio</p>
                    <p className="font-semibold text-gray-800">${book.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-sm text-gray-600">Categoría</p>
                    <p className="font-semibold text-gray-800">{category}</p>
                  </div>
                </div>
              </div>

              {/* Stock */}
              {!isDigital && (
                <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-600">Disponible en stock</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {book.stock ?? 0} unidades
                  </p>
                </div>
              )}

              {/* Resumen */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Descripción</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {book.summary}
                </p>
              </div>

              {/* Separador */}
              <hr className="mb-8" />

              {/* Sección de compra */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800">Obtener este libro</h3>
                
                {!isDigital && (
                  <div className="flex items-center gap-4">
                    <label className="text-gray-700 font-semibold">Cantidad:</label>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="px-6 py-2 font-semibold text-gray-800">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(book.stock ?? 1, quantity + 1))}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => onAddToCart(book)}
                  disabled={!isDigital && (book.stock ?? 0) === 0}
                  className="w-full bg-indigo-600 text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-3 hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={24} />
                  Agregar al Carrito
                </button>

                <p className="text-sm text-gray-600 text-center">
                  {isDigital 
                    ? "Recibirás acceso inmediato después de la compra"
                    : book.stock && book.stock > 0 
                      ? "Envío disponible"
                      : "No disponible en este momento"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};