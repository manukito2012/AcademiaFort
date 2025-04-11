
import { Link } from "react-router-dom";

export default function Navbar() {


  return (

    <div>

      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand" >Academia Fort</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">

                <Link to={'/task'}>
                  <button className="btn btn-primary me-2">
                    Ver Lista
                  </button>
                </Link>


              </li>
              <li className="nav-item">
                <Link to={'/taksforms'}>
                  <button className="btn btn-primary me-2">
                    Crear Tareas
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

