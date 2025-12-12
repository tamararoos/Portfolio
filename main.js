
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
