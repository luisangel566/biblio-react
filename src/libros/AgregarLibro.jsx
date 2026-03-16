import { useState } from 'react' // [NUEVO]
import { useNavigate } from 'react-router-dom' // [NUEVO]
import { crearLibro } from '../api/libros' // [NUEVO]

function AgregarLibro() {
  const navegar = useNavigate() // [NUEVO]

  const [libro, setLibro] = useState({ // [NUEVO]
    titulo: '',
    autor: '',
    rating: ''
  })

  const [error, setError] = useState('') // [NUEVO]
  const [exito, setExito] = useState('') // [NUEVO]

  // [NUEVO]
  const manejarCambio = (e) => {
    setLibro({ ...libro, [e.target.name]: e.target.value })
  }

  // [NUEVO]
  const manejarEnvio = async (e) => {
    e.preventDefault()
    setError('')
    setExito('')
    try {
      await crearLibro({
        ...libro,
        rating: parseInt(libro.rating)
      })
      setExito('¡Libro agregado exitosamente!')
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
        <i className="bi bi-plus-circle me-2"></i>
        Agregar Libro
      </h2>
      <div className="row justify-content-center">
        <div className="col-md-6">

          {error && ( // [NUEVO]
            <div className="alert alert-danger">{error}</div>
          )}
          {exito && ( // [NUEVO]
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
                Guardar
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

export default AgregarLibro