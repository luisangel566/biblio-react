import { useEffect, useState } from 'react' // [EXISTENTE]
import { useParams, useNavigate } from 'react-router-dom' // [EXISTENTE]
import { obtenerLibroPorId, actualizarLibro } from '../api/libros' // [MODIFICADO]

function EditarLibro() {
  const { id } = useParams() // [EXISTENTE]
  const navegar = useNavigate() // [EXISTENTE]

  const [libro, setLibro] = useState({ // [EXISTENTE]
    titulo: '',
    autor: '',
    rating: ''
  })

  const [error, setError] = useState('') // [EXISTENTE]
  const [exito, setExito] = useState('') // [NUEVO]

  // [EXISTENTE]
  const cargarLibro = async () => {
    try {
      const data = await obtenerLibroPorId(id)
      setLibro({
        titulo: data.titulo,
        autor: data.autor,
        rating: data.rating
      })
    } catch (err) {
      setError('No se pudo cargar el libro')
    }
  }

  useEffect(() => { // [EXISTENTE]
    cargarLibro()
  }, [id])

  // [EXISTENTE]
  const manejarCambio = (e) => {
    setLibro({ ...libro, [e.target.name]: e.target.value })
  }

  // [NUEVO]
  const manejarEnvio = async (e) => {
    e.preventDefault()
    setError('')
    setExito('')
    try {
      await actualizarLibro(id, {
        ...libro,
        rating: parseInt(libro.rating)
      })
      setExito('¡Libro actualizado exitosamente!')
      setTimeout(() => {
        navegar('/')
      }, 1500)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="container mt-4">
      <h2 className="text-warning text-center mb-4">
        <i className="bi bi-pencil-square me-2"></i>
        Editar Libro
      </h2>
      <div className="row justify-content-center">
        <div className="col-md-6">

          {error && (
            <div className="alert alert-danger">{error}</div>
          )}
          {exito && (
            <div className="alert alert-success">{exito}</div>
          )}

          <form onSubmit={manejarEnvio}> {/* [NUEVO] */}
            <div className="mb-3">
              <label className="form-label">Título</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingresa el título"
                name="titulo"
                value={libro.titulo}
                onChange={manejarCambio}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Autor</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingresa el autor"
                name="autor"
                value={libro.autor}
                onChange={manejarCambio}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Rating (1-5)</label>
              <input
                type="number"
                className="form-control"
                placeholder="Ingresa el rating"
                min="1"
                max="5"
                name="rating"
                value={libro.rating}
                onChange={manejarCambio}
              />
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-save me-1"></i>
                Guardar Cambios
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navegar('/')}
              >
                <i className="bi bi-x-circle me-1"></i>
                Cancelar
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default EditarLibro