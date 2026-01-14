
document.querySelectorAll('.scroll-container').forEach((item) => {
  const originalContent = item.innerHTML
  let duplicatedContent = ''
  for (let i = 0; i < 3; i++) {
    duplicatedContent += originalContent
  }
  item.innerHTML = duplicatedContent

  // Scroll to center at the beginning
  item.scrollTop = (item.scrollHeight - item.clientHeight) / 2
  
  item.addEventListener('scroll', () => {
    const topEdge = item.scrollHeight * .1
    const bottomEdge = item.scrollHeight * .9
    const itemsHeight = item.scrollHeight / 3

    if (item.scrollTop < topEdge) {
      item.scrollTop += itemsHeight
    } else if (item.scrollTop + item.clientHeight > bottomEdge) {
      item.scrollTop -= itemsHeight
    }
  })

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
    }
    requestAnimationFrame(scrollStep)
  }

  requestAnimationFrame(scrollStep)
})
