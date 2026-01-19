document.querySelectorAll(".scroll-container").forEach((item, index) => {
  const originalContent = item.innerHTML;
  let duplicatedContent = "";
  for (let i = 0; i < 3; i++) {
    duplicatedContent += originalContent;
  }
  item.innerHTML = duplicatedContent;

  // Scroll to center at the beginning
  item.scrollTop = (item.scrollHeight - item.clientHeight) / 2;

  item.addEventListener("scroll", () => {
    const topEdge = item.scrollHeight * 0.1;
    const bottomEdge = item.scrollHeight * 0.9;
    const itemsHeight = item.scrollHeight / 3;

    if (item.scrollTop < topEdge) {
      item.scrollTop += itemsHeight;
    } else if (item.scrollTop + item.clientHeight > bottomEdge) {
      item.scrollTop -= itemsHeight;
    }
  });

  // Automatically scroll slowly downwards except when hovered. Use requestAnimationFrame for smoother scrolling.
  let isHovered = false;

  item.addEventListener("mouseenter", () => {
    isHovered = true;
  });

  item.addEventListener("mouseleave", () => {
    isHovered = false;
  });

  // Scroll-Geschwindigkeit individuell pro Spalte
  let scrollDirection = index % 2 === 0 ? 1 : -1;
  let baseSpeed = 1;
  if (index === 0) baseSpeed = 1.2; // Spalte 1
  else if (index === 1) baseSpeed = 1; // Spalte 2
  else if (index === 2) baseSpeed = 1.1; // Spalte 3
  let scrollSpeed = scrollDirection * baseSpeed;

  function scrollStep() {
    if (!isHovered) {
      item.scrollTop += scrollSpeed;
    }
    requestAnimationFrame(scrollStep);
  }

  scrollStep();
});
