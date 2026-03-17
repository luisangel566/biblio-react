import { Routes, Route, Navigate } from 'react-router-dom'
import Navegacion from './componentes/Navegacion'
import ListadoLibros from './libros/ListadoLibros'
import AgregarLibro from './libros/AgregarLibro'
import EditarLibro from './libros/EditarLibro'

// Layout reutilizable
function Layout({ children }) {
  return (
    <>
      <Navegacion />
      <div className="container mt-4">
        {children}
      </div>
    </>
  )
}

function App() {
  return (
    <Layout>
      <Routes>
        {/* Rutas principales */}
        <Route path="/" element={<ListadoLibros />} />
        <Route path="/agregar" element={<AgregarLibro />} />
        <Route path="/editar/:id" element={<EditarLibro />} />

        {/* Redirección opcional */}
        <Route path="/home" element={<Navigate to="/" />} />

        {/* Ruta 404 */}
        <Route path="*" element={<h2 className="text-center">404 - Página no encontrada</h2>} />
      </Routes>
    </Layout>
  )
}

export default App
