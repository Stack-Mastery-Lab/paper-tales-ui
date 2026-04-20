const CategoryCard = ({ category }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-tinta/10 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xl font-bold text-tinta mb-2">{category.name}</h3>
      <p className="text-sm text-tinta/80">{category.description}</p>
      <button className="mt-4 text-acento font-semibold hover:underline">
        Ver libros →
      </button>
    </div>
  );
};

export default CategoryCard;