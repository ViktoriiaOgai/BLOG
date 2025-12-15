import { Outlet } from "react-router-dom";
import "./layout.css";
export default function Layout() {
    return (
        <>
        <header className="header">
            <h1>Blog Platform</h1>
        </header>
        <main><Outlet/>
        </main>
        </>
    );
}