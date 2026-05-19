# Cafe Crazy Lover — Static Website

Premium, fully responsive cafe & food ordering website built as a pure
HTML/CSS/JS site that runs **completely offline** when opened from disk.

## Quick start
Just double-click `index.html` (or drag it into your browser).
Everything works offline — cart, wishlist, product pages, checkout, search,
filters, animations. No build step required.

## What's inside
```
index.html            ← Homepage (open this first)
menu.html             ← Full menu with search + filters
product.html?id=p1    ← Dynamic product detail page
cart.html             ← Shopping cart (LocalStorage)
checkout.html         ← Checkout flow
wishlist.html         ← Saved items
about.html, offers.html, gallery.html, blog.html,
testimonials.html, faqs.html, contact.html,
privacy.html, terms.html
css/style.css         ← All styles (edit colors at the top)
js/data.js            ← All product data (edit prices/items here)
js/main.js            ← Cart, wishlist, render logic
js/layout.js          ← Shared header & footer
assets/               ← All images
```

## Easy edits
| What | Where |
|------|-------|
| Colors / brand palette | `css/style.css` — `:root` block at the top |
| Phone & WhatsApp number | `js/main.js` (`WHATSAPP_NUMBER`) and `js/layout.js` |
| Menu items / prices | `js/data.js` |
| Hero coffee image | `assets/hero-coffee.png` |
| Logo text | `js/layout.js` (search for "Cafe Crazy Lover") |
| Nav links | `js/layout.js` (`PAGES` array) |

## Features included
- Premium animated hero with floating beans & glowing circle
- Featured slider, popular products, trending grid
- Full menu with search + category filtering
- Product detail pages with gallery, ingredients, customization,
  quantity selector, Add-to-Cart and Buy-Now
- Working cart (persisted in LocalStorage)
- Working wishlist with badge counts
- Checkout page with order summary
- Sticky nav, animated mobile menu, scroll-to-top
- Floating WhatsApp button on every page → opens chat with +91 70666 69903
- Scroll-reveal animations everywhere
- Right-click disabled site-wide
- Fully mobile-responsive (320px → 4K)
- Google Maps embed on Contact

## Notes
- LocalStorage powers cart/wishlist — works offline.
- Some images are AI-generated; replace with real product shots inside `assets/`.
- The contact form is ready to wire up to Formspree — just set the
  form `action` attribute when you're ready to go live.

Made with ☕ + ❤️ for Chaitanya Sapte & Cafe Crazy Lover.
