document.addEventListener('DOMContentLoaded', function() {
  const minutesElement = document.getElementById('minutes');
  const secondsElement = document.getElementById('seconds');
  const millisecondsElement = document.getElementById('milliseconds');
  const startStopButton = document.getElementById('startStop');
  const resetButton = document.getElementById('reset');
  const lapButton = document.getElementById('lap');
  const lapsContainer = document.getElementById('laps');
  const particlesContainer = document.getElementById('particles');
  
  let minutes = 0;
  let seconds = 0;
  let milliseconds = 0;
  let interval;
  let isRunning = false;
  let lapCount = 0;
  
  // Create particles
  function createParticles() {
      const particleCount = 30;
      for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div');
          particle.classList.add('particle');
          
          // Random size between 1px and 3px
          const size = Math.random() * 2 + 1;
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          
          // Random position
          particle.style.left = `${Math.random() * 100}%`;
          particle.style.bottom = `-10px`;
          
          // Random animation duration between 5s and 15s
          const duration = Math.random() * 10 + 5;
          particle.style.animationDuration = `${duration}s`;
          
          // Random delay
          particle.style.animationDelay = `${Math.random() * 5}s`;
          
          particlesContainer.appendChild(particle);
      }
  }
  
  createParticles();
  
  function updateDisplay() {
      minutesElement.textContent = padTime(minutes);
      secondsElement.textContent = padTime(seconds);
      millisecondsElement.textContent = padTime(milliseconds, true);
      
      // Add pulse animation when running
      if (isRunning) {
          minutesElement.classList.add('pulse');
          secondsElement.classList.add('pulse');
          millisecondsElement.classList.add('pulse');
      } else {
          minutesElement.classList.remove('pulse');
          secondsElement.classList.remove('pulse');
          millisecondsElement.classList.remove('pulse');
      }
  }
  
  function padTime(time, isMilliseconds = false) {
      if (isMilliseconds) {
          return time < 10 ? `0${time}` : time.toString().substring(0, 2);
      }
      return time < 10 ? `0${time}` : time;
  }
  
  function startTimer() {
      interval = setInterval(() => {
          milliseconds += 10;
          
          if (milliseconds === 100) {
              milliseconds = 0;
              seconds++;
          }
          
          if (seconds === 60) {
              seconds = 0;
              minutes++;
          }
      
          updateDisplay();
      }, 100);
  }
  
  function stopTimer() {
      clearInterval(interval);
  }
  
  startStopButton.addEventListener('click', function() {
      if (isRunning) {
          stopTimer();
          startStopButton.textContent = 'Start';
      } else {
          startTimer();
          startStopButton.textContent = 'Stop';
      }
      isRunning = !isRunning;
  });
  
  resetButton.addEventListener('click', function() {
      stopTimer();
      isRunning = false;
      minutes = 0;
      seconds = 0;
      milliseconds = 0;
      startStopButton.textContent = 'Start';
      lapsContainer.innerHTML = '';
      lapCount = 0;
      updateDisplay();
  });
  
  lapButton.addEventListener('click', function() {
      if (!isRunning && minutes === 0 && seconds === 0 && milliseconds === 0) return;
      
      lapCount++;
      const lapTime = `${padTime(minutes)}:${padTime(seconds)}.${padTime(milliseconds, true)}`;
      const lapItem = document.createElement('div');
      lapItem.classList.add('lap-item');
      lapItem.innerHTML = `
          <span class="lap-number">Lap ${lapCount}</span>
          <span class="lap-time">${lapTime}</span>
      `;
      lapsContainer.prepend(lapItem);
  });
  
  updateDisplay();
});