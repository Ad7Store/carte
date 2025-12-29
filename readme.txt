ecommerce-project/
├── public/
│   ├── favicon.ico
│   └── images/
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Navbar.js
│   │   │   ├── Sidebar.js
│   │   │   └── Footer.js
│   │   ├── Home/
│   │   │   ├── HeroSection.js
│   │   │   ├── ProductCard.js
│   │   │   └── FeaturedProducts.js
│   │   ├── Admin/
│   │   │   ├── AdminLayout.js
│   │   │   ├── UsersManagement.js
│   │   │   ├── ItemsManagement.js
│   │   │   └── CheckoutsManagement.js
│   │   ├── Cart/
│   │   │   ├── CartItem.js
│   │   │   └── CheckoutForm.js
│   │   └── Auth/
│   │       └── Login.js
│   ├── pages/
│   │   ├── index.js (Home Page)
│   │   ├── cart.js
│   │   ├── checkout.js
│   │   ├── admin.js
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── login.js
│   │   │   ├── items.js
│   │   │   ├── checkout.js
│   │   │   ├── users.js
│   │   │   └── cloudinary.js
│   │   └── _app.js
│   ├── styles/
│   │   ├── globals.css
│   │   ├── Home.module.css
│   │   └── Admin.module.css
│   ├── utils/
│   │   ├── auth.js
│   │   ├── cloudinary.js
│   │   ├── github-api.js
│   │   └── constants.js
│   ├── hooks/
│   │   ├── useCart.js
│   │   └── useAuth.js
│   └── contexts/
│       ├── CartContext.js
│       └── AuthContext.js
├── .env.local.example
├── next.config.js
├── package.json
├── vercel.json
└── README.md
