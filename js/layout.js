/* Injects shared header & footer. Edit nav links / contact info here. */
const PAGES = [
  {href:'index.html', label:'Home'},
  {href:'menu.html', label:'Menu'},
  {href:'offers.html', label:'Offers'},
  {href:'gallery.html', label:'Gallery'},
  {href:'about.html', label:'About'},
  {href:'blog.html', label:'Blog'},
  {href:'contact.html', label:'Contact'}
];
const CURRENT = location.pathname.split('/').pop() || 'index.html';

document.addEventListener('DOMContentLoaded', () => {
  const head = document.getElementById('site-header');
  if (head) head.innerHTML = `
    <nav class="nav">
      <div class="nav-inner">
        <a href="index.html" class="logo"><span class="logo-mark">☕</span> Cafe Crazy Lover</a>
        <div class="nav-links">
          ${PAGES.map(p=>`<a href="${p.href}" class="${CURRENT===p.href?'active':''}">${p.label}</a>`).join('')}
        </div>
        <div class="nav-actions">
          <a href="wishlist.html" class="icon-btn" title="Wishlist">♥<span class="badge" data-wish-count style="display:none">0</span></a>
          <a href="cart.html" class="icon-btn" title="Cart">🛒<span class="badge" data-cart-count style="display:none">0</span></a>
          <button class="burger"><span></span></button>
        </div>
      </div>
    </nav>`;

  const foot = document.getElementById('site-footer');
  if (foot) foot.innerHTML = `
    <footer>
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="logo" style="color:var(--cream)"><span class="logo-mark">☕</span> Cafe Crazy Lover</div>
            <p style="margin-top:14px">Brewing happiness for 7 years. Premium coffee, soulful food, unforgettable vibes — all in one cozy cafe.</p>
            <div class="socials">
              <a href="#">f</a><a href="#">ig</a><a href="#">𝕏</a><a href="https://wa.me/917066669903">wa</a>
            </div>
          </div>
          <div>
            <h4>Explore</h4>
            ${PAGES.map(p=>`<a href="${p.href}">${p.label}</a>`).join('')}
          </div>
          <div>
            <h4>Support</h4>
            <a href="faqs.html">FAQs</a>
            <a href="testimonials.html">Testimonials</a>
            <a href="privacy.html">Privacy Policy</a>
            <a href="terms.html">Terms &amp; Conditions</a>
            <a href="contact.html">Help &amp; Contact</a>
          </div>
          <div>
            <h4>Reach Us</h4>
            <p>☎ <a href="tel:+917066669903">+91 70666 69903</a></p>
            <p>✉ hello@cafecrazylover.in</p>
            <p>📍 Cafe Crazy Lover, India</p>
            <p>⏰ Open daily · 9:00 AM – 11:30 PM</p>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} Cafe Crazy Lover · Owned by Chaitanya Sapte · 7 Years of Brewing Joy</span>
          <span>Crafted with ♥ &amp; espresso</span>
        </div>
      </div>
    </footer>`;

  // Add WhatsApp + Scroll-to-top globally
  if (!document.querySelector('.wa-float')) {
    const wa = document.createElement('a');
    wa.className = 'wa-float';
    wa.title = 'Chat on WhatsApp';
    wa.innerHTML = '🟢';
    wa.target = '_blank';
    wa.textContent = '💬';
    document.body.appendChild(wa);
  }
  if (!document.querySelector('.scroll-top')) {
    const st = document.createElement('button');
    st.className = 'scroll-top';
    st.innerHTML = '↑';
    document.body.appendChild(st);
  }
});
