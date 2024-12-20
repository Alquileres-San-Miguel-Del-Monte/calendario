// JavaScript para gestionar el calendario y las cruces
const calendar = document.getElementById('calendar');
const currentMonthElement = document.getElementById('currentMonth');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');
let currentDate = new Date();

// Función para mostrar el calendario
function renderCalendar() {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

    currentMonthElement.textContent = `${firstDay.toLocaleString('default', { month: 'long' })} ${year}`;
    
    calendar.innerHTML = ''; // Limpiar el calendario actual

    // Crear las celdas de los días
    for (let i = 0; i < startDay; i++) {
        const emptyCell = document.createElement('div');
        calendar.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('date');
        dayCell.textContent = day;
        
        // Agregar evento de doble clic para marcar/desmarcar
        dayCell.addEventListener('dblclick', function() {
            dayCell.classList.toggle('cross');
        });

        calendar.appendChild(dayCell);
    }
}

// Función para cambiar al mes anterior
prevMonthButton.addEventListener('click', function() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

// Función para cambiar al mes siguiente
nextMonthButton.addEventListener('click', function() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Inicializar el calendario
renderCalendar();
