// Variables globales
const calendar = document.getElementById("calendar");
const currentMonth = document.getElementById("currentMonth");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");
const houseSelector = document.getElementById("house-selector");

let currentDate = new Date();
let markedDates = {
  LOS_CHICOS: {},
  LOS_NIETOS: {},
  LA_SONADA: {},
  EL_ENCANTO: {},
};
let currentHouse = "LOS_CHICOS"; // Casa seleccionada por defecto

// Cargar datos almacenados localmente
if (localStorage.getItem("markedDates")) {
  markedDates = JSON.parse(localStorage.getItem("markedDates"));
}

// Guardar fechas marcadas
function saveMarkedDates() {
  localStorage.setItem("markedDates", JSON.stringify(markedDates));
}

// Renderizar el calendario
function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  currentMonth.textContent = currentDate.toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric",
  });

  calendar.innerHTML = "";

  // Agregar los días vacíos al principio
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    calendar.appendChild(emptyCell);
  }

  // Agregar los días del mes
  for (let date = 1; date <= lastDate; date++) {
    const dateCell = document.createElement("div");
    dateCell.className = "date";
    dateCell.textContent = date;

    const dateKey = `${year}-${month + 1}-${date}`;

    // Marcar si la fecha ya está marcada
    if (markedDates[currentHouse][dateKey]) {
      dateCell.classList.add("cross");
    }

    // Agregar el evento de doble clic
    dateCell.addEventListener("dblclick", () => {
      if (markedDates[currentHouse][dateKey]) {
        delete markedDates[currentHouse][dateKey];
      } else {
        markedDates[currentHouse][dateKey] = true;
      }
      saveMarkedDates(); // Guardar cambios
      renderCalendar(); // Actualizar calendario
    });

    calendar.appendChild(dateCell);
  }
}

// Cambiar de casa
houseSelector.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    currentHouse = e.target.getAttribute("data-house");
    renderCalendar();
  }
});

// Navegar entre meses
prevMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// Inicializar el calendario
renderCalendar();
