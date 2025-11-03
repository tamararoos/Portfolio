document.querySelectorAll('.scroll-container').forEach(container => {
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
});
