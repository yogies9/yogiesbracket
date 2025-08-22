// Simple cart with localStorage + WhatsApp checkout
const WA_NUMBER = "6283172397127"; // ganti jika perlu

let cart = JSON.parse(localStorage.getItem('yogies_cart') || '[]');

function saveCart(){
  localStorage.setItem('yogies_cart', JSON.stringify(cart));
}
function formatRupiah(num){
  return new Intl.NumberFormat('id-ID').format(num);
}
function addToCart(nama, harga){
  const item = cart.find(i => i.nama === nama);
  if(item){ item.qty += 1; }
  else { cart.push({ nama, harga, qty:1 }); }
  saveCart();
  renderCart();
  bumpCount();
}
function removeIndex(i){
  cart.splice(i,1);
  saveCart();
  renderCart();
}
function inc(i){ cart[i].qty+=1; saveCart(); renderCart(); }
function dec(i){ cart[i].qty = Math.max(1, cart[i].qty-1); saveCart(); renderCart(); }

function bumpCount(){
  const el = document.getElementById('cart-count');
  el.classList.remove('pulse');
  void el.offsetWidth; // reflow
  el.classList.add('pulse');
}

function toggleCart(){
  const el = document.getElementById('cart');
  const isOpen = el.classList.toggle('open');
  el.setAttribute('aria-hidden', String(!isOpen));
}

function clearCart(){
  if(confirm('Kosongkan keranjang?')){
    cart = [];
    saveCart();
    renderCart();
  }
}

function renderCart(){
  const list = document.getElementById('cart-items');
  const badge = document.getElementById('cart-count');
  list.innerHTML = '';
  let total = 0;
  cart.forEach((it, i) => {
    total += it.harga * it.qty;
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerHTML = `
      <div><strong>${it.nama}</strong><br><small>Rp ${formatRupiah(it.harga)}</small></div>
      <div class="qty">
        <button onclick="dec(${i})">−</button>
        <span>${it.qty}</span>
        <button onclick="inc(${i})">+</button>
      </div>
      <button class="remove" onclick="removeIndex(${i})">Hapus</button>
    `;
    list.appendChild(li);
  });
  document.getElementById('total').textContent = 'Total: Rp ' + formatRupiah(total);
  badge.textContent = cart.reduce((n,it)=>n+it.qty,0);
}

function checkout(){
  if(cart.length === 0){ alert('Keranjang masih kosong'); return; }
  const lines = cart.map(it => `- ${it.nama} x${it.qty} @ Rp ${formatRupiah(it.harga)} = Rp ${formatRupiah(it.harga*it.qty)}`);
  const total = cart.reduce((n,it)=>n + it.harga*it.qty, 0);
  const buyer = prompt('Nama & Kota (opsional):', '');
  const msg = `Halo Yogies, saya ingin order:%0A${lines.join('%0A')}%0A%0ATotal: Rp ${formatRupiah(total)}%0A${buyer ? 'Pemesan: ' + encodeURIComponent(buyer) : ''}`;
  const url = `https://wa.me/6283171297127?text=${msg}`;
  window.open(url, '_blank');
}

document.addEventListener('DOMContentLoaded', renderCart);
