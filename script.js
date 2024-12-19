document.addEventListener("DOMContentLoaded", function () {
    const prevMonthButton = document.getElementById("prevMonth");
    const nextMonthButton = document.getElementById("nextMonth");
    const currentMonthDisplay = document.getElementById("currentMonth");
    const calendarContainer = document.getElementById("calendar");
  
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const daysOfWeek = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
    let currentDate = new Date(); // Fecha actual
    let bookedDates = JSON.parse(localStorage.getItem("bookedDates")) || []; // Fechas ocupadas desde localStorage
  
    // Función para generar el calendario
    function generateCalendar(month, year) {
      // Limpiar el calendario actual
      calendarContainer.innerHTML = "";
  
      // Mostrar los días de la semana
      daysOfWeek.forEach(day => {
        const dayElement = document.createElement("div");
        dayElement.classList.add("date");
        dayElement.textContent = day;
        dayElement.style.fontWeight = "bold"; // Negrita para los días de la semana
        calendarContainer.appendChild(dayElement);
      });
  
      // Obtener el primer día del mes y el número de días en el mes
      const firstDayOfMonth = new Date(year, month, 1).getDay();
      const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  
      // Ajustar para que el primer día de la semana sea lunes (0 = domingo, 1 = lunes, ...)
      const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  
      // Rellenar las celdas del calendario
      for (let i = 0; i < startDay; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.classList.add("date");
        calendarContainer.appendChild(emptyCell);
      }
  
      // Mostrar los días del mes
      for (let day = 1; day <= lastDayOfMonth; day++) {
        const dateCell = document.createElement("div");
        dateCell.classList.add("date");
        dateCell.textContent = day;
  
        // Verificar si la fecha está marcada como ocupada
        if (bookedDates.includes(`${year}-${month + 1}-${day}`)) {
          dateCell.classList.add("cross");
        }
  
        // Agregar evento para marcar/desmarcar fechas
        dateCell.addEventListener("dblclick", () => toggleDateBooking(year, month, day, dateCell));
  
        calendarContainer.appendChild(dateCell);
      }
    }
  
    // Función para marcar/desmarcar fechas
    function toggleDateBooking(year, month, day, dateCell) {
      const dateKey = `${year}-${month + 1}-${day}`;
      if (bookedDates.includes(dateKey)) {
        bookedDates = bookedDates.filter(date => date !== dateKey); // Desmarcar
        dateCell.classList.remove("cross");
      } else {
        bookedDates.push(dateKey); // Marcar
        dateCell.classList.add("cross");
      }
  
      // Guardar las fechas ocupadas en el localStorage para persistencia
      localStorage.setItem("bookedDates", JSON.stringify(bookedDates));
    }
  
    // Función para manejar los botones de mes anterior y siguiente
    prevMonthButton.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      currentMonthDisplay.textContent = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
      generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
    });
  
    nextMonthButton.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      currentMonthDisplay.textContent = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
      generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
    });
  
    // Inicializar el calendario con el mes y año actuales
    currentMonthDisplay.textContent = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
  });
  
