export function initUI() {
  const hero = document.getElementById("hero");
  const realidad = document.getElementById("realidad");

  return function onProgressUI(progress){
    // Fade hero out after 10% scroll
    if (progress > 0.1) hero.style.opacity = 0;
    else hero.style.opacity = 1 - (progress/0.1);

    // Reveal realidad after 85%
    if (progress > 0.85) realidad.classList.add("visible");
    else realidad.classList.remove("visible");
  };
}

export async function buildPricingTable() {
  const container = document.getElementById("pricing-table");
  const res = await fetch("data/pricing.json");
  const rows = await res.json();

  const tbl = document.createElement("table");
  const thead = document.createElement("thead");
  thead.innerHTML = "<tr><th>Paquete</th><th>Incluye</th><th>Precio (S/.)</th></tr>";
  tbl.appendChild(thead);

  const tbody = document.createElement("tbody");
  rows.forEach(r=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${r.name}</td><td>${r.includes}</td><td>${r.price.toLocaleString("es-PE")}</td>`;
    tbody.appendChild(tr);
  });
  tbl.appendChild(tbody);
  container.appendChild(tbl);
}
