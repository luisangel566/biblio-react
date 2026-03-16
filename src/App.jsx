import { Routes, Route } from 'react-router-dom' // [EXISTENTE]
import Navegacion from './componentes/Navegacion' // [EXISTENTE]
import ListadoLibros from './libros/ListadoLibros' // [EXISTENTE]
import AgregarLibro from './libros/AgregarLibro' // [EXISTENTE]
import EditarLibro from './libros/EditarLibro' // [NUEVO]

function App() {
  return (
    <>
      <Navegacion />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<ListadoLibros />} />
          <Route path="/agregar" element={<AgregarLibro />} />
          <Route path="/editar/:id" element={<EditarLibro />} /> {/* [NUEVO] */}
        </Routes>
      </div>
    </>
  )
}

export default App