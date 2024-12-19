// Variables globales para el mes y año actuales
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Obtener referencias a los elementos del DOM
const calendar = document.getElementById('calendar');
const currentMonthElem = document.getElementById('currentMonth');

// Función para actualizar el calendario
function updateCalendar() {
  // Crear un objeto Date con el primer día del mes actual
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);

  // Obtener el número de días del mes actual
  const totalDays = lastDay.getDate();
  const startingDay = firstDay.getDay(); // Día de la semana del primer día del mes

  // Limpiar el calendario
  calendar.innerHTML = '';

  // Mostrar el mes y el año
  currentMonthElem.textContent = `${getMonthName(currentMonth)} ${currentYear}`;

  // Agregar días en el calendario
  for (let i = 0; i < startingDay; i++) {
    // Agregar celdas vacías antes de los primeros días del mes
    const emptyCell = document.createElement('div');
    calendar.appendChild(emptyCell);
  }

  for (let day = 1; day <= totalDays; day++) {
    const dayCell = document.createElement('div');
    dayCell.classList.add('date');
    dayCell.textContent = day;

    // Comprobar si el día ya tiene una cruz marcada
    if (localStorage.getItem(`${currentYear}-${currentMonth + 1}-${day}`) === 'cross') {
      dayCell.classList.add('cross');
    }

    // Agregar evento de doble clic para marcar y desmarcar la cruz
    dayCell.addEventListener('dblclick', () => toggleCross(day, dayCell));

    calendar.appendChild(dayCell);
  }
}

// Función para cambiar de mes
function changeMonth(offset) {
  currentMonth += offset;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  updateCalendar();
}

// Función para obtener el nombre del mes
function getMonthName(monthIndex) {
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  return months[monthIndex];
}

// Función para marcar y desmarcar las cruces
function toggleCross(day, dayCell) {
  const dateKey = `${currentYear}-${currentMonth + 1}-${day}`;

  if (dayCell.classList.contains('cross')) {
    // Si ya tiene cruz, la quitamos
    dayCell.classList.remove('cross');
    localStorage.removeItem(dateKey); // Remover la cruz de localStorage
  } else {
    // Si no tiene cruz, la agregamos
    dayCell.classList.add('cross');
    localStorage.setItem(dateKey, 'cross'); // Guardar la cruz en localStorage
  }
}

// Inicializar el calendario al cargar la página
updateCalendar();

// Agregar eventos a los botones para cambiar de mes
document.getElementById('prevMonth').addEventListener('click', () => changeMonth(-1));
document.getElementById('nextMonth').addEventListener('click', () => changeMonth(1));
