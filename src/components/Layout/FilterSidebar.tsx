import { Book, Monitor, Filter } from "lucide-react";
import data from "../../data/books.json";
import type { LibraryData } from "../../types";

interface FilterSidebarProps {
  selectedFormat: string;
  setSelectedFormat: (format: string) => void;
   isOpen: boolean;
   onToggleCategory: (id: string) => void;
}

export const FilterSidebar = ({ selectedFormat, setSelectedFormat, isOpen, onToggleCategory }: FilterSidebarProps) => {
    const typedData = data as LibraryData;
    const { categories } = typedData;
  
    const formats = [
    { id: 'TODOS', label: 'Todos', icon: <Filter size={18} /> },
    { id: 'FISICO', label: 'Físico', icon: <Book size={18} /> },
    { id: 'DIGITAL', label: 'Digital', icon: <Monitor size={18} /> },
  ];

   if (!isOpen) return null; 

  return (
    <aside className="w-full md:w-64 h-screen bg-paper border-r border-gray-200 p-4 md:p-6 flex flex-col overflow-y-auto shadow-2xl">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
        Filtrar por Formato
      </h2>
      
      <div className="space-y-2">
        {formats.map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedFormat(f.id)}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
              selectedFormat === f.id 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-gray-600 hover:bg-indigo-50'
            }`}
          >
            {f.icon}
            <span className="font-medium">{f.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 flex-1 flex flex-col min-h-0">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 shrink-0">
          Categorías
        </h2>
        <div className="space-y-2 overflow-y-auto pr-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onToggleCategory(category.id)}
              className="w-full text-left px-4 py-2 rounded-lg transition-all text-gray-600 hover:bg-indigo-50"
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};
