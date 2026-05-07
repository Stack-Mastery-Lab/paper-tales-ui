import { Outlet, useLocation } from "react-router-dom";
import { AuthHeader } from "../Header/AuthHeader";
import { FilterSidebar } from "./FilterSidebar";
import { useState } from "react";
import type { Book } from "../../types";
import { CartDrawer } from "../CartDrawer";

export default function AuthLayout() {
    console.log("🔐 [AuthLayout] render");
    const userLocation = useLocation();
    const isBookDetail = userLocation.pathname.includes("/bookdetail/");
    const [formatFilter, setFormatFilter] = useState("TODOS");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [cartBooks, setCartBooks] = useState<Book[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleToggleCategory = (id: string) => {
        setSelectedCategories(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    const handleAddToCart = (book: Book) => {
        setCartBooks(prev => {
            const existing = prev.find(item => item.id === book.id);
            if (!existing) {
                return [...prev, { ...book, quantity: 1 }];
            }

            if (existing.format.toUpperCase() === 'DIGITAL') {
                return prev;
            }

            return prev.map(item => {
                if (item.id !== book.id) return item;
                const currentQty = item.quantity ?? 1;
                const nextQty = currentQty + 1;
                const maxQty = item.stock ?? nextQty;
                return {
                    ...item,
                    quantity: Math.min(nextQty, maxQty),
                };
            });
        });
        setIsCartOpen(true);
    };

    const handleUpdateQuantity = (id: number, delta: number) => {
        setCartBooks(prev =>
            prev.flatMap(item => {
                if (item.id !== id) return item;
                const currentQty = item.quantity ?? 1;
                const nextQty = currentQty + delta;
                if (nextQty <= 0) return [];
                if (item.stock != null && nextQty > item.stock) return item;
                return { ...item, quantity: nextQty };
            })
        );
    };

    const clearCart = () => setCartBooks([]);

    const userLocation2 = useLocation();
    const showSidebar = userLocation2.pathname !== '/profile';

    return (
        <div className="flex flex-col min-h-screen bg-papel">
            <AuthHeader onToggleMenu={toggleSidebar}
                cartCount={cartBooks.length}
                onCartClick={() => setIsCartOpen(true)}
            />
            <main className="flex flex-1">
                {!isBookDetail && showSidebar && (
                    <FilterSidebar
                        selectedFormat={formatFilter}
                        setSelectedFormat={setFormatFilter}
                        isOpen={isSidebarOpen}
                        onToggleCategory={handleToggleCategory}
                    />
                )}

                <Outlet
                    context={{
                        selectedFormat: formatFilter,
                        selectedCategories,
                        onAddToCart: handleAddToCart,
                        cartBooks,
                        clearCart,
                    }}
                />
            </main>


            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                items={cartBooks}
                onRemove={(id) => setCartBooks(prev => prev.filter(b => b.id !== id))}
                onUpdateQuantity={handleUpdateQuantity}
            />

        </div>
    );
}