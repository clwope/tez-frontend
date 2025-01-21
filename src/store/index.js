import { createStore } from "vuex";

let store = createStore({
    state: {
        cart: JSON.parse(localStorage.getItem('cart')) || [],
        token: localStorage.getItem('token') || null
    },
    mutations: {
        addToCart(state, item){
            let existingItem = state.cart.find((cartItem) => cartItem.id === item.id);

            if(existingItem){
                alert("Ürün zaten sepette!");
            }else{
                state.cart.push(item);
            }

            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        deleteFromCart(state, productId){
            let index = state.cart.findIndex((cartItem) => cartItem.id === productId);

            state.cart.splice(index, 1);

            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        saveToken(state, token){
            state.token = token;
            localStorage.setItem('token', token);
        },
        clearToken(state){
            state.token = null;
            localStorage.removeItem('token');
        }
    },
    getters: {
        cartItems: (state) => state.cart,
        cartTotal: (state) => state.cart.reduce((total, item) => total + item.quantity * item.price, 0)
    }
})

export default store;