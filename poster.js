gsap.registerPlugin(CustomEase, Flip)
CustomEase.create("osmo-ease", "0.625, 0.05, 0, 1")

gsap.defaults({
  ease:"osmo-ease",
  duration: 0.725
})

document.addEventListener("DOMContentLoaded", () => {
  
  const listItems = document.querySelectorAll(".main-title__item");
  const imageItems = document.querySelectorAll(".main-img__item");
  const overlayItems = document.querySelectorAll(".overlay-item");
  const overlayNav = document.querySelector(".overlay-nav");
  const navItems = document.querySelectorAll("[data-overlay='nav-item']");
  const closeButton = document.querySelector("[data-overlay='close']");
  const headings = document.querySelectorAll(".main-title")
  
  let activeListItem = null;
  
  function openOverlay(index) {
    // Set active class to the clicked list item
    listItems.forEach(item => item.classList.remove("active"));
    activeListItem = listItems[index];
    activeListItem.classList.add("active");

    // Record the state of the title
    const title = activeListItem.querySelector(".main-title");
    const titleState = Flip.getState(title, {props: "fontSize"});

    // Record the state of the image
    const image = imageItems[index].querySelector(".image");
    const imageState = Flip.getState(image);

    // Show the overlay and get elements for animation
    const overlayItem = overlayItems[index];
    const content = overlayItem.querySelector(".overlay-row")
    
    gsap.set(overlayItem,{display: "block", autoAlpha:110 })
    gsap.fromTo(content,{autoAlpha:0},{autoAlpha:1, delay: 0.5})

    const textTarget = overlayItem.querySelector("[data-overlay='text-target']");
    const imgTarget = overlayItem.querySelector("[data-overlay='img-target']");

    // Append the elements to overlay targets
    textTarget.appendChild(title);
    imgTarget.appendChild(image);

    // Animate with GSAP Flip
    Flip.from(titleState);
    Flip.from(imageState);
    

    gsap.set(overlayNav,{display: "flex" })
    gsap.fromTo(navItems, {
      yPercent: 110,
      },{
      yPercent: 0,
      stagger: 0.1,
    });
    
    gsap.set(imageItems,{ autoAlpha: 0})
    
    listItems.forEach((listItem, i) => {
      if (i !== index) {
        const otherTitle = listItem.querySelector(".main-title");
        gsap.to(otherTitle, { yPercent: 100, autoAlpha: 0, duration:0.45, delay: 0.2 - i * 0.05});
      }
    });

  }

  // Function to close overlay
  function closeOverlay() {
    
   if (!activeListItem) return;

    // Find active overlay
    const index = Array.from(listItems).indexOf(activeListItem);
    const overlayItem = overlayItems[index];
    const title = overlayItem.querySelector("[data-overlay='text-target'] .main-title");
    const image = overlayItem.querySelector("[data-overlay='img-target'] .image");
    const overlayContent = overlayItem.querySelector(".overlay-row");

    // Record the state of title and image in overlay
    const titleState = Flip.getState(title, { props: "fontSize" });
    const imageState = Flip.getState(image);

    // Reset overlay display and move elements back to their original containers
    gsap.to(navItems, { yPercent: 110, onComplete: () => { overlayNav.style.display = "none"; } });
    gsap.to(overlayContent, { autoAlpha: 0, onComplete: () => { overlayItem.style.display = "none"; } });

    activeListItem.querySelector(".button").appendChild(title);
    imageItems[index].appendChild(image);
    gsap.set(imageItems[index],{autoAlpha:1})

    // Animate elements back with GSAP Flip
    Flip.from(titleState);
    Flip.from(imageState);

    // Remove active class
    activeListItem.classList.remove("active");
    activeListItem = null;

    gsap.to(headings, { yPercent: 0, autoAlpha: 1, delay: 0.3, stagger: 0.05 });

}

  // Add click event listeners to list items
  listItems.forEach((listItem, index) => {
    listItem.addEventListener("click", () => openOverlay(index));
  });

  // Close overlay on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeOverlay();
  });

  // Close overlay on close button click
  closeButton.addEventListener("click", closeOverlay);


	// Show corresponding image on hover of a list item, based on index
  listItems.forEach((listItem, i) => {
    listItem.addEventListener("mouseenter", () => {
      gsap.set(imageItems,{autoAlpha: 0}) // hide all
      gsap.set(imageItems[i],{autoAlpha: 1}) // show image with matching index
    })   
  })

  
})



const mainItems = document.querySelectorAll('.main-title__item');
const sideMenu = document.querySelector('.side-menu__list');
const backButton = document.querySelector('[data-overlay="close"]');

mainItems.forEach(item => {
  item.addEventListener('click', () => {
    // 显示 overlay 内容（你已有的逻辑）
    // ...

    // 隐藏右侧菜单
    sideMenu.classList.add('hidden');
  });
});

// 当点击 Back to list 时恢复右侧菜单显示
backButton.addEventListener('click', () => {
  sideMenu.classList.remove('hidden');
});


window.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const overlayWrap = document.querySelector('.overlay-wrap');
    if (header && overlayWrap) {
      const headerHeight = header.offsetHeight;
      overlayWrap.style.paddingTop = `${headerHeight}px`;
    }
  });



  

  document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".clickable-image");
    const overlayBg = document.createElement("div");
    overlayBg.id = "image-overlay-bg";
    document.body.appendChild(overlayBg);
  
    const header = document.querySelector("header");
  
    images.forEach((img) => {
      img.addEventListener("click", () => {
        const isEnlarged = img.classList.contains("enlarged");
  
        if (!isEnlarged) {
          // 放大图片
          img.classList.add("enlarged");
          overlayBg.classList.add("visible");
          if (header) header.classList.add("hidden");
          // 确保其他图片没有 enlarged
          images.forEach(other => {
            if (other !== img) other.style.visibility = "hidden";
          });
        } else {
          // 缩小图片
          img.classList.remove("enlarged");
          overlayBg.classList.remove("visible");
          if (header) header.classList.remove("hidden");
          images.forEach(other => {
            other.style.visibility = "visible";
          });
        }
      });
    });
  
    // 如果点击遮罩也缩小
    overlayBg.addEventListener("click", () => {
      const enlarged = document.querySelector(".clickable-image.enlarged");
      if (enlarged) enlarged.click();
    });
  });






  