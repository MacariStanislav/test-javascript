const $cursor = document.querySelector('#cursor');

// Скрываем курсор по умолчанию
gsap.set($cursor, { opacity: 0 });

// Флаг для отслеживания первого входа
let cursorActivated = false;

// Обработчик движения мыши
document.addEventListener('mousemove', (e) => {
  if (!cursorActivated) {
    cursorActivated = true;
    gsap.to($cursor, { opacity: 1, duration: 0.2 }); // Показываем курсор только при первом движении
  }
  
  gsap.to($cursor, {
    duration: 0.1,
    x: e.clientX - 15,
    y: e.clientY - 15,
    ease: "power1.out",
  });
});

// Скрываем курсор при уходе мыши за пределы окна
document.addEventListener('mouseleave', () => {
  gsap.to($cursor, { opacity: 0, duration: 0.2 });
});

// Показываем снова, когда мышь вернулась
document.addEventListener('mouseenter', () => {
  if (cursorActivated) {
    gsap.to($cursor, { opacity: 1, duration: 0.2 });
  }
});
