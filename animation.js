document.querySelectorAll('.transition-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');
  
      const transitionLayer = document.querySelector('.page-transition');
      transitionLayer.classList.add('active');
  
      setTimeout(() => {
        window.location.href = href;
      }, 800); // 时间应与 CSS 中的 transition 一致
    });
  });
  