// 页面加载后显示所有主内容
document.addEventListener("DOMContentLoaded", () => {
    const hiddenElements = document.querySelectorAll(".hide-text");
    hiddenElements.forEach((el) => {
      el.style.opacity = "1";
    });
  });
  