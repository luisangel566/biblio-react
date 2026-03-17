import { Link, NavLink } from 'react-router-dom'

function Navegacion() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">

        {/* Logo / Marca */}
        <Link className="navbar-brand fw-bold text-warning d-flex align-items-center" to="/">
          <i className="bi bi-book-half me-2"></i>
          Biblioteca Personal
        </Link>

        {/* Botón hamburguesa (responsive) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContenido"
          aria-controls="navbarContenido"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido colapsable */}
        <div className="collapse navbar-collapse" id="navbarContenido">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center ${isActive ? 'active fw-semibold' : ''}`
                }
                to="/"
              >
                <i className="bi bi-list-ul me-2"></i>
                Listado
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center ${isActive ? 'active fw-semibold' : ''}`
                }
                to="/agregar"
              >
                <i className="bi bi-plus-circle me-2"></i>
                Agregar
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navegacion
