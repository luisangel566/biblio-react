import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { listarLibros, eliminarLibro } from '../api/libros'

function ListadoLibros() {
  const [libros, setLibros] = useState([])
  const [loading, setLoading] = useState(true)
  const navegar = useNavigate()

  const cargarLibros = async () => {
    try {
      setLoading(true)
      const data = await listarLibros()
      setLibros(data)
    } catch (error) {
      console.error('Error al cargar libros:', error)
      alert('Error al cargar los libros')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargarLibros()
  }, [])

  const manejarEliminar = async (id) => {
    const confirmado = window.confirm('¿Estás seguro de eliminar este libro?')
    if (!confirmado) return

    try {
      await eliminarLibro(id)
      setLibros((prev) => prev.filter((libro) => libro.id !== id)) // ⚡ evita recargar todo
    } catch (error) {
      console.error('Error al eliminar:', error)
      alert('No se pudo eliminar el libro')
    }
  }

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-warning"></div>
        <p className="mt-2">Cargando libros...</p>
      </div>
    )
  }

  return (
    <div className="container mt-4">
      <h2 className="text-warning text-center mb-4">
        <i className="bi bi-book-half me-2"></i>
        Listado de Libros
      </h2>

      {libros.length === 0 ? (
        <p className="text-center">No hay libros registrados 📚</p>
      ) : (
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
                <td className="d-flex gap-2">
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
      )}
    </div>
  )
}

export default ListadoLibros
