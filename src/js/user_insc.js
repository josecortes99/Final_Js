//Exportamos la funcion
export async function inscViewUser() {
  const app = document.getElementById('app');
  
  const ENROLLMENTS_URL = "http://localhost:3000/enrollments";
  const EVENTS_URL = "http://localhost:3000/events";

  //Creamos el html que queremos que se vea en la etiqueta app
  app.innerHTML = `
    <h2 class="mb-4">registered events</h2>
    <table class="table table-bordered table-hover align-middle text-center">
      <thead class="table-dark">
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody id="tabla-inscritos"></tbody>
    </table>
  `;

  // Obtener usuario logueado correctamente
  const user = JSON.parse(localStorage.getItem("usuarioLogueado"));
  if (!user) {
    alert("You must log in to view your registered events.");
    window.location.href = "./login.html";
    return;
  }

  const userId = user.id;

  //Peticiones al json server para traer datos
  try {
    const resEnrollments = await fetch(ENROLLMENTS_URL);
    const resEvents = await fetch(EVENTS_URL);
    
    const enrollments = await resEnrollments.json();
    const eventos = await resEvents.json();

    const misInscripciones = enrollments.filter(e => e.userId === userId);

    //Verificamosd que haya datos
    const tbody = document.getElementById("tabla-inscritos");
    if (misInscripciones.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5">You are not registered for any event</td></tr>`;
      return;
    }

    //Agregamos dinamicamente datos a la tabla
    tbody.innerHTML = "";
    misInscripciones.forEach(insc => {
      const evento = eventos.find(c => c.id === insc.courseId);
      if (!evento) return;

      tbody.innerHTML += `
        <tr>
          <td>${evento.name}</td>
          <td>${evento.description}</td>
          <td>${evento.date}</td>
        </tr>
      `;
    });

  } catch (error) {
    console.error("Error al cargar cursos inscritos:", error);
  }
}
