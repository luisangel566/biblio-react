import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { obtenerLibroPorId, actualizarLibro } from '../api/libros'

function EditarLibro() {
  const { id } = useParams()
  const navegar = useNavigate()

  const [libro, setLibro] = useState({
    titulo: '',
    autor: '',
    rating: ''
  })

  const [error, setError] = useState('')
  const [exito, setExito] = useState('')
  const [loading, setLoading] = useState(true)
  const [guardando, setGuardando] = useState(false)

  // 🔹 Cargar libro con control de estado
  useEffect(() => {
    let activo = true

    const cargarLibro = async () => {
      try {
        const data = await obtenerLibroPorId(id)

        if (!activo) return

        setLibro({
          titulo: data.titulo || '',
          autor: data.autor || '',
          rating: data.rating?.toString() || ''
        })
      } catch (err) {
        setError('No se pudo cargar el libro')
      } finally {
        setLoading(false)
      }
    }

    cargarLibro()

    return () => {
      activo = false
    }
  }, [id])

  // 🔹 Manejo de inputs
  const manejarCambio = (e) => {
    const { name, value } = e.target
    setLibro(prev => ({ ...prev, [name]: value }))
  }

  // 🔹 Validación simple
  const validar = () => {
    if (!libro.titulo.trim()) return 'El título es obligatorio'
    if (!libro.autor.trim()) return 'El autor es obligatorio'

    const ratingNum = Number(libro.rating)
    if (!ratingNum || ratingNum < 1 || ratingNum > 5) {
      return 'El rating debe estar entre 1 y 5'
    }

    return null
  }

  // 🔹 Envío mejorado
  const manejarEnvio = async (e) => {
    e.preventDefault()

    setError('')
    setExito('')

    const errorValidacion = validar()
    if (errorValidacion) {
      setError(errorValidacion)
      return
    }

    setGuardando(true)

    try {
      await actualizarLibro(id, {
        ...libro,
        rating: Number(libro.rating)
      })

      setExito('¡Libro actualizado exitosamente!')

      setTimeout(() => navegar('/'), 1500)

    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Error al actualizar'
      )
    } finally {
      setGuardando(false)
    }
  }

  // 🔹 Loading UI
  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-warning"></div>
        <p className="mt-2">Cargando libro...</p>
      </div>
    )
  }

  return (
    <div className="container mt-4">
      <h2 className="text-warning text-center mb-4">
        <i className="bi bi-pencil-square me-2"></i>
        Editar Libro
      </h2>

      <div className="row justify-content-center">
        <div className="col-md-6">

          {error && <div className="alert alert-danger">{error}</div>}
          {exito && <div className="alert alert-success">{exito}</div>}

          <form onSubmit={manejarEnvio}>
            <div className="mb-3">
              <label className="form-label">Título</label>
              <input
                type="text"
                className="form-control"
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
                min="1"
                max="5"
                name="rating"
                value={libro.rating}
                onChange={manejarCambio}
              />
            </div>

            <div className="d-flex gap-2">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={guardando}
              >
                {guardando ? 'Guardando...' : 'Guardar Cambios'}
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navegar('/')}
                disabled={guardando}
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

export default EditarLibro
