// Projekte auf kleinen Bildschirmen in Reihenfolge untereinander anzeigen
function reorderProjectsForMobile() {
  if (window.innerWidth > 900) return; // Nur auf kleinen Bildschirmen
  const columns = Array.from(
    document.querySelectorAll(".column .scroll-container"),
  );
  if (columns.length < 3) return;
  // Projekte zeilenweise aus allen Spalten sammeln
  const projectsPerColumn = columns.map((col) =>
    Array.from(col.querySelectorAll(".project")),
  );
  const maxLen = Math.max(...projectsPerColumn.map((arr) => arr.length));
  const ordered = [];
  for (let i = 0; i < maxLen; i++) {
    for (let col = 0; col < projectsPerColumn.length; col++) {
      if (projectsPerColumn[col][i])
        ordered.push(projectsPerColumn[col][i].outerHTML);
    }
  }
  // Neues Container-Element für mobile Ansicht
  let mobileContainer = document.getElementById("mobile-projects");
  if (!mobileContainer) {
    mobileContainer = document.createElement("div");
    mobileContainer.id = "mobile-projects";
    mobileContainer.className = "scroll-container";
    mobileContainer.style.height = "100vh";
    mobileContainer.style.overflowY = "auto";
    document
      .querySelector("main.portfolio-container")
      .parentNode.insertBefore(
        mobileContainer,
        document.querySelector("main.portfolio-container").nextSibling,
      );
  }
  // Nur einmal alle Projekte untereinander, keine Wiederholung
  mobileContainer.innerHTML = ordered.join("");
  document.querySelector("main.portfolio-container").style.display = "none";
  mobileContainer.style.display = "block";

  // Automatisches Scrollen und Animationen entfernt, damit mobiles Scrollen flüssig bleibt
}

function resetProjectsForDesktop() {
  const mobileContainer = document.getElementById("mobile-projects");
  if (mobileContainer) mobileContainer.style.display = "none";
  const main = document.querySelector("main.portfolio-container");
  if (main) main.style.display = "";
}

function handleResize() {
  if (window.innerWidth <= 900) {
    reorderProjectsForMobile();
  } else {
    resetProjectsForDesktop();
  }
}

window.addEventListener("resize", handleResize);
window.addEventListener("DOMContentLoaded", handleResize);
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
  let scrollDirection = 1;
  if (index === 1) scrollDirection = -1; // Spalte 2 nach oben
  let baseSpeed = 1;
  if (index === 0)
    baseSpeed = 1.2; // Spalte 1
  else if (index === 1)
    baseSpeed = 0.3; // Spalte 2 langsamer
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

window.addEventListener("DOMContentLoaded", () => {
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
    let scrollDirection = 1;
    if (index === 1) scrollDirection = -1; // Spalte 2 nach oben
    let baseSpeed = 0.01;
    if (index === 0)
      baseSpeed = 0.1; // Spalte 1
    else if (index === 1)
      baseSpeed = 0.01; // Spalte 2
    else if (index === 2) baseSpeed = 0.2; // Spalte 3
    let scrollSpeed = scrollDirection * baseSpeed;

    function scrollStep() {
      if (!isHovered) {
        item.scrollTop += scrollSpeed;
      }
      requestAnimationFrame(scrollStep);
    }

    scrollStep();
  });
});
