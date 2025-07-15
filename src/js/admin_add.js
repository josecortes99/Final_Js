//Exportamos la funcion
export async function addView() {
  const app = document.getElementById('app');
  const EVENT_URL = "http://localhost:3000/events";

  //Creamos el html que queremos que se vea en la etiqueta app
  app.innerHTML = `
    <h2 class="mb-4">Events (Admin)</h2>

    <!-- Formulario -->
    <div class="container mt-5">
    <h4>Form Add Event</h4>
    <form id="user-form" class="card p-4 shadow-sm">
    <input type="hidden" id="user-id">
      <div class="mb-3">
        <label for="user" class="form-label">Name Event</label>
        <input required type="text" class="form-control" id="name" placeholder="name">
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <input required type="text" class="form-control" id="description" placeholder="Description">
      </div>
      <div class="mb-3">
        <label for="capacity" class="form-label">Capacity</label>
        <input required type="number" class="form-control" id="capacity" placeholder="Capacity">
      </div>
      <div class="mb-3">
        <label for="date" class="form-label">Date</label>
        <input type="date" class="form-control" id="date" placeholder="Date">
      </div>
      <button type="submit" class="btn btn-primary w-100">Add</button>
    </form>
  </div>
  `;

  // Obtenemos los datos del formulario
  const form = document.getElementById("user-form");
  const name = document.getElementById("name");
  const description = document.getElementById("description");
  const capacity = document.getElementById("capacity");
  const date = document.getElementById("date");


  // Evento del formulario para crear 
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("user-id").value;

    //Creamos el objeto a añadir
    const event = {
      "name": name.value,
      "description": description.value,
      "capacity": capacity.value,
      "date": date.value
    }

    //Añadimos el objeto al json server
    try {
      const res = await fetch(`${EVENT_URL}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event)
      })
      alert("success add")

    } catch (error) {
      console.log("Error adding", error);
    }
  });
}
