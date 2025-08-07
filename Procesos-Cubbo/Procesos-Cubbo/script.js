const categorias = [
  { nombre: "📁 Documentación Procesos Administrativos", link: "menu.html?categoria=administrativos" },
  { nombre: "📊 Documentación Procesos Operativos", link: "menu.html?categoria=operativos" },
  { nombre: "📄 Manual Operativo de Jefes/Coordinadores", link: "menu.html?categoria=jefes" },
  { nombre: "🔄 Plan de mejora continua", link: "menu.html?categoria=mejora" }
];

const contenedor = document.getElementById('menu-container');
categorias.forEach(categoria => {
  const boton = document.createElement('a');
  boton.href = categoria.link;
  boton.classList.add('boton-item');
  boton.textContent = categoria.nombre;
  contenedor.appendChild(boton);
});