document.addEventListener("DOMContentLoaded", () => {
  const calendarContainer = document.getElementById("calendar-container");
  const houseButtons = document.querySelectorAll(".house-selector button");
  const monthYear = document.getElementById("month-year");
  const daysOfWeek = document.getElementById("days-of-week");
  const daysContainer = document.getElementById("days-container");
  const prevMonthButton = document.getElementById("prev-month");
  const nextMonthButton = document.getElementById("next-month");

  const daysOfWeekNames = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  let selectedHouse = "los-chicos";
  let currentDate = new Date();

  // Generar encabezados de días de la semana
  const generateDaysOfWeek = () => {
      daysOfWeek.innerHTML = "";
      daysOfWeekNames.forEach(day => {
          const dayElement = document.createElement("div");
          dayElement.textContent = day;
          daysOfWeek.appendChild(dayElement);
      });
  };

  // Generar calendario
  const generateCalendar = () => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const firstDayOfMonth = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      monthYear.textContent = `${monthNames[month]} ${year}`;
      daysContainer.innerHTML = "";

      // Ajustar para comenzar desde el primer día correcto
      for (let i = 0; i < (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); i++) {
          const emptyDay = document.createElement("div");
          emptyDay.classList.add("day", "empty");
          daysContainer.appendChild(emptyDay);
      }

      // Crear días del mes
      for (let i = 1; i <= daysInMonth; i++) {
          const day = document.createElement("div");
          day.classList.add("day");
          day.textContent = i;

          // Restaurar estado del día desde localStorage
          const savedDays = JSON.parse(localStorage.getItem(`${selectedHouse}-${year}-${month}`)) || {};
          if (savedDays[i]) {
              day.classList.add("unavailable");
          }

          // Agregar evento de doble clic
          day.addEventListener("dblclick", () => {
              day.classList.toggle("unavailable");

              const updatedDays = JSON.parse(localStorage.getItem(`${selectedHouse}-${year}-${month}`)) || {};
              if (day.classList.contains("unavailable")) {
                  updatedDays[i] = true;
              } else {
                  delete updatedDays[i];
              }
              localStorage.setItem(`${selectedHouse}-${year}-${month}`, JSON.stringify(updatedDays));
          });

          daysContainer.appendChild(day);
      }
  };

  // Cambiar mes
  prevMonthButton.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      generateCalendar();
  });

  nextMonthButton.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      generateCalendar();
  });

  // Cambiar casa
  houseButtons.forEach(button => {
      button.addEventListener("click", () => {
          selectedHouse = button.dataset.house;
          generateCalendar();
      });
  });

  // Inicializar calendario
  generateDaysOfWeek();
  generateCalendar();
});
