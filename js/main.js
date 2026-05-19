/* ============================
   Cafe Crazy Lover — core JS
   Edit WhatsApp number / phone here
   ============================ */
const WHATSAPP_NUMBER = '917066669903';
const WA_MESSAGE = 'Hello Cafe Crazy Lover, I want to know more about your menu and offers.';

// ---- Disable right click (per requirement) ----
document.addEventListener('contextmenu', e => e.preventDefault());

// ---- Mobile nav toggle ----
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const links = document.querySelector('.nav-links');
  if (burger && links) burger.addEventListener('click', () => links.classList.toggle('open'));

  // Scroll-to-top
  const top = document.querySelector('.scroll-top');
  if (top) {
    window.addEventListener('scroll', () => top.classList.toggle('show', window.scrollY > 500));
    top.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
  }

  // WhatsApp float
  const wa = document.querySelector('.wa-float');
  if (wa) wa.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

  // Reveal on scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target);} });
  }, {threshold:0.12});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Update cart/wishlist badge counts
  updateBadges();

  // Contact form
  const cf = document.getElementById('contact-form');
  if (cf) cf.addEventListener('submit', e => {
    e.preventDefault();
    toast('Thanks! We will get back to you shortly.');
    cf.reset();
  });
});

// ---- Toast ----
function toast(msg){
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._h);
  t._h = setTimeout(()=>t.classList.remove('show'), 2200);
}

// ---- Storage helpers ----
const store = {
  get(k, def){ try { return JSON.parse(localStorage.getItem(k)) ?? def; } catch { return def; } },
  set(k, v){ localStorage.setItem(k, JSON.stringify(v)); }
};

function getCart(){ return store.get('ccl_cart', []); }
function setCart(c){ store.set('ccl_cart', c); updateBadges(); }
function getWish(){ return store.get('ccl_wish', []); }
function setWish(w){ store.set('ccl_wish', w); updateBadges(); }

function addToCart(id, qty=1){
  const cart = getCart();
  const ex = cart.find(i => i.id === id);
  if (ex) ex.qty += qty; else cart.push({id, qty});
  setCart(cart);
  toast('Added to cart ✓');
}
function removeFromCart(id){
  setCart(getCart().filter(i => i.id !== id));
}
function updateCartQty(id, qty){
  const cart = getCart();
  const ex = cart.find(i => i.id === id);
  if (ex) { ex.qty = Math.max(1, qty); setCart(cart); }
}
function toggleWish(id){
  const w = getWish();
  const i = w.indexOf(id);
  if (i >= 0) { w.splice(i,1); toast('Removed from wishlist'); }
  else { w.push(id); toast('Added to wishlist ♥'); }
  setWish(w);
  document.querySelectorAll(`.wish[data-id="${id}"]`).forEach(b => b.classList.toggle('active', w.includes(id)));
}

function updateBadges(){
  const cartCount = getCart().reduce((s,i)=>s+i.qty, 0);
  const wishCount = getWish().length;
  document.querySelectorAll('[data-cart-count]').forEach(el => {
    el.textContent = cartCount;
    el.style.display = cartCount ? 'inline-block' : 'none';
  });
  document.querySelectorAll('[data-wish-count]').forEach(el => {
    el.textContent = wishCount;
    el.style.display = wishCount ? 'inline-block' : 'none';
  });
}

// ---- Product card renderer ----
function starHtml(r){
  const full = Math.round(r);
  return '★★★★★'.slice(0, full) + '☆☆☆☆☆'.slice(0, 5-full);
}
function productCardHtml(p){
  const wishActive = getWish().includes(p.id) ? 'active' : '';
  return `<article class="product-card reveal">
    <div class="img-wrap">
      ${p.tag ? `<span class="tag">${p.tag}</span>`:''}
      <button class="wish ${wishActive}" data-id="${p.id}" onclick="event.preventDefault();toggleWish('${p.id}')">♥</button>
      <a href="product.html?id=${p.id}"><img src="${p.img}" alt="${p.name}" loading="lazy"></a>
    </div>
    <div class="body">
      <span class="cat">${p.cat}</span>
      <h3><a href="product.html?id=${p.id}">${p.name}</a></h3>
      <p class="desc">${p.desc.slice(0,70)}…</p>
      <div class="row">
        <span class="stars" title="${p.rating}">${starHtml(p.rating)}</span>
        <small style="color:var(--muted);font-size:.78rem">(${p.reviews||0})</small>
      </div>
      <div class="row">
        <span class="price">₹${p.price}</span>
        <button class="add" onclick="addToCart('${p.id}')">+ Add</button>
      </div>
    </div>
  </article>`;
}

function renderProductGrid(target, list){
  const el = document.querySelector(target);
  if (!el) return;
  el.innerHTML = list.map(productCardHtml).join('');
  // re-trigger reveal
  const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('in')));
  el.querySelectorAll('.reveal').forEach(n => io.observe(n));
}

// ---- Menu page filters ----
function initMenuPage(){
  if (!document.getElementById('menu-grid')) return;
  const pillsWrap = document.getElementById('cat-pills');
  const search = document.getElementById('search-input');
  pillsWrap.innerHTML = CATEGORIES.map((c,i)=>`<button class="cat-pill ${i===0?'active':''}" data-cat="${c}">${c}</button>`).join('');
  let cat = 'All', q = '';
  function apply(){
    let list = PRODUCTS;
    if (cat !== 'All') list = list.filter(p => p.cat === cat);
    if (q) list = list.filter(p => (p.name+' '+p.desc+' '+p.cat).toLowerCase().includes(q));
    renderProductGrid('#menu-grid', list);
    document.getElementById('result-count').textContent = `${list.length} item${list.length!==1?'s':''}`;
  }
  pillsWrap.addEventListener('click', e => {
    const b = e.target.closest('.cat-pill'); if (!b) return;
    pillsWrap.querySelectorAll('.cat-pill').forEach(x=>x.classList.remove('active'));
    b.classList.add('active'); cat = b.dataset.cat; apply();
  });
  search?.addEventListener('input', e => { q = e.target.value.toLowerCase(); apply(); });
  apply();
}

// ---- Product detail page ----
function initProductPage(){
  const root = document.getElementById('product-detail');
  if (!root) return;
  const id = new URLSearchParams(location.search).get('id') || 'p1';
  const p = PRODUCTS.find(x => x.id === id) || PRODUCTS[0];
  document.title = `${p.name} — Cafe Crazy Lover`;
  const wishActive = getWish().includes(p.id) ? 'active' : '';
  root.innerHTML = `
    <nav style="font-size:.85rem;color:var(--muted);margin-bottom:20px"><a href="index.html">Home</a> › <a href="menu.html">Menu</a> › ${p.name}</nav>
    <div class="pd-grid">
      <div>
        <div class="pd-main-img"><img id="pd-img" src="${p.img}" alt="${p.name}"></div>
        <div class="pd-thumbs">
          ${[p.img,'assets/coffee-caramel.png','assets/coffee-cappuccino.png','assets/coffee-mocha.png'].map((src,i)=>
            `<div class="pd-thumb ${i===0?'active':''}" onclick="document.getElementById('pd-img').src='${src}';this.parentElement.querySelectorAll('.pd-thumb').forEach(x=>x.classList.remove('active'));this.classList.add('active')"><img src="${src}" alt=""></div>`
          ).join('')}
        </div>
      </div>
      <div class="pd-info">
        <span class="cat-tag">${p.cat}</span>
        ${p.tag?`<span class="cat-tag" style="background:var(--mocha);color:var(--cream);margin-left:6px">${p.tag}</span>`:''}
        <h1>${p.name}</h1>
        <div class="rating"><span class="stars">${starHtml(p.rating)}</span> <strong>${p.rating}</strong> · ${p.reviews} reviews</div>
        <div class="price-big">₹${p.price}${p.oldPrice?`<small>₹${p.oldPrice}</small>`:''}</div>
        <p style="color:#3a9c4a;font-weight:600;font-size:.9rem">● In stock · Ready in 10–15 min</p>
        <p class="desc-l">${p.desc}</p>
        <h4 style="margin-bottom:10px">Ingredients</h4>
        <ul class="ingr">${p.ingredients.map(i=>`<li>${i}</li>`).join('')}</ul>
        <h4 style="margin-bottom:10px">Customize</h4>
        <ul class="ingr">
          <li>☕ Regular</li><li>+ Extra Shot ₹30</li><li>+ Whipped Cream ₹20</li><li>+ Less Sugar</li>
        </ul>
        <div class="qty-cart">
          <div class="qty">
            <button onclick="changeQty(-1)">−</button>
            <span id="pd-qty">1</span>
            <button onclick="changeQty(1)">+</button>
          </div>
          <button class="btn btn-primary" onclick="addToCart('${p.id}', parseInt(document.getElementById('pd-qty').textContent))">🛒 Add to Cart</button>
          <button class="btn btn-ghost" onclick="addToCart('${p.id}', parseInt(document.getElementById('pd-qty').textContent));location.href='checkout.html'">⚡ Buy Now</button>
          <button class="icon-btn wish ${wishActive}" data-id="${p.id}" onclick="toggleWish('${p.id}')" style="font-size:18px">♥</button>
        </div>
        <div class="pd-meta">
          <span>🚚 <b>Free delivery</b> on orders above ₹299</span>
          <span>⏱ Estimated delivery in <b>30 minutes</b></span>
          <span>🛡 100% Quality Assured · FSSAI Certified</span>
        </div>
      </div>
    </div>
    <section class="block">
      <div class="section-head"><span class="eyebrow">You may also love</span><h2>Related Items</h2></div>
      <div class="product-grid" id="related-grid"></div>
    </section>
  `;
  const related = PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).slice(0,4);
  renderProductGrid('#related-grid', related.length ? related : PRODUCTS.filter(x=>x.id!==p.id).slice(0,4));
}
function changeQty(d){
  const el = document.getElementById('pd-qty');
  el.textContent = Math.max(1, parseInt(el.textContent) + d);
}

// ---- Cart page ----
function initCartPage(){
  const root = document.getElementById('cart-root');
  if (!root) return;
  render();
  function render(){
    const cart = getCart();
    if (!cart.length){
      root.innerHTML = `<div class="cart-empty"><h2 style="font-family:var(--font-display);margin-bottom:10px">Your cart is empty</h2><p>Add something delicious from our menu.</p><a class="btn btn-primary" href="menu.html" style="margin-top:20px">Browse Menu</a></div>`;
      return;
    }
    const items = cart.map(ci => ({...ci, p: PRODUCTS.find(p=>p.id===ci.id)})).filter(x=>x.p);
    const sub = items.reduce((s,x)=>s+x.p.price*x.qty, 0);
    const delivery = sub >= 299 ? 0 : 30;
    const tax = Math.round(sub * 0.05);
    const total = sub + delivery + tax;
    root.innerHTML = `<div class="cart-grid">
      <div class="cart-list">
        ${items.map(x=>`<div class="cart-item">
          <div class="ci-img"><img src="${x.p.img}" alt=""></div>
          <div class="info"><h4>${x.p.name}</h4><span class="ci-cat">${x.p.cat}</span></div>
          <div class="qty">
            <button onclick="updateCartQty('${x.id}', ${x.qty-1});initCartPage()">−</button>
            <span>${x.qty}</span>
            <button onclick="updateCartQty('${x.id}', ${x.qty+1});initCartPage()">+</button>
          </div>
          <div class="ci-price">₹${x.p.price*x.qty}</div>
          <button class="rm" onclick="removeFromCart('${x.id}');initCartPage()">✕</button>
        </div>`).join('')}
      </div>
      <div class="summary">
        <h3>Order Summary</h3>
        <div class="row"><span>Subtotal</span><span>₹${sub}</span></div>
        <div class="row"><span>Delivery</span><span>${delivery?`₹${delivery}`:'FREE'}</span></div>
        <div class="row"><span>Taxes (5%)</span><span>₹${tax}</span></div>
        <div class="row total"><span>Total</span><span>₹${total}</span></div>
        <a class="btn btn-primary" href="checkout.html">Proceed to Checkout →</a>
        <a class="btn btn-ghost" href="menu.html" style="margin-top:10px;width:100%;justify-content:center">Continue Shopping</a>
      </div>
    </div>`;
  }
}

// ---- Checkout ----
function initCheckoutPage(){
  const root = document.getElementById('checkout-root');
  if (!root) return;
  const cart = getCart();
  const items = cart.map(ci => ({...ci, p: PRODUCTS.find(p=>p.id===ci.id)})).filter(x=>x.p);
  const sub = items.reduce((s,x)=>s+x.p.price*x.qty, 0);
  const delivery = sub >= 299 ? 0 : 30, tax = Math.round(sub*0.05);
  const total = sub + delivery + tax;
  root.innerHTML = `<div class="cart-grid">
    <form class="cart-list" onsubmit="event.preventDefault();toast('Order placed! 🎉');setCart([]);setTimeout(()=>location.href='index.html', 1500)">
      <h3 style="font-family:var(--font-display);margin-bottom:18px">Delivery Details</h3>
      <div class="form-row"><input class="input" placeholder="Full Name" required><input class="input" placeholder="Phone Number" required></div>
      <input class="input" placeholder="Email Address" type="email" required>
      <input class="input" placeholder="Delivery Address" required>
      <div class="form-row"><input class="input" placeholder="City" required><input class="input" placeholder="Pincode" required></div>
      <textarea class="input" placeholder="Order notes (optional)"></textarea>
      <h3 style="font-family:var(--font-display);margin:20px 0 14px">Payment Method</h3>
      <label style="display:flex;gap:10px;align-items:center;padding:14px;background:var(--cream);border-radius:14px;margin-bottom:10px"><input type="radio" name="pay" checked> Cash on Delivery</label>
      <label style="display:flex;gap:10px;align-items:center;padding:14px;background:var(--cream);border-radius:14px;margin-bottom:10px"><input type="radio" name="pay"> UPI / Google Pay</label>
      <label style="display:flex;gap:10px;align-items:center;padding:14px;background:var(--cream);border-radius:14px"><input type="radio" name="pay"> Credit / Debit Card</label>
      <button class="btn btn-primary" style="width:100%;justify-content:center;margin-top:20px" type="submit">Place Order · ₹${total}</button>
    </form>
    <div class="summary">
      <h3>Your Order</h3>
      ${items.map(x=>`<div class="row"><span>${x.p.name} × ${x.qty}</span><span>₹${x.p.price*x.qty}</span></div>`).join('')}
      <div class="row" style="border-top:1px solid rgba(139,94,60,.15);margin-top:8px;padding-top:10px"><span>Subtotal</span><span>₹${sub}</span></div>
      <div class="row"><span>Delivery</span><span>${delivery?`₹${delivery}`:'FREE'}</span></div>
      <div class="row"><span>Tax</span><span>₹${tax}</span></div>
      <div class="row total"><span>Total</span><span>₹${total}</span></div>
    </div>
  </div>`;
}

// ---- Wishlist ----
function initWishPage(){
  const root = document.getElementById('wish-root');
  if (!root) return;
  const ids = getWish();
  const list = PRODUCTS.filter(p => ids.includes(p.id));
  if (!list.length){
    root.innerHTML = `<div class="cart-empty"><h2 style="font-family:var(--font-display);margin-bottom:10px">Your wishlist is empty</h2><p>Tap the ♥ on any item to save it here.</p><a class="btn btn-primary" href="menu.html" style="margin-top:20px">Explore Menu</a></div>`;
    return;
  }
  root.innerHTML = `<div class="product-grid" id="wish-grid"></div>`;
  renderProductGrid('#wish-grid', list);
}
