const grid = document.querySelector('#grid');

function card(p) {
  return `
    <article class="card" data-id="${p.id}" data-img="0">
      <div class="gallery">
        <img src="${p.images[0]}" loading="lazy" decoding="async" fetchpriority="low" width="900" height="900" onclick="change(${p.id},1)">
        <button class="arrow prev" onclick="change(${p.id},-1)">‹</button>
        <button class="arrow next" onclick="change(${p.id},1)">›</button>
        <span class="count">1/${p.images.length}</span>
      </div>

      <h3 class="brand">${p.brand}</h3>

      <div class="price">
        ₡${p.price.toLocaleString('es-CR')} CRC
      </div>

      <div class="sizes">
        ${p.sizes.map(s => `
          <button class="size" onclick="pick(this)">${s}</button>
        `).join('')}
      </div>

      <div class="warning"></div>

      <button class="view" onclick="buy(${p.id})">
        <span class="view-main">VER PRODUCTO</span>
        <span class="view-sub">Comprar por WhatsApp</span>
      </button>
    </article>
  `;
}

function change(id, d) {
  const p = products.find(x => x.id === id);
  const c = document.querySelector(`[data-id="${id}"]`);

  let i = (+c.dataset.img + d + p.images.length) % p.images.length;

  c.dataset.img = i;
  c.querySelector('img').src = p.images[i];
  c.querySelector('.count').textContent = `${i + 1}/${p.images.length}`;
}

function pick(b) {
  b.parentElement
    .querySelectorAll('.size')
    .forEach(x => x.classList.remove('selected'));

  b.classList.add('selected');

  b.closest('.card')
    .querySelector('.warning')
    .textContent = '';
}

function buy(id) {
  const p = products.find(x => x.id === id);
  const c = document.querySelector(`[data-id="${id}"]`);
  const s = c.querySelector('.size.selected');

  if (!s) {
    c.querySelector('.warning').textContent = 'Selecciona una talla';
    return;
  }

  const mensaje =
    `Hola, quiero consultar por TENIS-${String(p.id).padStart(3, '0')}, ` +
    `talla ${s.textContent}, precio ₡${p.price.toLocaleString('es-CR')}.`;

  const whatsappURL =
    `https://wa.me/50686243479?text=${encodeURIComponent(mensaje)}`;

  window.open(whatsappURL, '_blank', 'noopener,noreferrer');
}

grid.innerHTML = products.map(card).join('');