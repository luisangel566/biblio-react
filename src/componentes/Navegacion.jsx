import { Link } from 'react-router-dom' // [EXISTENTE]

function Navegacion() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-3">
      <Link className="navbar-brand text-warning fw-bold" to="/">
        <i className="bi bi-book-half me-2"></i>
        Biblioteca Personal
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <i className="bi bi-list-ul me-1"></i>
              Listado
            </Link>
          </li>
          <li className="nav-item"> {/* [NUEVO] */}
            <Link className="nav-link" to="/agregar">
              <i className="bi bi-plus-circle me-1"></i>
              Agregar
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navegacion