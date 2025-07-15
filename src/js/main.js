import { routes } from './routes.js';

let selector = document.querySelectorAll(["data-link"]);

// Verificar si hay usuario logueado
const user = JSON.parse(localStorage.getItem("usuarioLogueado"));

const saludo = document.getElementById("saludo-usuario");
const rol = document.getElementById("rol-usuario");
saludo.textContent = `${user.name}`;
rol.textContent = `${user.role}`;

// Escucha cambios en la URL (hash) y carga la vista correspondiente desde el enrutador
window.addEventListener("hashchange", () => {
    let path = window.location.hash;
    routes[path](); // Llama a la función asociada a la ruta actual
});


// Cuando el DOM se ha cargado, detecta si hay un hash en la URL y ejecuta la vista correspondiente
document.addEventListener("DOMContentLoaded", () => {
    let path = window.location.hash;
    routes[path](); // Carga inicial basada en la URL actual
});


// A cada enlace con data-link le asigna una función que navega dinámicamente sin recargar la página
selector.forEach(element => {
    element.addEventListener("click", (e) => {
        e.preventDefault(); // Evita la recarga de la página
        let path = e.target.getAttribute("href"); // Obtiene la ruta del enlace
        routes[path](); // Ejecuta la vista asociada a esa ruta
    });
});


document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("usuarioLogueado");
});







