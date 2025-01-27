import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import store from './store'
import App from './App.vue'

import Navbar from './components/layouts/Navbar.vue';
import Footer from './components/layouts/Footer.vue';
import Sidebar from './components/layouts/Sidebar.vue';

import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Shop from './components/Shop.vue';
import AuctionShop from './components/AuctionShop.vue';
import Cart from './components/Cart.vue';
import AuctionProduct from './components/AuctionProduct.vue';
import Product from './components/Product.vue';
import AdminHome from './components/admin/Home.vue';
import AddProduct from './components/admin/AddProduct.vue';
import AddAuctionProduct from './components/admin/AddAuctionProduct.vue'
import Test from './components/Test.vue'
import ShopProducts from './components/admin/ShopProducts.vue'
import AuctionProducts from './components/admin/AuctionProducts.vue'
import UpdateProduct from './components/admin/UpdateProduct.vue'
import Orders from './components/admin/Orders.vue'
import Payment from './components/Payment.vue'
import VerifyPayment from './components/VerifyPayment.vue'
import About from './components/About.vue'
import Contact from './components/Contact.vue'
import MyBids from './components/admin/MyBids.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', component: Home },
        { path: '/about', component: About },
        { path: '/contact', component: Contact },
        { path: '/login', component: Login },
        { path: '/shop', component: Shop },
        { path: '/auction-shop', component: AuctionShop },
        { path: '/cart', component: Cart },
        { path: '/product/:id', component: Product },
        { path: '/auction-product/:id', component: AuctionProduct },
        { path: '/admin/home', component: AdminHome },
        { path: '/admin/add-product', component: AddProduct },
        { path: '/admin/add-auction-product', component: AddAuctionProduct },
        { path: '/admin/products', component: ShopProducts},
        { path: '/admin/auction-products', component: AuctionProducts},
        { path: '/admin/update-product/:id', component: UpdateProduct },
        { path: '/admin/orders', component: Orders},
        { path: '/admin/bids', component: MyBids},
        { path: '/payment', component: Payment },
        { path: '/verify-payment', component: VerifyPayment},
        { path: '/test', component: Test }
    ]
})

let app = createApp(App);

app.use(router)
app.use(store)

app.component('app-navbar', Navbar);
app.component('app-footer', Footer);
app.component('sidebar', Sidebar);

app.mount('#app');