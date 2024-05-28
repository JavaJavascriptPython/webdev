document.addEventListener('DOMContentLoaded', () => {
    const datePicker = document.getElementById('date-picker');
    const prevDayButton = document.getElementById('prev-day');
    const nextDayButton = document.getElementById('next-day');
    const statsTableBody = document.querySelector('#stats-table tbody');
    const toggleBtn = document.getElementById('toggle-btn');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    const fetchStats = async (date) => {
        try {
            const response = await fetch('stats.txt');
            const text = await response.text();
            const lines = text.trim().split('\n');
            const stats = lines.map(line => {
                const [date, ...data] = line.split(' ');
                return { date, data };
            });

            const selectedDateStats = stats.find(stat => stat.date === date);
            displayStats(selectedDateStats);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const displayStats = (stats) => {
        statsTableBody.innerHTML = '';
        if (stats) {
            stats.data.forEach(data => {
                const row = document.createElement('tr');
                const dateCell = document.createElement('td');
                const dataCell = document.createElement('td');

                dateCell.textContent = stats.date;
                dataCell.textContent = data;

                row.appendChild(dateCell);
                row.appendChild(dataCell);
                statsTableBody.appendChild(row);
            });
        } else {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.textContent = 'No data available';
            cell.colSpan = 2;
            row.appendChild(cell);
            statsTableBody.appendChild(row);
        }
    };

    const updateDatePickerMax = () => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        datePicker.max = yesterday.toISOString().split('T')[0];
    };

    const navigateDate = (direction) => {
        const currentDate = new Date(datePicker.value);
        const maxDate = new Date(datePicker.max);
        const minDate = new Date(datePicker.min);

        currentDate.setDate(currentDate.getDate() + direction);

        if (currentDate <= maxDate && currentDate >= minDate) {
            datePicker.value = currentDate.toISOString().split('T')[0];
            fetchStats(datePicker.value);
        }
    };

    datePicker.addEventListener('change', () => {
        fetchStats(datePicker.value);
    });

    prevDayButton.addEventListener('click', () => {
        navigateDate(-1);
    });

    nextDayButton.addEventListener('click', () => {
        navigateDate(1);
    });

    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('collapsed');
    });

    // Initialize
    updateDatePickerMax();
    datePicker.value = datePicker.max;
    datePicker.min = '2020-01-01'; // Adjust this to your earliest date in stats.txt
    fetchStats(datePicker.value);
});



const mobileNav = document.querySelector(".hamburger");
const navbar = document.querySelector(".menubar");

const toggleNav = () => {
  navbar.classList.toggle("active");
  mobileNav.classList.toggle("hamburger-active");
};
mobileNav.addEventListener("click", () => toggleNav());