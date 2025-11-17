const searchInput = document.querySelector(".search");
const cards = Array.from(document.querySelectorAll(".card"));
const btnNiveles = Array.from(document.querySelectorAll(".btn-nivel"));

let filtroNivel = ""; // Nivel seleccionado actualmente
let indices = [];
let pointer = 0;

// ===================== FUNCION MOSTRAR TRES =====================
function mostrarTres() {
  if (searchInput.value.trim() !== "" || filtroNivel !== "") {
    // Si hay texto o nivel seleccionado, no rotamos automáticamente
    return;
  }

  if (pointer >= indices.length) {
    generarOrden();
    pointer = 0;
  }

  cards.forEach(card => card.style.display = "none");

  for (let i = 0; i < 3; i++) {
    const index = indices[pointer + i];
    if (index !== undefined) {
      cards[index].style.display = "block";
    }
  }

  pointer += 3;
}

// ===================== FUNCION GENERAR ORDEN =====================
function generarOrden() {
  indices = cards.map((_, i) => i);

  // Mezclar
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
}

// ===================== FILTRADO =====================
function aplicarFiltros() {
  const texto = searchInput.value.toLowerCase();

  cards.forEach(card => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    const cumpleTexto = name.includes(texto);
    const cumpleNivel = filtroNivel ? card.classList.contains(`nivel-${filtroNivel}`) : true;

    card.style.display = (cumpleTexto && cumpleNivel) ? "block" : "none";
  });
}


// ===================== EVENTOS =====================
searchInput.addEventListener("input", aplicarFiltros);

btnNiveles.forEach(btn => {
  btn.addEventListener("click", () => {
    const nivel = btn.getAttribute("data-nivel");

    // Toggle: si ya está seleccionado, lo deseleccionamos
    filtroNivel = filtroNivel === nivel ? "" : nivel;
    aplicarFiltros();
  });
});

// ===================== INICIALIZAR CARRUSEL =====================
generarOrden();
mostrarTres();
setInterval(mostrarTres, 3000);
