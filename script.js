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
let touchTimeout; // Para controlar el tiempo de toque

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

  // Agregar los días de la semana
  const daysOfWeek = ["L", "M", "M", "J", "V", "S", "D"];
  daysOfWeek.forEach((day) => {
    const dayHeader = document.createElement("div");
    dayHeader.className = "day-header"; // Clase para estilo
    dayHeader.textContent = day;
    calendar.appendChild(dayHeader);
  });

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

    // Agregar el evento de mantener presionado
    dateCell.addEventListener("touchstart", (e) => {
      e.preventDefault(); // Prevenir el evento por defecto de touch

      // Iniciar el temporizador para detectar el tiempo de toque
      touchTimeout = setTimeout(() => {
        if (markedDates[currentHouse][dateKey]) {
          delete markedDates[currentHouse][dateKey];
        } else {
          markedDates[currentHouse][dateKey] = true;
        }
        saveMarkedDates(); // Guardar cambios
        renderCalendar(); // Actualizar calendario
      }, 1000); // 1 segundo
    });

    // Cancelar el temporizador si el toque termina antes de 1 segundo
    dateCell.addEventListener("touchend", () => {
      clearTimeout(touchTimeout);
    });

    calendar.appendChild(dateCell);
  }

  // Resaltar la casa seleccionada
  highlightSelectedHouse();
}

// Cambiar de casa
houseSelector.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    currentHouse = e.target.getAttribute("data-house");
    renderCalendar();
  }
});

// Función para resaltar la casa seleccionada
function highlightSelectedHouse() {
  const houseButtons = houseSelector.querySelectorAll("button");

  houseButtons.forEach((button) => {
    if (button.getAttribute("data-house") === currentHouse) {
      button.classList.add("selected");
    } else {
      button.classList.remove("selected");
    }
  });
}

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
