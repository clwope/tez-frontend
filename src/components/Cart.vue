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
                    <h4>{{product.model}}</h4>
                    <h5>${{product.price.toFixed(2)}}</h5>
                    <div class="quantity">
                        <button class="down-btn" @click="decreaseQuantity(product)"><i class="bi bi-dash"></i></button>
                        <input type="text" :value="product.quantity" readonly disabled>
                        <button class="up-btn" @click="increaseQuantity(product)"><i class="bi bi-plus"></i></button>
                    </div>
                </div>
            </div>

            <div class="product-card" v-for="(product, index) in auctionProducts" :key="index">
                <img :src="product.img">
                <div class="description">
                    <h3>{{product.name}}</h3>
                    <hr>
                    <h4>{{product.model}}</h4>
                    <h5 class="auction-price-info">Başlangıç Fiyatı: {{product.start_price}}</h5>
                    <h5 class="auction-price-info">Son Teklif: {{product.bid}}</h5>
                </div>
            </div>
        </div>

        <div class="bill-info">
            <h3>Toplam: ${{this.cartTotal}} (KDV dahildir)</h3>
            <button>Ödeme Yap</button>
        </div>

    </div>
</template>

<script>
    import saatImage from '@/assets/images/saat_1.jpg';

    export default{
        data(){
            return {
                shopProducts: [...this.$store.state.cart],
                auctionProducts: []
            }
        },
        computed: {
            cartTotal(){
                return this.$store.getters.cartTotal.toFixed(2);
            }
        },
        methods: {
            addShopProducts(){
                let newProducts = Array.from({ length: 2 }, (_, index) => ({
                    img: saatImage,
                    name: "Product Brand",
                    model: "Product Model",
                    price: "$300.00",
                    quantity: 1
                }))

                this.shopProducts.push(...newProducts);
            },
            addAuctionProducts(){
                let newProducts = Array.from({ length: 1 }, (_, index) => ({
                    img: saatImage,
                    name: "Product Brand",
                    model: "Product Model",
                    start_price: "$275.00",
                    bid: "$300.00"
                }))

                this.auctionProducts.push(...newProducts);
            },
            increaseQuantity(product){
                let cartProduct = this.$store.state.cart.find((cartItem) => cartItem.id === product.id);

                cartProduct.quantity++;

                localStorage.setItem('cart', JSON.stringify(this.$store.state.cart));
            },
            decreaseQuantity(product){
                if(product.quantity > 1){
                    let cartProduct = this.$store.state.cart.find((cartItem) => cartItem.id === product.id);

                    cartProduct.quantity--;

                    localStorage.setItem('cart', JSON.stringify(this.$store.state.cart));
                }
            },
            deleteProduct(product){
                this.$store.commit('deleteFromCart', product.id);

                this.shopProducts = [...this.$store.state.cart];
            }
        },
        mounted(){
            // this.addShopProducts();
            // this.addAuctionProducts();
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

.cart > .products > .product-card > .description > h5.auction-price-info{
    padding: 2px 0 2px 20px;
    margin: 0;
    font-size: 20px;
    font-weight: 400;
    font-style: oblique;
    color: black;
    /* background-color: yellow; */
}

.cart > .products > .product-card > .description > h5.auction-price-info:nth-of-type(1){
    margin-top: 12px;
    color: red;
    /* background-color: yellow; */
}

.cart > .products > .product-card > .description > h5.auction-price-info:nth-of-type(2){
    margin-top: 5px;
    color: green;
    /* background-color: yellow; */
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