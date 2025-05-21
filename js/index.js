
document.addEventListener('DOMContentLoaded', () => {
  const targetDate = new Date('2025-06-24T07:00:00+04:00');

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const msEl = document.getElementById('milliseconds');
  const timerContainer = document.getElementById('timer');
  const hoursprodaysEl = document.getElementById('houerproday');

  function pad(n, length = 2) {
    return String(n).padStart(length, '0');
  }

  function getWordForm(number, forms) {
    const n = Math.abs(number) % 100;
    const n1 = n % 10;

    if (n > 10 && n < 20) return forms[2];
    if (n1 > 1 && n1 < 5) return forms[1];
    if (n1 === 1) return forms[0];
    return forms[2];
  }

  function updateTimer() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      timerContainer.innerHTML = `<div style="font-size:2rem;">🎉 МЫ СПРАВИЛИСЬ!!!!! 🎉</div>`;
      clearInterval(interval);
      return;
    }

    const ms = diff % 1000;
    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const houerproday = Math.floor(diff / 1000 / 60 / 60);

    // Обновление чисел
    daysEl.textContent = days;
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
    msEl.textContent = pad(ms, 3);
    hoursprodaysEl.textContent = pad(houerproday);

    // Обновление меток с правильными склонениями
    daysEl.nextElementSibling.textContent = getWordForm(days, ['день', 'дня', 'дней']);
    hoursEl.nextElementSibling.textContent = getWordForm(hours, ['час', 'часа', 'часов']);
    minutesEl.nextElementSibling.textContent = getWordForm(minutes, ['минута', 'минуты', 'минут']);
    secondsEl.nextElementSibling.textContent = getWordForm(seconds, ['секунда', 'секунды', 'секунд']);
    hoursprodaysEl.nextElementSibling.textContent = getWordForm(houerproday, ['час', 'часа', 'часов']);
  }

  const interval = setInterval(updateTimer, 50); // обновляем каждые 50 мс
  updateTimer();
});
