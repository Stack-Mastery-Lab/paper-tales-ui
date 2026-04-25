import { Outlet } from "react-router-dom";
import { AuthNavbar } from "../Header/AuthHeader";

export default function AuthLayout() {
    console.log("🔐 [AuthLayout] render");

    return (
        <div className="flex flex-col min-h-screen bg-papel">
            <AuthNavbar />
            <main className="flex">
                <Outlet />
            </main>
        
        </div>
    );
}