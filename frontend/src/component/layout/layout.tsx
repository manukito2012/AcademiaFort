import { Outlet } from "react-router-dom";
import Navbar from "../navbar";
import Footer from "../footer";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Layout() {
    return (

        <div className="d-flex flex-column min-vh-100">
        <div>
          <Navbar />
        </div>
        {/* Contenedor principal con Outlet */}
        <div className="flex-grow-1 p-4">
          <Outlet />
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
      




    )
}
