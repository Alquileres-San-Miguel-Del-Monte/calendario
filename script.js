document.addEventListener("DOMContentLoaded", function () {
    const calendarContainer = document.getElementById("calendar-container");
    const daysOfWeek = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
    let bookedDates = []; // Aquí se guardarán las fechas marcadas como ocupadas

    function generateCalendar(month, year) {
        // Limpiar el contenedor de calendario
        calendarContainer.innerHTML = "";

        // Mostrar los días de la semana
        daysOfWeek.forEach(day => {
            const dayElement = document.createElement("div");
            dayElement.classList.add("day");
            dayElement.innerText = day;
            calendarContainer.appendChild(dayElement);
        });

        // Obtener el primer día del mes y el número de días en el mes
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();
        const startingDay = firstDayOfMonth.getDay(); // Día de la semana en que empieza el mes (0 = Domingo, 1 = Lunes, etc.)

        // Rellenar los días vacíos antes del primer día del mes
        for (let i = 0; i < startingDay; i++) {
            const emptyCell = document.createElement("div");
            calendarContainer.appendChild(emptyCell);
        }

        // Crear los días del mes
        for (let day = 1; day <= daysInMonth; day++) {
            const dateElement = document.createElement("div");
            dateElement.classList.add("date");
            dateElement.innerText = day;

            // Marcar las fechas ocupadas
            if (bookedDates.includes(day)) {
                dateElement.classList.add("booked");
            }

            // Agregar evento para marcar o desmarcar fechas ocupadas
            dateElement.addEventListener("click", function () {
                if (bookedDates.includes(day)) {
                    bookedDates = bookedDates.filter(date => date !== day); // Eliminar la fecha
                    dateElement.classList.remove("booked");
                } else {
                    bookedDates.push(day); // Agregar la fecha
                    dateElement.classList.add("booked");
                }
                localStorage.setItem("bookedDates", JSON.stringify(bookedDates)); // Guardar en localStorage para persistencia
            });

            calendarContainer.appendChild(dateElement);
        }
    }

    // Cargar las fechas ocupadas desde localStorage
    if (localStorage.getItem("bookedDates")) {
        bookedDates = JSON.parse(localStorage.getItem("bookedDates"));
    }

    // Mostrar el calendario del mes actual
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    generateCalendar(currentMonth, currentYear);
});
