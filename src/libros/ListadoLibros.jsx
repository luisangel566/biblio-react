import { useEffect, useState } from 'react' // [EXISTENTE]
import { useNavigate } from 'react-router-dom' // [EXISTENTE]
import { listarLibros, eliminarLibro } from '../api/libros' // [MODIFICADO]

function ListadoLibros() {
  const [libros, setLibros] = useState([]) // [EXISTENTE]
  const navegar = useNavigate() // [EXISTENTE]

  // [EXISTENTE]
  const cargarLibros = async () => {
    const data = await listarLibros()
    setLibros(data)
  }

  // [EXISTENTE]
  const inicializar = () => {
    cargarLibros()
  }

  useEffect(inicializar, []) // [EXISTENTE]

  // [NUEVO]
  const manejarEliminar = async (id) => {
    const confirmado = confirm('¿Estás seguro de que deseas eliminar este libro?')
    if (!confirmado) return
    await eliminarLibro(id)
    cargarLibros()
  }

  return (
    <div className="container mt-4">
      <h2 className="text-warning text-center mb-4">
        <i className="bi bi-book-half me-2"></i>
        Listado de Libros
      </h2>
      <table className="table table-dark table-striped table-bordered">
        <thead className="table-primary">
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Rating</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libros.map((libro) => (
            <tr key={libro.id}>
              <td>{libro.id}</td>
              <td>{libro.titulo}</td>
              <td>{libro.autor}</td>
              <td>{libro.rating}</td>
              <td className="d-flex gap-2"> {/* [MODIFICADO] */}
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navegar(`/editar/${libro.id}`)}
                >
                  <i className="bi bi-pencil-square me-1"></i>
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => manejarEliminar(libro.id)}
                >
                  <i className="bi bi-trash me-1"></i>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListadoLibros