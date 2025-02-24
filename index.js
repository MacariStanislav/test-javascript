const navbar = document.querySelector('.navbar');


navbar.addEventListener('mousemove', (event) => {
  const rect = navbar.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;


  navbar.style.setProperty('--x', `${x}px`);
  navbar.style.setProperty('--y', `${y}px`);
});

// Добавляем обработчик для появления кольца при наведении мыши на navbar
navbar.addEventListener('mouseenter', () => {
  navbar.style.setProperty('--show-ring', 'visible');
});

// Добавляем обработчик для скрытия кольца, когда мышь покидает navbar
navbar.addEventListener('mouseleave', () => {
  navbar.style.setProperty('--show-ring', 'hidden');
});



let lastParticleTime = 0;
const particleDelay = 80; // Задержка в миллисекундах

document.addEventListener('mousemove', (event) => {
  const currentTime = new Date().getTime();

 
  if (currentTime - lastParticleTime > particleDelay) {
    createParticle(event.pageX, event.pageY);
    lastParticleTime = currentTime; 
  }
});

function createParticle(x, y) {
  const container = document.querySelector('.particle-container');
  const particle = document.createElement('div');
  
 
  const number = Math.random() < 0.5 ? '0' : '1';
  particle.classList.add('particle');
  particle.textContent = number;
  
  
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;
  

  container.appendChild(particle);
  
 
  setTimeout(() => {
    particle.remove();
  }, 500); 
}
