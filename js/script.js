'use strict';

const $startBtn = document.querySelector('.start-button');
const $stopBtn = document.querySelector('.stop-button');
const $resetBtn = document.querySelector('.reset-button');
const $lapBtn = document.querySelector('.lap-button');

const $milli$secondsSpan = document.querySelector('.milliseconds-span');
const $secondsSpan = document.querySelector('.seconds-span');
const $minutesSpan = document.querySelector('.minutes-span');
const $hoursSpan = document.querySelector('.hours-span');

const $lapDiv = document.querySelector('.lap-div');

const stopwatch = function () {
  let milliseconds = 0;
  let seconds = 0;
  let minutes = 0;
  let hours = 0;

  let started = false;
  let paused = false;
  let interval;
  let lapNumber = 1;

  const runStopwatch = function () {
    $startBtn.textContent = 'start';
    milliseconds++;

    if (milliseconds === 100) {
      seconds++;
      milliseconds = 0;
    }

    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }

    if (minutes === 60) {
      minutes = 0;
      hours++;
    }

    updateStopwatch();
  };

  const startStopwatch = function () {
    started = true;
    interval = setInterval(runStopwatch, 10);
    $startBtn.disabled = true;
  };

  const stopStopwatch = function () {
    if (started) $startBtn.textContent = 'resume';

    clearInterval(interval);
    paused = true;
    $startBtn.disabled = false;
  };

  const clearTime = function () {
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
  };

  const clearLaps = function () {
    const lapSpans = [...document.querySelectorAll('.lap-span')];
    lapSpans.forEach((lapSpan) => lapSpan.remove());

    lapNumber = 1;
  };

  const resetStopwatch = function () {
    clearInterval(interval);
    clearTime();
    clearLaps();
    updateStopwatch();

    $startBtn.textContent = 'start';
    $startBtn.disabled = false;
  };

  const updateStopwatch = function () {
    $milli$secondsSpan.textContent = String(milliseconds).padStart(2, 0);
    $secondsSpan.textContent = String(seconds).padStart(2, 0);
    $minutesSpan.textContent = String(minutes).padStart(2, 0);
    $hoursSpan.textContent = String(hours).padStart(2, 0);
  };

  const addLap = function () {
    const lap = document.createElement('span');

    lap.className = 'lap-span';
    lap.textContent += `Lap ${lapNumber} | `;

    const tempMilliseconds = String(milliseconds).padStart(2, 0);
    const tempSeconds = String(seconds).padStart(2, 0);
    const tempMinutes = String(minutes).padStart(2, 0);
    const tempHours = String(hours).padStart(2, 0);

    lap.textContent += `${tempHours}:${tempMinutes}:${tempSeconds}:${tempMilliseconds}`;
    $lapDiv.appendChild(lap);
    lapNumber++;
  };

  $startBtn.addEventListener('click', startStopwatch);
  $stopBtn.addEventListener('click', stopStopwatch);
  $resetBtn.addEventListener('click', resetStopwatch);
  $lapBtn.addEventListener('click', addLap);
};

stopwatch();
