//Obtenemos los datos del html
const loginForm = document.getElementById("loginForm");
const user = document.getElementById("user");
const password = document.getElementById("password");


//Realizamos el evento deL formulario
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  //traemos los datos del form 
  const usuario = user.value;
  const contraseña = password.value.trim();

  //Validamos que ingresen todos los campos 
  if (!usuario || !contraseña) {
    alert("All fields are required.");
    return;
  }

  //Traemos datops del localstorage
  const usuariosRegistrados = JSON.parse(localStorage.getItem("lista"));

  //Filtramos los campos para hacer validacion de que existan 
  const validation = usuariosRegistrados.find(e =>
    (e.name === usuario || e.email === usuario) && e.password === contraseña
  );

  if (validation) {
    alert("Access granted.");
    console.log("Access granted");

    // Guardar el usuario logueado
    localStorage.setItem("usuarioLogueado", JSON.stringify(validation));

    // Redireccionar según el rol
    if (validation.role === "admin") {
      window.location.href = "../pages/dashboard.html";
    } else {
      window.location.href = "../pages/public.html";
    }

  } else {
    alert("Incorrect credentials");
    console.log("Incorrect credentials");
  }
});



