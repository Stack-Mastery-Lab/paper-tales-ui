import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import data from "../data/books.json";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🏠 [Home] render");
  }, []);

  if (!data || !data.categories) {
    return <div className="flex justify-center p-10">Cargando catálogo...</div>;
  }

  return (
    // Fondo general con el color papel
    <main className="bg-papel min-h-screen text-tinta flex flex-col items-center w-full">

      {/* Hero Section: Impacto visual inicial */}
      <section className="py-20 px-4 text-center border-b border-tinta/10">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Relatos de Papel</h1>
        <p className="text-xl md:text-2xl text-tinta/80 mb-8 max-w-2xl mx-auto">
          Tu espacio para descubrir historias únicas y conectar con otros lectores.
        </p>
        <button className="bg-acento text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
          Explorar Catálogo
        </button>
      </section>

      {/* Container principal */}
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Sección Acerca de */}
        <section className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Qué es Relatos de Papel?</h2>
          <div className="max-w-3xl mx-auto space-y-4 text-lg">
            <p className="text-tinta/80">
              Somos una plataforma donde los amantes de la literatura pueden descubrir
              nuevas narrativas. Ya seas un escritor buscando feedback o un lector ávido,
              aquí encontrarás tu lugar.
            </p>
          </div>
        </section>

        {/* Sección Categorías */}
        <section className="justify-center mb-16 text-center">
          <h2 className="text-3xl font-bold mb-8 text-center">Categorías Destacadas</h2>
          <button className="mb-8 bg-acento text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          onClick={() => navigate('/books')}
          >
            Ver Todas las Categorías
          </button>
        </section>
      </div>
    </main>
  );
};

export default Home;