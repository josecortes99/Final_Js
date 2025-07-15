//Guardamos la url en una variable
const USER_URL = "http://localhost:3000/users";

//Obtenemos los datos del html
const form = document.getElementById("registerForm");
const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

//Realizamos el evento deL formulario
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  //traemos los datos del form 
  const nombre = name.value;
  const correo = email.value.trim();
  const contraseña = password.value.trim();
  const confirmContraseña = confirmPassword.value.trim();

  //Validamos que ingresen todos los campos 
  if (!nombre || !correo || !contraseña || !confirmContraseña) {
    alert("All fields are required.");
    return;
  }

  //Creamos el objeto a ingresar a localStorage y al json-server
  const newUser = {
    "name": nombre,
    "email": correo,
    "password": contraseña,
    "confirmPassword": confirmContraseña,
    "role": "visitor"
  };

  // traemos e ingresamos los datos al localStorage
  const local = JSON.parse(localStorage.getItem("lista"));
  local.push(newUser);
  localStorage.setItem("lista", JSON.stringify(local));

  //se ingresa los datos al json-server
  try {
    const res = await fetch(USER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    });
    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    window.location.href = "../pages/login.html";
  } catch (error) {
    console.error("Error registrando usuario:", error);
    alert("Ocurrió un error al registrar. Intenta de nuevo.");
  }
});
