
import { Link } from "react-router-dom";
import type { CategoryBook } from "../types";

interface CategoryProps {
  category: CategoryBook;
}

const CategoryCard = ({ category }: CategoryProps) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-tinta/10 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xl font-bold text-tinta mb-2">{category.name}</h3>
      <p className="text-sm text-tinta/80">{category.description}</p>
      <Link 
        to={`/books?category=${category.id}`} 
        className="mt-4 text-acento font-semibold hover:underline inline-block"
      >
        Ver libros →
      </Link>
    </div>
  );
};

export default CategoryCard;