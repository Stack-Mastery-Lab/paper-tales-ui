import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";


export default function Layout() {
    console.log("📐 [Layout] render");
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}