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

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/login', component: Login },
        { path: '/shop', component: Shop },
        { path: '/auction-shop', component: AuctionShop },
        { path: '/cart', component: Cart },
        { path: '/product', component: Product },
        { path: '/auction-product', component: AuctionProduct },
        { path: '/admin/home', component: AdminHome },
        { path: '/admin/add-product', component: AddProduct },
        { path: '/admin/add-auction-product', component: AddAuctionProduct }
    ]
})

let app = createApp(App);

app.use(router)
app.use(store)

app.component('app-navbar', Navbar);
app.component('app-footer', Footer);
app.component('sidebar', Sidebar);

app.mount('#app');
