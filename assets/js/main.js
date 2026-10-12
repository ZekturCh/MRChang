'use strict';
document.body.classList.add('js');
const menuButton = document.querySelector('.menu-toggle');
const siteNav = document.getElementById('site-nav');
function closeMenu() { if (!menuButton || !siteNav) return; siteNav.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); }
if (menuButton && siteNav) {
  menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); siteNav.classList.toggle('is-open', open); });
  siteNav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); } });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
  window.matchMedia('(min-width: 921px)').addEventListener('change', closeMenu);
}
const params = new URLSearchParams(window.location.search);
const cards = Array.from(document.querySelectorAll('[data-category]'));
const filters = Array.from(document.querySelectorAll('[data-filter]'));
const search = document.getElementById('buscar-juego');
let category = ['touch', 'motion', 'vr'].includes(params.get('formato')) ? params.get('formato') : 'all';
function filterCards() {
  const query = search ? search.value.trim().toLocaleLowerCase('es') : '';
  let count = 0;
  cards.forEach(card => { const visible = (category === 'all' || card.dataset.category === category) && card.textContent.toLocaleLowerCase('es').includes(query); card.hidden = !visible; if (visible) count++; });
  filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
  const countNode = document.getElementById('resultados');
  if (countNode) countNode.textContent = count + (count === 1 ? ' experiencia disponible en el catálogo' : ' experiencias disponibles en el catálogo');
  const empty = document.getElementById('sin-resultados');
  if (empty) empty.hidden = count !== 0;
}
filters.forEach(button => button.addEventListener('click', () => { category = button.dataset.filter; filterCards(); }));
if (search) search.addEventListener('input', filterCards);
if (filters.length) filterCards();
const form = document.getElementById('cotizacion');
if (form) {
  const game = form.elements.namedItem('juego');
  const agency = form.elements.namedItem('tipo');
  const quoteTitle = document.getElementById('quote-title');
  const quoteDetail = document.getElementById('quote-detail');
  const packages = { touch: { price: 'S/ 1,500', label: 'Touch', note: 'Un día, hasta 8 horas.' }, motion: { price: 'S/ 1,900', label: 'Movimiento', note: 'Configuración básica; duración y montaje por confirmar.' }, vr: { price: 'S/ 2,500', label: 'VR', note: 'Configuración base; duración y montaje por confirmar.' } };
  function updateQuote() {
    const selected = game.selectedOptions[0];
    const pack = selected && packages[selected.dataset.format];
    if (!pack) { quoteTitle.textContent = 'Elige una experiencia'; quoteDetail.textContent = 'Puedes consultar disponibilidad directamente por WhatsApp.'; return; }
    if (selected.value === 'luces-led') { quoteTitle.textContent = 'Instalación LED · Cotización por alcance'; quoteDetail.textContent = 'Definimos luces, espacio, montaje y operación según tu activación.'; return; }
    quoteTitle.textContent = pack.label + ' · Paquete base ' + pack.price;
    quoteDetail.textContent = 'Juego existente, personalización visual acotada, equipos, pantalla y operador. ' + pack.note + ' Confirmamos alcance, logística y disponibilidad antes de reservar.';
  }
  const requested = params.get('juego');
  if (requested && Array.from(game.options).some(option => option.value === requested)) game.value = requested;
  else if (category !== 'all') { const option = Array.from(game.options).find(item => item.dataset.format === category); if (option) game.value = option.value; }
  if (params.get('agencia') === 'si') agency.value = 'Agencia / productora';
  game.addEventListener('change', updateQuote);
  updateQuote();
  const date = form.elements.namedItem('fecha');
  const now = new Date();
  date.min = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0');
  const requestLink = document.getElementById('consulta-whatsapp');
  function updateMessage() {
    const selected = game.selectedOptions[0];
    const selectedDate = date.value;
    const readableDate = selectedDate ? selectedDate.split('-').reverse().join('/') : 'Por confirmar';
    const city = form.elements.namedItem('ciudad').value.trim() || 'Por confirmar';
    const text = ['Hola ParalelVR, quiero consultar disponibilidad y cotización.', 'Experiencia: ' + selected.textContent, 'Fecha: ' + readableDate, 'Ciudad: ' + city, 'Cliente: ' + agency.value, quoteTitle.textContent, 'Quiero confirmar personalización, montaje y precio final para reservar.'].join('\n');
    requestLink.href = 'https://wa.me/51912576685?text=' + encodeURIComponent(text);
  }
  form.addEventListener('input', updateMessage);
  form.addEventListener('change', updateMessage);
  requestLink.addEventListener('click', event => { if (!form.reportValidity()) event.preventDefault(); });
  form.addEventListener('submit', event => { event.preventDefault(); if (form.reportValidity()) requestLink.click(); });
  updateMessage();
}
