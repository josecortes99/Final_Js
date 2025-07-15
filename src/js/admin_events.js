//Exportamos la funcion
export async function eventsView() {
  const app = document.getElementById('app');
  const EVENT_URL = "http://localhost:3000/events";

  //Creamos el html que queremos que se vea en la etiqueta app
  app.innerHTML = `
    <h2 class="mb-4">Events (Admin)</h2>

    <!-- Formulario -->
    <h4>Edit Event Form</h4>
    <p>Select an event to edit.</p>
    <form id="user-form" class="row g-3 mb-4">
      <input type="hidden" id="user-id">

      <div class="col-md-3">
        <input required type="text" class="form-control" id="name" placeholder="Name">
      </div>
      <div class="col-md-3">
        <input required type="text" class="form-control" id="description" placeholder="Description">
      </div>
      <div class="col-md-2">
        <input required type="number" class="form-control" id="capacity" placeholder="Capacity">
      </div>
      <div class="col-md-2">
        <input type="date" class="form-control" id="date" placeholder="Date">
      </div>
      <div class="col-md-3">
        <button type="submit" class="btn btn-primary">Guardar</button>
      </div>
    </form>

    <!-- Tabla -->
    <div>
      <table class="table table-bordered table-hover align-middle text-center">
        <thead class="table-dark">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Capacity</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="tabla-eventos"></tbody>
      </table>
    </div>
  `;

  //Datos del html
  const form = document.getElementById("user-form");
  const name = document.getElementById("name");
  const description = document.getElementById("description");
  const capacity = document.getElementById("capacity");
  const date = document.getElementById("date");


  // Evento submit (crear o editar)
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const id = document.getElementById("user-id").value;

    const event = {
      "name": name.value,
      "description": description.value,
      "capacity": capacity.value,
      "date": date.value
    }

    //Decimos que si es el id que modifique el contenido
    try {
      if (id) {
        const res = await fetch(`${EVENT_URL}/${id}`, {
          method: 'PUT',
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify(event)
        })
      } else {
        alert("Error editing.")
      }
    } catch (error) {
      console.log("Error adding.", error);
    }
  });

  // Mostrar eventos en tabla
  async function getEvents() {
    try {
      const res = await fetch(EVENT_URL);
      const eventos = await res.json();
      const tbody = document.getElementById("tabla-eventos");

      //Validamos que haya eventos
      if (eventos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9">There are no events.</td></tr>`;
        return;
      }

      //Insertamos en la tabla los datos que llegan dinamicamente 
      tbody.innerHTML = "";
      eventos.forEach(u => {
        tbody.innerHTML += `
          <tr>
            <td>${u.name}</td>
            <td>${u.description}</td>
            <td>${u.capacity}</td>
            <td>${u.date}</td>
            <td>
              <button class="btn btn-sm btn-warning" onclick="editEvent('${u.id}')">Update</button>
              <button class="btn btn-sm btn-danger" onclick="deleteEvent('${u.id}')">Delete</button>
            </td>
          </tr>
        `;
    });
    } catch (error) {
      console.error("Error getting events.", error);
    }
  }

  // Ejecutar al cargar
  getEvents();

  //Funcion para registrar el evento de editar
  window.editEvent = async function(id) {
    const res = await fetch(`${EVENT_URL}/${id}`);
    const evento = await res.json();

    //Se traen los datos del evento a modificar
    document.getElementById("user-id").value = evento.id;
    name.value = evento.name;
    description.value = evento.description;
    capacity.value = evento.capacity;
    date.value = evento.date;
  };

  //Funcion para registrar el evento de eliminar
  window.deleteEvent = async function(id) {
    const confirmar = confirm("Do you want to delete this event?");
    if (!confirmar) return;

    //Eliminamos el dato que se requiere
    try {
      await fetch(`${EVENT_URL}/${id}`, { 
        method: "DELETE" 
      });
      getEvents();
    } catch (error) {
      console.error("Error deleting event.", error);
    }
  };
}
