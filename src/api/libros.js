import axios from "axios";

const urlBase = "http://localhost:8000/api/libros";

const listarLibros = async () => {
 const respuesta = await axios.get(`${urlBase}?limit=100`);
  return respuesta.data.data;
};

const obtenerLibroPorId = async (id) => {
  const respuesta = await axios.get(`${urlBase}/${id}`);
  return respuesta.data;
};

const crearLibro = async (libro) => {
  if (!libro.titulo || libro.titulo.trim() === "") {
    throw new Error("El título es obligatorio");
  }
  if (!libro.autor || libro.autor.trim() === "") {
    throw new Error("El autor es obligatorio");
  }
  if (!libro.rating || libro.rating < 1 || libro.rating > 5) {
    throw new Error("El rating debe ser un número entre 1 y 5");
  }
  const respuesta = await axios.post(urlBase, libro);
  return respuesta.data;
};

const actualizarLibro = async (id, libro) => {
  if (!libro.titulo || libro.titulo.trim() === "") {
    throw new Error("El título es obligatorio");
  }
  if (!libro.autor || libro.autor.trim() === "") {
    throw new Error("El autor es obligatorio");
  }
  if (!libro.rating || libro.rating < 1 || libro.rating > 5) {
    throw new Error("El rating debe ser un número entre 1 y 5");
  }
  const respuesta = await axios.put(`${urlBase}/${id}`, libro);
  return respuesta.data;
};

const eliminarLibro = async (id) => {
  const respuesta = await axios.delete(`${urlBase}/${id}`);
  return respuesta.data;
};

export { urlBase, listarLibros, obtenerLibroPorId, crearLibro, actualizarLibro, eliminarLibro };
export default axios;
