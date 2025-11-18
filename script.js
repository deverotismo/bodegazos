// ========================= POPUP INICIAL =========================
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup-inicial");
  const cerrarPopup = document.getElementById("cerrarPopup");

  setTimeout(() => {
    if (popup) popup.style.display = "flex";
  }, 600);

  if (cerrarPopup) {
    cerrarPopup.addEventListener("click", () => {
      popup.style.display = "none";
    });
  }

  popup?.addEventListener("click", (e) => {
    if (e.target === popup) popup.style.display = "none";
  });
});


// ==================== CONTADOR NAVIDEÑO ====================
function iniciarContadorNavidad() {
  const diasEl = document.getElementById("dias");
  const horasEl = document.getElementById("horas");
  const minutosEl = document.getElementById("minutos");
  const segundosEl = document.getElementById("segundos");

  // CONFIGURA LA FECHA LÍMITE AQUÍ ⬇⬇⬇
  const fechaLimite = new Date("2025-11-27T23:59:59").getTime();

  function actualizar() {
    const ahora = new Date().getTime();
    const diferencia = fechaLimite - ahora;

    if (diferencia <= 0) {
      diasEl.textContent = "00";
      horasEl.textContent = "00";
      minutosEl.textContent = "00";
      segundosEl.textContent = "00";
      return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    diasEl.textContent = String(dias).padStart(2, "0");
    horasEl.textContent = String(horas).padStart(2, "0");
    minutosEl.textContent = String(minutos).padStart(2, "0");
    segundosEl.textContent = String(segundos).padStart(2, "0");
  }

  actualizar();
  setInterval(actualizar, 1000);
}

document.addEventListener("DOMContentLoaded", iniciarContadorNavidad);

// Extra seguridad al cerrar modal
document.querySelector(".close-seguimiento").onclick = () => {
  document.getElementById("modal-seguimiento").style.display = "none";
};
window.onclick = (e) => {
  if (e.target.id === "modal-seguimiento") {
    document.getElementById("modal-seguimiento").style.display = "none";
  }
};


// ==================== TOOLTIP Y MODAL DE MARCAS ====================
const brandNodes = document.querySelectorAll(".brand-node");
const tooltip = document.getElementById("brandTooltip");
const modalMarca = document.getElementById("brandModal");

if (brandNodes.length && tooltip) {
  brandNodes.forEach((node) => {
    node.addEventListener("mouseenter", () => {
      const { name, desc, link } = node.dataset;
      tooltip.querySelector("h3").textContent = name || "";
      tooltip.querySelector("p").textContent = desc || "";
      tooltip.querySelector("a").setAttribute("href", link || "#");
      tooltip.style.display = "block";
    });

    node.addEventListener("mousemove", (e) => {
      tooltip.style.left = `${e.pageX + 18}px`;
      tooltip.style.top = `${e.pageY - 34}px`;
    });

    node.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });
  });
}

if (brandNodes.length && modalMarca) {
  const modalTitle = modalMarca.querySelector("h3");
  const modalDesc = modalMarca.querySelector("p");
  const modalLink = modalMarca.querySelector("a");
  const modalLogo = modalMarca.querySelector(".modal-logo");
  const closeModal = modalMarca.querySelector(".close-modal");

  brandNodes.forEach((node) => {
    node.addEventListener("click", () => {
      const { name, desc, link } = node.dataset;
      const img = node.querySelector("img");

      modalTitle.textContent = name || "";
      modalDesc.textContent = desc || "";
      modalLink.setAttribute("href", link || "#");
      modalLogo.src = img ? img.src : "";

      modalMarca.style.display = "flex";
    });
  });

  closeModal?.addEventListener("click", () => (modalMarca.style.display = "none"));
  window.addEventListener("click", (e) => {
    if (e.target === modalMarca) modalMarca.style.display = "none";
  });
}


// ==================== SCROLL INFINITO MARCAS ====================
const track = document.querySelector(".marcas-track");
if (track) {
  const clones = Array.from(track.children).map(node => node.cloneNode(true));
  clones.forEach(clone => clone.classList.add("clone"));
  clones.forEach(clone => track.appendChild(clone));
  track.style.animation = "scrollMarcas 10s linear infinite";
}


// ==================== FAQ / PASOS ====================
const steps = document.querySelectorAll(".step");
steps.forEach(step => {
  step.addEventListener("click", () => {
    steps.forEach(s => s !== step && s.classList.remove("active"));
    step.classList.toggle("active");
  });
});


// ====================== CONTADOR REALISTA CON STOCK FIJO ======================
(function () {
  const elemento = document.getElementById("contadorPromos");
  if (!elemento) return;

  const fechaFinal = new Date("2025-12-27T23:59:59").getTime();

  // ——— Stock fijo escogido por ti ———
  const STOCK_INICIAL_FIJO = 1305070; // <-- CAMBIA ESTE NÚMERO A TU STOCK REAL

  // Guardamos el stock inicial solo la primera vez
  let valorInicial = STOCK_INICIAL_FIJO;
    localStorage.setItem("stockInicialFijo", valorInicial);

  if (!valorInicial) {
    valorInicial = STOCK_INICIAL_FIJO;
    localStorage.setItem("stockInicialFijo", valorInicial);
  } else {
    valorInicial = parseInt(valorInicial);
  }

  // ——— Calculamos la velocidad automática ———
  const ahora = Date.now();
  const tiempoRestanteMs = fechaFinal - ahora;

  // Cada cuánto debe bajar 1 unidad
  const PASO_MS = tiempoRestanteMs / valorInicial;

  function obtenerValorActual() {
    const ahora = Date.now();
    if (ahora >= fechaFinal) return 0;

    const tiempoPasado = fechaFinal - ahora;
    const unidadesRestantes = Math.ceil(tiempoPasado / PASO_MS);

    return Math.max(0, unidadesRestantes);
  }

  function actualizarContador() {
    const valor = obtenerValorActual();
    elemento.textContent = valor.toLocaleString();
  }

  actualizarContador();
  setInterval(actualizarContador, PASO_MS);
})();

// ====================== NOTIFICACIÓN DE COMPRA ======================
(function () {

  const notif = document.getElementById("compraNotificacion");
  const texto = document.getElementById("textoCompra");
  const cta = document.getElementById("ctaCompra");

  const nombres = [
  // Masculinos
  "Juan", "Carlos", "Andrés", "Luis", "Jorge", "Miguel", "Sebastián", "José", "David", "Camilo",
  "Alejandro", "Daniel", "Mateo", "Santiago", "Julián", "Mauricio", "Felipe", "Ricardo", "Fernando", "Óscar",
  "Cristian", "Iván", "Hernán", "Wilson", "Jairo", "Álvaro", "Rodrigo", "Germán", "Fabio", "Diego",
  "Nicolás", "Simón", "Jonathan", "Fabián", "Rubén", "Edwin", "César", "Henry", "Orlando", "Armando",
  "Héctor", "Leonardo", "Rafael", "Alfonso", "Efraín", "Guillermo", "Samuel", "Tomás", "Esteban", "Felipe",

  // Femeninos
  "María", "Laura", "Valentina", "Daniela", "Carolina", "Natalia", "Juliana", "Diana", "Camila", "Luisa",
  "Sandra", "Paola", "Claudia", "Ana", "Andrea", "Lorena", "Fernanda", "Marcela", "Isabel", "Sofía",
  "Patricia", "Adriana", "Yolanda", "Tatiana", "Viviana", "Liliana", "Catalina", "Karina", "Alejandra", "Estefanía",
  "Verónica", "Yulieth", "Shirley", "Rosalba", "Gabriela", "Melissa", "Johana", "Angélica", "Sharon", "Yenny",
  "Sara", "Mónica", "Luz", "Miriam", "Rosa", "Eliana", "Pilar", "Jennifer", "Susana", "Melany"
];

const ciudades = [
  "Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena", "Bucaramanga", "Pereira", "Manizales", "Armenia", "Cúcuta",
  "Ibagué", "Santa Marta", "Villavicencio", "Neiva", "Pasto", "Montería", "Sincelejo", "Riohacha", "Valledupar", "Tunja",
  "Popayán", "Quibdó", "Florencia", "Yopal", "Arauca", "San Andrés", "Turbo", "Apartadó", "Rionegro", "Envigado",
  "Itagüí", "Soacha", "Chía", "Zipaquirá", "Facatativá", "Girardot", "Fusagasugá", "Funza", "Mosquera", "La Calera",
  "Sogamoso", "Duitama", "Tunja", "Ocaña", "Pamplona", "Barrancabermeja", "Malambo", "Soledad", "Galapa", "Sabanalarga",
  "Jamundí", "Palmira", "Buenaventura", "Tuluá", "Buga", "Cartago", "Chinchiná", "La Dorada", "Aguachica", "El Banco",
  "Magangué", "Cereté", "Lorica", "Planeta Rica", "Sahagún", "Caucasia", "Lorica", "Montelíbano", "Tierralta", "Chigorodó",
  "Carepa", "La Ceja", "La Estrella", "Copacabana", "Bello", "Sabaneta", "Girón", "Floridablanca", "Piedecuesta", "San Gil",
  "Socorro", "Zarzal", "Roldanillo", "Pradera", "Florida", "Candelaria", "Sonsón", "Salgar", "Jardín", "Jericó",
  "San Vicente del Caguán", "Puerto Asís", "Mocoa", "Leticia", "Mitú", "Inírida", "Puerto Carreño", "Tame", "Saravena", "Arauquita"
];

  let ultimaCantidad = null;
  let timeoutActual = null;

  function mostrarNotificacion() {

    const nombre = nombres[Math.floor(Math.random() * nombres.length)];
    const ciudad = ciudades[Math.floor(Math.random() * ciudades.length)];

    texto.textContent = `${nombre} en ${ciudad} acaba de hacer una compra 🎁`;

    cta.href = "https://wa.me/573023630113?text=Hola,%20quiero%20aprovechar%20las%20promos!"; // <-- Cambia tu WhatsApp

    // Cierra la anterior si existe
    notif.classList.remove("mostrar");

    setTimeout(() => {
      notif.classList.add("mostrar");
    }, 100);

    // Cerrar después de 5 segundos
    clearTimeout(timeoutActual);
    timeoutActual = setTimeout(() => {
      notif.classList.remove("mostrar");
    }, 5000);
  }

  // ====================== ESCUCHA CAMBIO DEL CONTADOR ======================
  const target = document.getElementById("contadorPromos");

  const observer = new MutationObserver(() => {
    const valor = parseInt(target.textContent.replace(/\D/g, ""));

    if (ultimaCantidad === null) {
      ultimaCantidad = valor;
      return;
    }

    // Si el número bajó → compra
    if (valor < ultimaCantidad) {
      mostrarNotificacion();
    }

    ultimaCantidad = valor;
  });

  observer.observe(target, { childList: true });

})();



// ==================== NIEVE NAVIDEÑA ====================
function crearNieve() {
  const snow = document.createElement("div");
  snow.classList.add("snowflake");
  snow.innerHTML = "❄";

  snow.style.left = Math.random() * 100 + "vw";
  snow.style.animationDuration = 4 + Math.random() * 6 + "s";
  snow.style.fontSize = 12 + Math.random() * 10 + "px";
  snow.style.opacity = Math.random();

  document.body.appendChild(snow);
  setTimeout(() => snow.remove(), 10000);
}
setInterval(crearNieve, 200);
// ==================== MODAL SEGUIMIENTO COMPLETO MULTI-CÓDIGO ====================
// ==================== MODAL SEGUIMIENTO COMPLETO MULTI-CÓDIGO ====================
// ==================== MODAL SEGUIMIENTO COMPLETO MULTI-CÓDIGO ====================
// ==================== MODAL SEGUIMIENTO COMPLETO MULTI-CÓDIGO ====================
document.addEventListener("DOMContentLoaded", () => {

  const btnSeguimiento = document.getElementById("btnAbrirSeguimiento");
  const modalSeguimiento = document.getElementById("modal-seguimiento");
  const cerrarSeguimiento = document.querySelector(".close-seguimiento");

  const consultarBtn = document.getElementById("consultarSeguimiento");
  const codigoInput = document.getElementById("codigoSeguimiento");
  const resultadoDiv = document.getElementById("resultadoSeguimiento");

  // ============================================
  // BASE DE DATOS DE CÓDIGOS Y ESTADOS
  // ============================================
  const estadosPedidos = {
    "BC-xt589": `
      <div class="estado-container">
        <p>🟢 <strong>Pedido recibido:</strong> 3 de noviembre, 2025</p>
        <p>🟡 <strong>Preparando envío:</strong> 4 de noviembre, 2025</p>
        <p>🔵 <strong>En tránsito:</strong> 5 de noviembre, 2025</p>
        <p>🟣 <strong>En reparto:</strong> 6 de noviembre, 2025</p>
        <p>✅ <strong>Entregado:</strong> 7 de noviembre, 2025</p>
      </div>
    `,
  };
  // ============================================


  if (btnSeguimiento && modalSeguimiento && cerrarSeguimiento && consultarBtn) {

    // Abrir modal
    btnSeguimiento.addEventListener("click", () => {
      modalSeguimiento.style.display = "flex";
    });

    // Cerrar modal
    cerrarSeguimiento.addEventListener("click", () => {
      modalSeguimiento.style.display = "none";
      resultadoDiv.innerHTML = "";
      codigoInput.value = "";
    });

    // Cerrar haciendo clic fuera
    window.addEventListener("click", (e) => {
      if (e.target === modalSeguimiento) {
        modalSeguimiento.style.display = "none";
        resultadoDiv.innerHTML = "";
        codigoInput.value = "";
      }
    });

    // Consultar código
    consultarBtn.addEventListener("click", () => {
      const codigo = codigoInput.value.trim();

      if (estadosPedidos[codigo]) {
        // Si el código existe, mostramos su contenido
        resultadoDiv.innerHTML = estadosPedidos[codigo];
      } else {
        // Si NO existe, error
        resultadoDiv.innerHTML = `
          <p style="color:#ff4444;">
            ❌ Código no encontrado. Verifica e inténtalo nuevamente.
          </p>
        `;
      }
    });

  }
});


