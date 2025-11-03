
  document.querySelectorAll('.scroll-container').forEach(container => {
    container.addEventListener('scroll', () => {
      // Wenn fast am Ende
      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
        // Nach oben springen
        container.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    });
  });

