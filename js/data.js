/* ============================
   PRODUCT DATA — edit prices/items here
   ============================ */
const PRODUCTS = [
  // COFFEE
  {id:'p1', name:'Crazy Signature Mocha', cat:'Cold Coffee', price:189, oldPrice:230, img:'assets/hero-coffee.png',
   desc:'Our flagship cold mocha — espresso, chocolate ganache, milk, and a generous vanilla ice-cream scoop drizzled with rich chocolate sauce.',
   ingredients:['Espresso','Chocolate Ganache','Vanilla Ice-cream','Milk','Whipped Cream'],
   rating:4.9, reviews:312, tag:'Signature'},
  {id:'p2', name:'Caramel Whisper Latte', cat:'Cold Coffee', price:159, oldPrice:199, img:'assets/coffee-caramel.png',
   desc:'Smooth iced latte cascaded with golden caramel and a soft pillow of whipped cream.',
   ingredients:['Espresso','Caramel Syrup','Cold Milk','Whipped Cream'],
   rating:4.8, reviews:218, tag:'Bestseller'},
  {id:'p3', name:'Heart Art Cappuccino', cat:'Hot Coffee', price:129, img:'assets/coffee-cappuccino.png',
   desc:'Velvety steamed milk poured over a double espresso, finished with a classic heart rosetta.',
   ingredients:['Double Espresso','Steamed Milk','Microfoam'],
   rating:4.9, reviews:401, tag:'Hot'},
  {id:'p4', name:'Pure Espresso Shot', cat:'Espresso', price:79, img:'assets/coffee-espresso.png',
   desc:'A single, bold pull of our house-roasted Arabica — pure aroma, golden crema.',
   ingredients:['Single Origin Arabica'],
   rating:4.7, reviews:140, tag:'Classic'},
  {id:'p5', name:'Choco Storm Mocha', cat:'Mocha', price:179, oldPrice:210, img:'assets/coffee-mocha.png',
   desc:'A chocolate lover\'s dream — dark cocoa, espresso, milk and whipped cream tower.',
   ingredients:['Espresso','Dark Cocoa','Milk','Whipped Cream','Chocolate Drizzle'],
   rating:4.85, reviews:267, tag:'Trending'},
  {id:'p6', name:'Vanilla Cloud Latte', cat:'Latte', price:149, img:'assets/coffee-cappuccino.png',
   desc:'Smooth vanilla-infused latte with a lush milk foam canopy.',
   ingredients:['Espresso','Vanilla Syrup','Milk'],
   rating:4.7, reviews:189},

  // FOOD — Pizza & Toast
  {id:'p7', name:'Cafe Crazy Special Pizza', cat:'Pizza', price:179, img:'assets/food-bread-pizza.png',
   desc:'Our chef\'s special bread pizza loaded with cheese, peppers, onions and house sauces.',
   ingredients:['Bread Base','Mozzarella','Bell Peppers','Onion','Tomato','House Sauce'],
   rating:4.8, reviews:156, tag:'Special'},
  {id:'p8', name:'Cheese Burst Toast', cat:'Sandwiches', price:120, img:'assets/food-sandwich.png',
   desc:'Crispy grilled sandwich oozing with melted cheese and topped with shredded mozzarella.',
   ingredients:['Bread','Cheese','Butter','Herbs'],
   rating:4.85, reviews:201},
  {id:'p9', name:'Tandoori Cheese Toast', cat:'Sandwiches', price:140, img:'assets/food-cheese-toast.png',
   desc:'Tandoori-spiced filling between crisp toast, topped with cheese and dips.',
   ingredients:['Bread','Tandoori Paneer','Cheese','Onion','Mint Dip'],
   rating:4.7, reviews:128},

  // FRIES
  {id:'p10', name:'Peri Peri Fries', cat:'Fries', price:60, img:'assets/coffee-espresso.png',
   desc:'Golden crisp fries tossed in fiery peri peri seasoning.',
   ingredients:['Potato','Peri Peri Mix','Salt'],
   rating:4.6, reviews:98},
  {id:'p11', name:'Cheese Peri Peri Fries', cat:'Fries', price:90, img:'assets/coffee-espresso.png',
   desc:'Loaded fries smothered with melted cheese and peri peri spice.',
   ingredients:['Potato','Cheese Sauce','Peri Peri'],
   rating:4.8, reviews:142, tag:'Loaded'},

  // SHAKES
  {id:'p12', name:'Strawberry Milkshake', cat:'Shakes', price:76, img:'assets/coffee-mocha.png',
   desc:'Fresh strawberry blended with creamy milk and topped with whipped cream.',
   ingredients:['Strawberry','Milk','Sugar','Whipped Cream'],
   rating:4.7, reviews:110},
  {id:'p13', name:'Chocolate Milkshake', cat:'Shakes', price:70, img:'assets/coffee-mocha.png',
   desc:'Rich chocolate goodness blended into a thick, indulgent shake.',
   ingredients:['Chocolate Syrup','Milk','Ice-cream'],
   rating:4.8, reviews:166},

  // MAGGI / MOMOS
  {id:'p14', name:'Cheese Maggi', cat:'Snacks', price:69, img:'assets/food-sandwich.png',
   desc:'Comfort cheese maggi the way you love it — cheesy, hot, soulful.',
   ingredients:['Maggi','Cheese','Butter','Spices'],
   rating:4.6, reviews:88},
  {id:'p15', name:'Paneer Momos', cat:'Snacks', price:80, img:'assets/food-cheese-toast.png',
   desc:'Steamed momos stuffed with spicy paneer, served with house chutney.',
   ingredients:['Flour','Paneer','Onion','Spices'],
   rating:4.75, reviews:121},

  // BEVERAGE
  {id:'p16', name:'Lemon Mojito', cat:'Beverages', price:79, img:'assets/coffee-caramel.png',
   desc:'Refreshing lemon mojito with fresh mint and a splash of soda.',
   ingredients:['Lemon','Mint','Soda','Sugar'],
   rating:4.7, reviews:75}
];

const CATEGORIES = ['All','Hot Coffee','Cold Coffee','Espresso','Latte','Mocha','Pizza','Sandwiches','Fries','Shakes','Snacks','Beverages'];
