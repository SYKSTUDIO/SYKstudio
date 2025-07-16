document.addEventListener('mousemove', function(event) {
    const x = event.clientX;
    const y = event.clientY;
    console.log('鼠标坐标 (相对于视口):', x, y);
  });
  
  const introTitle = document.getElementById("introTitle");
  const hiddenElements = document.querySelectorAll(".hide-text");
  
  // 初始化时隐藏主内容
  hiddenElements.forEach((el) => {
    el.style.opacity = "0";
  });
  
  function playIntroAnimation() {
    const tl = gsap.timeline();
  
    // Step 1：Logo 淡入 + 缩放到正常大小
    tl.fromTo(introTitle, {
      opacity: 0,
      scale: 1.1
    }, {
      duration: 1,
      opacity: 1,
      scale: 1,
      ease: "power2.out"
    })
  
    // Step 2：停留（静止不动，仅等待）
    .to(introTitle, {
      duration: 1.5,  // 这里就是“停留多久”的控制
      scale: 1,
      opacity: 1,
      ease: "none"
    })
  
    // Step 3：淡出 + 缩小
    .to(introTitle, {
      duration: 0.4,
      opacity: 0,
      scale: 0.9,
      ease: "power2.inOut"
    })
  
    // Step 4：主内容依次淡入
    .add(() => {
      hiddenElements.forEach((el, i) => {
        gsap.to(el, {
          duration: 1,
          opacity: 1,
          delay: i * 0.25,
          ease: "power2.out"
        });
      });
    }, "+=0.2");
  }
  
  
  // 页面加载完成后直接播放动画（无需点击）
  document.addEventListener("DOMContentLoaded", () => {
    playIntroAnimation();
  });
  