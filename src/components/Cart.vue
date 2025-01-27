<template>
    <div class="cart">

        <div class="banner">
            <h2>Sepet</h2>
        </div>

        <div class="products">
            <div class="product-card" v-for="(product, index) in shopProducts" :key="index">
                <img :src="product.image">
                <div class="description">
                    <h3>{{product.brand}} (x{{product.quantity}}) <button @click="deleteProduct(product)" class="delete"><i class="bi bi-trash"></i></button></h3>
                    <hr>
                    <h4>{{product.model}} {{product.sku}}</h4>
                    <h5>{{parseFloat(product.price).toFixed(2)}} TL</h5>
                    <div class="quantity">
                        <button class="down-btn" @click="decreaseQuantity(product)"><i class="bi bi-dash"></i></button>
                        <input type="text" :value="product.quantity" readonly disabled>
                        <button class="up-btn" @click="increaseQuantity(product)"><i class="bi bi-plus"></i></button>
                    </div>
                </div>
            </div>
        </div>

        <div class="bill-info">
            <h3>Toplam: {{this.cartTotal}} TL (KDV dahildir)</h3>
            <button @click="createOrder">Ödeme Yap</button>
        </div>

    </div>
</template>

<script>
    import axios from 'axios';
    import { InvalidTokenError, jwtDecode } from 'jwt-decode';

    export default{
        data(){
            return {
                shopProducts: [...this.$store.state.cart]
            }
        },
        computed: {
            cartTotal(){
                return this.$store.getters.cartTotal.toFixed(2);
            }
        },
        methods: {
            increaseQuantity(product){
                let cartProduct = this.$store.state.cart.find((cartItem) => cartItem.productId === product.productId);

                cartProduct.quantity++;

                localStorage.setItem('cart', JSON.stringify(this.$store.state.cart));
            },
            decreaseQuantity(product){
                if(product.quantity > 1){
                    let cartProduct = this.$store.state.cart.find((cartItem) => cartItem.productId === product.productId);

                    cartProduct.quantity--;

                    localStorage.setItem('cart', JSON.stringify(this.$store.state.cart));
                }
            },
            deleteProduct(product){
                this.$store.commit('deleteFromCart', product.productId);

                this.shopProducts = [...this.$store.state.cart];
            },
            isTokenValid(token) {
                try {
                    const decoded = jwtDecode(token);
                    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
                    return decoded.exp && decoded.exp > currentTime;
                } catch (error) {
                    // If jwtDecode throws an error, the token is invalid
                    console.error("Invalid or expired token:", error);
                    return false;
                }
            },
            async createOrder(){
                if (!this.isTokenValid(this.$store.state.token)) {
                    alert("Oturum süresi doldu. Lütfen yeniden giriş yapın.");
                    return;
                }

                if(this.$store.state.token){
                    let userId = jwtDecode(this.$store.state.token).Id;
                    let basket = this.$store.state.cart;
                    let basketItemDtos = basket.map((item) => {
                        return {productId: item.productId, quantity: item.quantity}
                    });

                    let order = { userId: userId, createBasketItemDtos: [...basketItemDtos] };

                    console.log(basket, userId, order);

                    try {
                        let response = await axios.post('http://18.196.156.3:8080/api/order/create-order', order, {
                            headers: {
                                Authorization: `Bearer ${this.$store.state.token}`
                            }
                        })
                        console.log(response.data);

                        let orderId = response.data.data.orderId;

                        let userResponse = await axios.get('http://18.196.156.3:8080/api/user/get-user-by-id', {
                            headers: {
                                userId: jwtDecode(this.$store.state.token).Id
                            }
                        })
                        console.log(userResponse.data);

                        let user = userResponse.data.data;

                        let paymentBody = {
                            buyerId: user.id,
                            buyerName: user.userName,
                            buyerSurname: 'WinBid',
                            buyerEmail: user.email,
                            buyerGsmNumber: user.phoneNumber,
                            orderId: orderId,
                            price: this.cartTotal,
                            basketId: 'random123'
                        }

                        let paymentResponse = await axios.post('http://18.196.156.3:8080/api/payment/initialize-payment', paymentBody)

                        console.log(paymentResponse.data);

                        let iyzicoScript = paymentResponse.data.iyzicoCheckoutFormContent;
                        let iyzicoToken = paymentResponse.data.iyzicoToken;

                        console.log(iyzicoToken);
                        console.log(orderId);

                        this.$store.commit('saveIyzicoToken', iyzicoToken);
                        this.$store.commit('saveOrderId', orderId);

                        localStorage.removeItem('cart');

                        this.$router.push({path: '/payment', query: {content: iyzicoScript, token: iyzicoToken}});

                    } catch (error) {
                        console.error(error);
                        alert("Bir hata oluştu");
                    }
                }else{
                    alert("Lütfen önce giriş yapın");
                }
            }
        },
        mounted(){
            console.log(this.$store.state.cart);
        }
    }
</script>

<style scoped>

.cart {
    width: 100%;
    background-color: whitesmoke;
}

/* Banner */

.cart > .banner{
    width: 100%;
    height: 120px;
    background-color: #e5e5e5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.cart > .banner > h2{
    font-weight: 400;
}

.cart > .banner > p{
    font-size: 18px;
    font-style: italic;
}

/* Products */

.cart > .products{
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 30px 0;
    /* background-color: blueviolet; */
}

.cart > .products > .product-card{
    width: 580px;
    height: 180px;
    display: flex;
    background-color: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

.cart > .products > .product-card > img{
    width: 40%;
    height: 100%;
    border-right: 1px solid black;
}

.cart > .products > .product-card > .description{
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* background-color: yellow; */
}

.cart > .products > .product-card > .description > h3{
    padding: 5px 0 5px 20px;
    margin: 0;
    font-size: 22px;
    font-weight: 500;
    color: black;
    position: relative;
    /* background-color: yellow; */
}

.cart > .products > .product-card > .description > h3 > button.delete{
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 100%;
    font-size: 20px;
    background-color: red;
    border: none;
    color: white;
    transition: 0.2s;
}

.cart > .products > .product-card > .description > h3 > button.delete:hover{
    background-color: white;
    border: 1px solid red;
    color: red;
}

.cart > .products > .product-card > .description > hr{
    padding: 0;
    margin: 0;
    /* background-color: yellow; */
}

.cart > .products > .product-card > .description > h4{
    padding: 5px 0 5px 20px;
    margin: 0;
    font-size: 18px;
    font-weight: 400;
    color: black;
    /* background-color: yellow; */
}

.cart > .products > .product-card > .description > h5{
    padding: 2px 0 2px 20px;
    margin: 0;
    font-size: 20px;
    font-weight: 400;
    font-style: oblique;
    color: black;
    /* background-color: yellow; */
}

.cart > .products > .product-card > .description > .quantity{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    margin-top: 10px;
    /* background-color: yellow; */
}

.cart > .products > .product-card > .description > .quantity > input{
    text-align: center;
    padding: 0;
    width: 60px;
    height: 100%;
    font-size: 18px;
    border: 1px solid black;
    background-color: white;
    color: black;
}

.cart > .products > .product-card > .description > .quantity > button{
    text-align: center;
    padding: 0;
    width: 30px;
    height: 100%;
    font-size: 18px;
    border: 1px solid white;
    background-color: black;
    color: white;
}

.cart > .products > .product-card > .description > .quantity > button:hover{
    border: 1px solid black;
    background-color: white;
    color: black;
}

/* Bill Info */

.cart > .bill-info{
    padding: 20px 0 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    /* background-color: yellow; */
}

.cart > .bill-info > h3{
    padding: 0;
    margin: 0;
    font-weight: 400;
}

.cart > .bill-info > button{
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 50px;
    font-weight: 500;
    font-size: 20px;
    background-color: #DE6449;
    border: 1px solid white;
    color: white;
    transition: 0.2s all;
}

.cart > .bill-info > button:hover{
    background-color: white;
    border: 1px solid #DE6449;
    color: #DE6449;
}

</style>