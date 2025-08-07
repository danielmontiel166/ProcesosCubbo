const baseDeProcesos = {
  administrativos: [],
  operativos: [],
  jefes: [],
  mejora: []
};

let data = JSON.parse(localStorage.getItem("procesosCubbo")) || {};
const procesosYaMostrados = new Set();

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const categoria = urlParams.get("categoria");
  const contenedor = document.getElementById("procesos-container");
  const form = document.getElementById("nuevo-proceso-form");
  const formularioSection = document.getElementById("formulario");

  // Mostrar baseDeProcesos
  if (baseDeProcesos[categoria]) {
    baseDeProcesos[categoria].forEach(proc => {
      const clave = proc.titulo + proc.link;
      if (!procesosYaMostrados.has(clave)) {
        procesosYaMostrados.add(clave);
        renderizarProceso(proc, contenedor, categoria);
      }
    });
  }

  // Mostrar localStorage
  if (data[categoria]) {
    data[categoria].forEach(proc => {
      const clave = proc.titulo + proc.link;
      if (!procesosYaMostrados.has(clave)) {
        procesosYaMostrados.add(clave);
        renderizarProceso(proc, contenedor, categoria);
      }
    });
  }

  // Agregar proceso
  form.addEventListener("submit", e => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const link = document.getElementById("link").value.trim();
    const icono = document.getElementById("icono").value.trim();
    const clave = nombre + link;

    if (!nombre || !link) {
      alert("Completa nombre y link.");
      return;
    }

    if (procesosYaMostrados.has(clave)) {
      alert("Este proceso ya existe.");
      return;
    }

    const nuevoProceso = { titulo: nombre, link: link, icono: icono };
    if (!data[categoria]) data[categoria] = [];
    data[categoria].push(nuevoProceso);
    localStorage.setItem("procesosCubbo", JSON.stringify(data));

    renderizarProceso(nuevoProceso, contenedor, categoria);
    procesosYaMostrados.add(clave);
    form.reset();
    formularioSection.style.display = "none";
  });

  // Botón Ingresar (mostrar/ocultar formulario)
  document.getElementById("btnIngresar").addEventListener("click", () => {
    if (formularioSection.style.display === "none" || formularioSection.style.display === "") {
      formularioSection.style.display = "block";
    } else {
      formularioSection.style.display = "none";
    }
  });

  // Botón Eliminar (mostrar botones de eliminación)
  document.getElementById("btnEliminar").addEventListener("click", () => {
    document.querySelectorAll(".btn-eliminar").forEach(btn => {
      btn.style.display = "inline-block";
    });
  });
});

// Función principal para crear tarjetas
function renderizarProceso(proceso, contenedor, categoria) {
  const clave = proceso.titulo + proceso.link;

  const card = document.createElement("div");
  card.classList.add("productos");

  card.innerHTML = `
    <a href="${proceso.link}" target="_blank">
      <h3>${proceso.icono || "🔗"} ${proceso.titulo}</h3>
    </a>
    <button class="btn-editar">✏️</button>
    <button class="btn-eliminar" style="display:none;">❌</button>
  `;

  // Eliminar
  card.querySelector(".btn-eliminar").addEventListener("click", () => {
    if (confirm("¿Deseas eliminar este proceso?")) {
      // Eliminar del localStorage
      if (data[categoria]) {
        data[categoria] = data[categoria].filter(p => (p.titulo + p.link) !== clave);
        localStorage.setItem("procesosCubbo", JSON.stringify(data));
      }
      card.remove();
      procesosYaMostrados.delete(clave);
    }
  });

  // Editar
  card.querySelector(".btn-editar").addEventListener("click", () => {
    document.getElementById("nombre").value = proceso.titulo;
    document.getElementById("link").value = proceso.link;
    document.getElementById("icono").value = proceso.icono;

    document.getElementById("formulario").scrollIntoView({ behavior: "smooth" });
    document.getElementById("formulario").style.display = "block";

    // Remover el proceso actual para evitar duplicados
    if (data[categoria]) {
      data[categoria] = data[categoria].filter(p => (p.titulo + p.link) !== clave);
      localStorage.setItem("procesosCubbo", JSON.stringify(data));
    }
    card.remove();
    procesosYaMostrados.delete(clave);
  });

  contenedor.appendChild(card);
}
