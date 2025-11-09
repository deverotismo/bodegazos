// ==================== SCRIPT LIMPIO Y CORREGIDO ====================

document.addEventListener("DOMContentLoaded", () => {

  // ==================== SUSCRIPCIÓN ====================
  const newsletter = document.getElementById("newsletter");
  if (newsletter) {
    newsletter.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("¡Gracias por suscribirte a Bodegazos.store!");
      this.reset();
    });
  }

  // ==================== ÍCONOS CAYENDO ====================
  const container = document.querySelector(".falling-icons");
  if (container) {
    const icons = ["💾","⚙️","💡","🔋","💻","📱","🔧","⚡","🌐","👕","👖","👟","👗","🧢","🍔","🍕","🥤","🍩","🥪"];
    function createEmoji() {
      const span = document.createElement("span");
      span.textContent = icons[Math.floor(Math.random() * icons.length)];
      span.style.left = Math.random() * 100 + "%";
      span.style.fontSize = 1 + Math.random() * 1.6 + "rem";
      span.style.opacity = 0.6 + Math.random() * 0.4;
      span.style.top = "-8%";
      const duration = 6 + Math.random() * 6;
      span.style.animation = `fall ${duration}s linear forwards`;
      container.appendChild(span);
      span.addEventListener("animationend", () => span.remove());
    }
    setInterval(createEmoji, 10);
  }

  // ==================== MARCAS: TOOLTIP + MODAL ====================
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

  // ==================== SCROLL INFINITO DE MARCAS ====================
  const track = document.querySelector(".marcas-track");
  if (track) {
    const clones = Array.from(track.children).map(node => node.cloneNode(true));
    clones.forEach(clone => clone.classList.add("clone"));
    clones.forEach(clone => track.appendChild(clone));
    track.style.animation = "scrollMarcas 60s linear infinite";
  }

  // ==================== PASOS (FAQ) ====================
  const steps = document.querySelectorAll(".step");
  steps.forEach(step => {
    step.addEventListener("click", () => {
      steps.forEach(s => s !== step && s.classList.remove("active"));
      step.classList.toggle("active");
    });
  });

  // ====== MODAL DE NIVELES ======
  const modalNiveles = document.getElementById("modal-niveles");
  const buyButtons = document.querySelectorAll(".buy-btn");
  const closeNivel = modalNiveles?.querySelector(".close");

  buyButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      modalNiveles.classList.add("show");
    });
  });

  closeNivel?.addEventListener("click", () => {
    modalNiveles.classList.remove("show");
  });

  window.addEventListener("click", (e) => {
    if (e.target === modalNiveles) modalNiveles.classList.remove("show");
  });

  // === FORMULARIO DE COMPRA ===
  const quieroBtns = document.querySelectorAll(".btn-modal, .nivel-btn");
  const formModal = document.getElementById("formModal");
  const closeForm = document.getElementById("closeForm");
  const purchaseForm = document.getElementById("purchaseForm");
  const enviarBtn = document.getElementById("enviarBtn");
  const whatsappLink = "https://wa.me/573001112233";

  if (quieroBtns.length && formModal && purchaseForm) {
    quieroBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        modalNiveles.classList.remove("show");
        formModal.classList.add("show");
      });
    });

    closeForm?.addEventListener("click", () => {
      formModal.classList.remove("show");
      modalNiveles.classList.remove("show");
    });

    purchaseForm.addEventListener("input", () => {
      const allFilled = Array.from(purchaseForm.querySelectorAll("input, select"))
        .every(f => f.value.trim() !== "");
      enviarBtn.disabled = !allFilled;
    });

    purchaseForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Trasladando a un asesor de compra...");
      formModal.classList.remove("show");
      modalNiveles.classList.remove("show");
      setTimeout(() => window.location.href = whatsappLink, 1500);
    });
  }

  // ==================== CARGAR CIUDADES ====================
  const ciudadSelect = document.getElementById("ciudad");
  if (ciudadSelect) {
    fetch("https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.json")
      .then(res => res.json())
      .then(data => {
        const municipios = new Set();
        data.forEach(depto => {
          const lista = depto.municipios || depto.ciudades;
          if (lista) lista.forEach(m => municipios.add(m.trim()));
        });
        const listaOrdenada = Array.from(municipios).sort((a, b) => a.localeCompare(b));
        ciudadSelect.innerHTML = '<option value="">Selecciona tu ciudad o municipio</option>';
        listaOrdenada.forEach(nombre => {
          const option = document.createElement("option");
          option.value = nombre;
          option.textContent = nombre;
          ciudadSelect.appendChild(option);
        });
      })
      .catch(err => console.error("Error al cargar municipios:", err));
  }

  // ==================== MODAL DE SEGUIMIENTO ====================
  const btnSeguimiento = document.getElementById("btnSeguimiento");
  const modalSeguimiento = document.getElementById("modal-seguimiento");
  const closeSeguimiento = document.querySelector(".close-seguimiento");
  const consultarBtn = document.getElementById("consultarSeguimiento");
  const codigoInput = document.getElementById("codigoSeguimiento");
  const resultadoDiv = document.getElementById("resultadoSeguimiento");

  if (btnSeguimiento && modalSeguimiento && consultarBtn) {
    // Abrir modal
    btnSeguimiento.addEventListener("click", (e) => {
      e.preventDefault();
      modalSeguimiento.style.display = "flex";
    });

    // Cerrar modal
    closeSeguimiento?.addEventListener("click", () => {
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
      if (codigo === "BC-xt589") {
        resultadoDiv.innerHTML = `
          <div class="estado-container">
            <p>🟢 <strong>Pedido recibido:</strong> 3 de noviembre, 2025</p>
            <p>🟡 <strong>Preparando envío:</strong> 4 de noviembre, 2025</p>
            <p>🔵 <strong>En tránsito:</strong> 5 de noviembre, 2025</p>
            <p>🟣 <strong>En reparto:</strong> 6 de noviembre, 2025</p>
            <p>✅ <strong>Entregado:</strong> 7 de noviembre, 2025</p>
          </div>
        `;
      } else {
        resultadoDiv.innerHTML = `<p style="color:#ff4444;">❌ Código no encontrado. Verifica e inténtalo nuevamente.</p>`;
      }
    });
  }

});
