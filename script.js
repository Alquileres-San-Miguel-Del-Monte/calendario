// Referencias al DOM
const calendar = document.getElementById("calendar");
const currentMonth = document.getElementById("currentMonth");
const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");

// Fecha actual
let today = new Date();
let currentYear = today.getFullYear();
let currentMonthIndex = today.getMonth();

// Función para generar el calendario
function generateCalendar(year, month) {
  // Limpiar el calendario
  calendar.innerHTML = "";

  // Configurar el mes actual
  const firstDay = new Date(year, month, 1).getDay(); // Primer día del mes
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Días en el mes

  // Mostrar el mes y el año actual
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  currentMonth.textContent = `${monthNames[month]} ${year}`;

  // Generar días vacíos al inicio
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.classList.add("date");
    calendar.appendChild(emptyCell);
  }

  // Generar días del mes
  for (let day = 1; day <= daysInMonth; day++) {
    const dateElement = document.createElement("div");
    dateElement.classList.add("date");
    dateElement.textContent = day;
    const dateKey = `${year}-${month}-${day}`;

    // Restaurar estado de la cruz si está marcada
    if (localStorage.getItem(dateKey) === "true") {
      dateElement.classList.add("cross");
    }

    // Agregar evento de doble clic
    dateElement.addEventListener("dblclick", () => toggleCross(dateElement, dateKey));

    calendar.appendChild(dateElement);
  }
}

// Función para alternar la cruz roja
function toggleCross(dateElement, dateKey) {
  const isMarked = dateElement.classList.toggle("cross");

  // Guardar o eliminar la marca en LocalStorage
  if (isMarked) {
    localStorage.setItem(dateKey, "true");
  } else {
    localStorage.removeItem(dateKey);
  }
}

// Función para cambiar de mes
function changeMonth(offset) {
  currentMonthIndex += offset;

  if (currentMonthIndex < 0) {
    currentMonthIndex = 11;
    currentYear--;
  } else if (currentMonthIndex > 11) {
    currentMonthIndex = 0;
    currentYear++;
  }

  generateCalendar(currentYear, currentMonthIndex);
}

// Eventos para cambiar de mes
prevMonthButton.addEventListener("click", () => changeMonth(-1));
nextMonthButton.addEventListener("click", () => changeMonth(1));

// Generar el calendario inicial
generateCalendar(currentYear, currentMonthIndex);
