//Exportamos la funcion
export async function curseViewEvents() {
  const app = document.getElementById('app');
  const EVENT_URL = "http://localhost:3000/events";
  const REGISTER_URL = "http://localhost:3000/enrollments";

  //Creamos el html que queremos que se vea en la etiqueta app
  app.innerHTML = `
    <h2 class="mb-4">Available events</h2>

    <!-- Tabla -->
    <div>
      <table class="table table-bordered table-hover align-middle text-center">
        <thead class="table-dark">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Capacity</th>
            <th>Date</th>
            <th>Register</th>
          </tr>
        </thead>
        <tbody id="tabla-eventos"></tbody>
      </table>
    </div>
  `;

  // Mostrar eventos en tabla
  async function getEvents() {
    try {
      const res = await fetch(EVENT_URL);
      const eventos = await res.json();
      const tbody = document.getElementById("tabla-eventos");

      //validamos que hay eventos
      if (eventos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9">There are no events</td></tr>`;
        return;
      }

      //insertamos los datos dinamicos en la tabla 
      tbody.innerHTML = "";
      eventos.forEach(e => {
        tbody.innerHTML += `
          <tr>
            <td>${e.name}</td>
            <td>${e.description}</td>
            <td>${e.capacity}</td>
            <td>${e.date}</td>
            <td>
              <button class="btn btn-sm btn-warning" onclick="Register('${e.id}')">Register</button>
            </td>
          </tr>
        `;
      });

    } catch (error) {
      console.error("Error getting events:", error);
    }
  }

  // Ejecutar al cargar
  getEvents();

  //Funcion para registrar evento para registrarse
  window.Register = async function(courseId) {
  const confirmar = confirm("Do you want to register for this course?");
  if (!confirmar) return;

  const user = JSON.parse(localStorage.getItem("usuarioLogueado")); // Usuario logueado
  const userId = user.id;

  //Registramos en el localStorage
  try {
    const res = await fetch(REGISTER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, courseId })
    });

    alert("You have successfully registered!");

  } catch (error) {
    console.error("Error registering registration:", error);
    alert("Error registering.");
  }
};


}
