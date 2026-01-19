// Projekte auf kleinen Bildschirmen in Reihenfolge untereinander anzeigen
function reorderProjectsForMobile() {
  if (window.innerWidth > 900) return; // Nur auf kleinen Bildschirmen
  const columns = Array.from(
    document.querySelectorAll(".column .scroll-container")
  );
  if (columns.length < 3) return;
  // Hole alle Projekte pro Spalte
  const projects = columns.map((col) =>
    Array.from(col.querySelectorAll(".project"))
  );
  const maxLen = Math.max(...projects.map((arr) => arr.length));
  const ordered = [];
  for (let i = 0; i < maxLen; i++) {
    for (let col = 0; col < projects.length; col++) {
      if (projects[col][i]) ordered.push(projects[col][i].outerHTML);
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
        document.querySelector("main.portfolio-container").nextSibling
      );
  }
  mobileContainer.innerHTML = ordered.join("");
  document.querySelector("main.portfolio-container").style.display = "none";
  mobileContainer.style.display = "block";

  // Scroll-Logik für mobile scroll-container
  let originalContent = mobileContainer.innerHTML;
  let duplicatedContent = "";
  for (let i = 0; i < 3; i++) {
    duplicatedContent += originalContent;
  }
  mobileContainer.innerHTML = duplicatedContent;
  mobileContainer.scrollTop =
    (mobileContainer.scrollHeight - mobileContainer.clientHeight) / 2;

  mobileContainer.addEventListener("scroll", () => {
    const topEdge = mobileContainer.scrollHeight * 0.1;
    const bottomEdge = mobileContainer.scrollHeight * 0.9;
    const itemsHeight = mobileContainer.scrollHeight / 3;
    if (mobileContainer.scrollTop < topEdge) {
      mobileContainer.scrollTop += itemsHeight;
    } else if (
      mobileContainer.scrollTop + mobileContainer.clientHeight >
      bottomEdge
    ) {
      mobileContainer.scrollTop -= itemsHeight;
    }
  });

  let isHovered = false;
  mobileContainer.addEventListener("mouseenter", () => {
    isHovered = true;
  });
  mobileContainer.addEventListener("mouseleave", () => {
    isHovered = false;
  });

  let scrollSpeed = 1;
  function scrollStep() {
    if (!isHovered) {
      mobileContainer.scrollTop += scrollSpeed;
    }
    requestAnimationFrame(scrollStep);
  }
  scrollStep();
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
  let scrollDirection = index % 2 === 0 ? 1 : -1;
  let baseSpeed = 1;
  if (index === 1) baseSpeed = 1.2; // Spalte 1
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
