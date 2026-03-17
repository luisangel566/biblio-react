import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { crearLibro } from '../api/libros'

function AgregarLibro() {
  const navegar = useNavigate()

  const [libro, setLibro] = useState({
    titulo: '',
    autor: '',
    rating: ''
  })

  const [error, setError] = useState('')
  const [exito, setExito] = useState('')
  const [cargando, setCargando] = useState(false)

  const manejarCambio = (e) => {
    setLibro({
      ...libro,
      [e.target.name]: e.target.value
    })
  }

  const validarFormulario = () => {
    if (!libro.titulo.trim()) return 'El título es obligatorio'
    if (!libro.autor.trim()) return 'El autor es obligatorio'

    const ratingNum = Number(libro.rating)
    if (!ratingNum || ratingNum < 1 || ratingNum > 5) {
      return 'El rating debe estar entre 1 y 5'
    }

    return null
  }

  const manejarEnvio = async (e) => {
    e.preventDefault()

    setError('')
    setExito('')

    const errorValidacion = validarFormulario()
    if (errorValidacion) {
      setError(errorValidacion)
      return
    }

    setCargando(true)

    try {
      await crearLibro({
        ...libro,
        rating: Number(libro.rating)
      })

      setExito('¡Libro agregado exitosamente!')

      // limpiar formulario
      setLibro({
        titulo: '',
        autor: '',
        rating: ''
      })

      setTimeout(() => navegar('/'), 1200)

    } catch (err) {
      setError(
        err.response?.data?.error ||
        'Error al crear el libro'
      )
    } finally {
      setCargando(false)
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

          {error && (
            <div className="alert alert-danger">{error}</div>
          )}

          {exito && (
            <div className="alert alert-success">{exito}</div>
          )}

          <form onSubmit={manejarEnvio} noValidate>

            <div className="mb-3">
              <label className="form-label">Título</label>
              <input
                type="text"
                className="form-control"
                name="titulo"
                value={libro.titulo}
                onChange={manejarCambio}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Autor</label>
              <input
                type="text"
                className="form-control"
                name="autor"
                value={libro.autor}
                onChange={manejarCambio}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Rating (1-5)</label>
              <input
                type="number"
                className="form-control"
                name="rating"
                value={libro.rating}
                onChange={manejarCambio}
                min="1"
                max="5"
                required
              />
            </div>

            <div className="d-flex gap-2">

              <button
                type="submit"
                className="btn btn-primary"
                disabled={cargando}
              >
                {cargando ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Guardando...
                  </>
                ) : (
                  <>
                    <i className="bi bi-save me-1"></i>
                    Guardar
                  </>
                )}
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navegar('/')}
                disabled={cargando}
              >
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
