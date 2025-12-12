/*document.querySelectorAll('.scroll-container').forEach(container => {
  // Originalinhalt duplizieren
  const content = container.innerHTML;
  container.innerHTML += content + content; // dreifach für Sicherheit

  // Startposition in der Mitte setzen
  const scrollHeight = container.scrollHeight / 3;
  container.scrollTop = scrollHeight;

  container.addEventListener('scroll', () => {
    const maxScroll = container.scrollHeight / 3 * 2;
    const minScroll = container.scrollHeight / 3;

    // Wenn zu weit nach unten gescrollt -> zurück in die Mitte
    if (container.scrollTop >= maxScroll) {
      container.scrollTop -= scrollHeight;
    }

    // Wenn zu weit nach oben gescrollt -> zurück in die Mitte
    if (container.scrollTop <= 0) {
      container.scrollTop += scrollHeight;
    }
  });
});*/

document.querySelectorAll('.scroll-container').forEach((item) => {
  // Duplicate content 50x to allow seamless scrolling
  const originalContent = item.innerHTML
  let duplicatedContent = ''
  for (let i = 0; i < 50; i++) {
    duplicatedContent += originalContent
  }
  item.innerHTML = duplicatedContent

  // Scroll to center at the beginning
  item.scrollTop = (item.scrollHeight - item.clientHeight) / 2

  // Automatically scroll slowly downwards except when hovered. Use requestAnimationFrame for smoother scrolling.
  let isHovered = false

  item.addEventListener('mouseenter', () => {
    isHovered = true
  })

  item.addEventListener('mouseleave', () => {
    isHovered = false
  })

  // Scroll speed
  let scrollSpeed = (Math.random() -0.5)*5

  function scrollStep() {
    if (!isHovered) {
      item.scrollTop += scrollSpeed
      // Reset scroll position to center if near the top or bottom
      if (item.scrollTop <= 0) {
        item.scrollTop = item.scrollHeight / 2
      } else if (item.scrollTop >= item.scrollHeight - item.clientHeight) {
        item.scrollTop = item.scrollHeight / 2 - item.clientHeight
      }
    }
    requestAnimationFrame(scrollStep)
  }

  requestAnimationFrame(scrollStep)
})
