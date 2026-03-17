import axios from "axios";

// Configuración base
const api = axios.create({
  baseURL: "http://localhost:8000/api/libros",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔍 Manejo centralizado de errores
const manejarError = (error) => {
  if (error.response) {
    throw new Error(error.response.data?.message || "Error del servidor");
  } else if (error.request) {
    throw new Error("No hubo respuesta del servidor");
  } else {
    throw new Error(error.message);
  }
};

// ✅ Validación reutilizable
const validarLibro = (libro) => {
  if (!libro.titulo?.trim()) {
    throw new Error("El título es obligatorio");
  }
  if (!libro.autor?.trim()) {
    throw new Error("El autor es obligatorio");
  }
  if (typeof libro.rating !== "number" || libro.rating < 1 || libro.rating > 5) {
    throw new Error("El rating debe ser un número entre 1 y 5");
  }
};

// 📚 Listar libros
export const listarLibros = async (limit = 100) => {
  try {
    const { data } = await api.get(`?limit=${limit}`);
    return data.data;
  } catch (error) {
    manejarError(error);
  }
};

// 🔎 Obtener por ID
export const obtenerLibroPorId = async (id) => {
  try {
    const { data } = await api.get(`/${id}`);
    return data;
  } catch (error) {
    manejarError(error);
  }
};

// ➕ Crear libro
export const crearLibro = async (libro) => {
  try {
    validarLibro(libro);
    const { data } = await api.post("/", libro);
    return data;
  } catch (error) {
    manejarError(error);
  }
};

// ✏️ Actualizar libro
export const actualizarLibro = async (id, libro) => {
  try {
    validarLibro(libro);
    const { data } = await api.put(`/${id}`, libro);
    return data;
  } catch (error) {
    manejarError(error);
  }
};

// ❌ Eliminar libro
export const eliminarLibro = async (id) => {
  try {
    const { data } = await api.delete(`/${id}`);
    return data;
  } catch (error) {
    manejarError(error);
  }
};

export default api;
