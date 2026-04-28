import { Outlet } from "react-router-dom";
import { AuthHeader } from "../Header/AuthHeader";
import { FilterSidebar } from "./FilterSidebar";
import { useState } from "react";

export default function AuthLayout() {
    console.log("🔐 [AuthLayout] render");
    const [formatFilter, setFormatFilter] = useState("TODOS");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleToggleCategory = (id: string) => {
  setSelectedCategories(prev => 
    prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
  );
};

    return (
        <div className="flex flex-col min-h-screen bg-papel">
           <AuthHeader onToggleMenu={toggleSidebar} />
            <main className="flex">
                <FilterSidebar 
                    selectedFormat={formatFilter} 
                    setSelectedFormat={setFormatFilter}
                    isOpen={isSidebarOpen} 
                    onToggleCategory={handleToggleCategory}
                />
                <Outlet context={{ selectedFormat: formatFilter, selectedCategories }} />
            </main>
        
        </div>
    );
}