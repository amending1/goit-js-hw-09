import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

document.addEventListener('DOMContentLoaded', function () {
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      // wg dokumentacji: selectedDates - an array of Date objects selected by the user. When there are no dates selected, the array is empty
      //selectedDates[0] - w tej tablicy mamy tylko jeden element (jedna wybrana data przez użytkownika) - dlatego jest [0]

      if (selectedDate < new Date()) {
        Notiflix.Notify.warning('Please choose a date in the future');
        //window.alert('Please choose a date in the future');
        document.querySelector('button[data-start]').disabled = true;
      } else {
        document.querySelector('button[data-start]').disabled = false;
      }
    },
  };

  flatpickr('#datetime-picker', options);

  document
    .querySelector('button[data-start]')
    .addEventListener('click', startCountdown);
});

function startCountdown() {
  const selectedDate = flatpickr.parseDate(
    document.getElementById('datetime-picker').value
  ); // kiedy użytkownik wprowadzi datę w polu, to przyjmuje ona wartość tekstową. Potrzebujemy mieć ją w formie obiektu daty, dlatego potrzebny jest parse (wzięty z dokumentacji flatpickr)

  const countdownInterval = setInterval(updateCountdown, 1000, selectedDate); // setInterval(callback, delay, arg1, arg2, ...);
  // parametr selectedDatee jest konieczny, żeby funkcja updateCountdown wiedziała, do kiedy ma odliczać czas (selectedDate jest przekazywane jako argument do funkcji updateCountdown)

  function updateCountdown(passedSelectedDate) {
    const currentDate = new Date(); //obiekt, który reprezentuje bieżącą datę i czas
    const timeDifference = passedSelectedDate - currentDate; //ilość milisekund pozostałych do osiągnięcia wybranej daty

    if (timeDifference <= 0) {
      //jeśli warunek jest spełniony to znaczy, że osiągnęliśmy wybraną datę
      clearInterval(countdownInterval); //zatrzymuję działanie interwału odliczania
      const newTime = convertMs(0);
      updateDisplay(newTime); // aktualizuję interfejs odliczaniai ustawiam go na wartość 0
    } else {
      const newTime = convertMs(timeDifference);
      console.log(newTime);
      updateDisplay(newTime);
    }
  }

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
  // function padWithLeadingZeros(num, totalLength) {
  //   return String(num).padStart(totalLength, '0');
  // }

  function updateDisplay(time) {
    document.querySelector('.value[data-days]').textContent = addLeadingZero(
      time.days
    );
    document.querySelector('.value[data-hours]').textContent = addLeadingZero(
      time.hours
    );
    document.querySelector('.value[data-minutes]').textContent = addLeadingZero(
      time.minutes
    );
    document.querySelector('.value[data-seconds]').textContent = addLeadingZero(
      time.seconds
    );
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
