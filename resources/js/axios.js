// resources/js/axios.js
import axios from "axios";

// Configura la URL base para tus solicitudes
axios.defaults.baseURL = "/api";

// Agrega el token de autenticación en los encabezados de las solicitudes
const token = localStorage.getItem("token");
if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default axios;
