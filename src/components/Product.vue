<template>
    <div class="product-page">

        <div class="banner">
            <h4>Ana Sayfa > Online Satış > {{product.sku}}</h4>
        </div>

        <div class="product-section">
            <div class="image-section">
                <img :src="currentImage">

                <div class="images">
                    <img v-for="(image, index) in product.productImages" :key="index" @click="changeImg(image.path)" :src="image.path">
                </div>
            </div>

            <div class="description">
                <div class="product-details">
                    <h3>{{product.brand}}</h3>
                    <h4>{{product.model}} {{product.sku}}</h4>
                    <h5>Technology: <span>{{product.technology}}</span></h5>
                    <h5>Kasa Rengi: <span>{{product.caseColor}}</span></h5>
                    <h5>Kasa Tipi: <span>{{product.caseShape}}</span></h5>
                    <h5>Kordon Rengi: <span>{{product.bandColor}}</span></h5>
                    <h5>Kadran Rengi: <span>{{product.dialColor}}</span></h5>
                    <h5>Cinsiyet: <span>{{product.gender}}</span></h5>
                </div>

                <h3 class="price">{{parseFloat(product.price).toFixed(2)}} TL</h3>

                <div class="quantity">
                    <button class="down-btn" @click="decreaseQuantity"><i class="bi bi-dash"></i></button>
                    <input type="text" :value="product_quantity" readonly disabled>
                    <button class="up-btn" @click="increaseQuantity"><i class="bi bi-plus"></i></button>
                </div>

                <button @click="addToCart">Sepete Ekle</button>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';

export default{
    data(){
        return{
            product: { },
            product_quantity: 1,
            currentImage: '',
            productId: this.$route.params.id
        }
    },
    methods: {
        increaseQuantity(){
            this.product_quantity++;
        },
        decreaseQuantity(){
            if(this.product_quantity > 1){
                this.product_quantity--;
            }
        },
        changeImg(image){
            this.currentImage = image;
        },
        addToCart(){
            let item = { 
                productId: this.product.id, 
                brand: this.product.brand, 
                model: this.product.model,
                price: this.product.price, 
                sku: this.product.sku, 
                quantity: this.product_quantity, 
                image: this.product.productImages[0].path 
            };
            this.$store.commit('addToCart', item);
        },
        async getProduct(){
            let response = await axios.get('http://18.196.156.3:8080/api/product/get-product-by-id', {
                params: {
                    productId: this.productId 
                }
            })

            this.product = response.data.data;
            console.log(this.product);

            this.currentImage = this.product.productImages[0].path
        }
    },
    mounted() {
        this.getProduct();
    }
}

</script>

<style scoped>
    .product-page{
        width: 100%;
        padding-bottom: 40px;
        background-color: whitesmoke;
    }

    /* Banner */

    .product-page > .banner{
        padding: 30px;
        background-color: #e5e5e5;
    }

    .product-page > .banner > h4{
        font-weight: 400;
        font-size: 20px;
        font-style: oblique;
    }

    /* Product Section */

    .product-section{
        width: 70%;
        margin-top: 40px;
        display: flex;
        justify-self: center;
        padding: 0;
        background-color: whitesmoke;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    }

    /* Image Section */

    .product-page > .product-section > .image-section{
        width: 50%;
        padding: 25px 0 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 40px;
        border-right: 1px solid black;
        background-color: #e5e5e5;
    }

    .product-page > .product-section > .image-section > img{
        width: 400px;
        height: 400px;
        object-fit: cover;
        /* border: 1px solid black; */
    }

    .product-page > .product-section > .image-section > .images{
        width: 100%;
        padding: 30px 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        column-gap: 20px;
        row-gap: 20px;
        background-color: antiquewhite;
    }

    .product-page > .product-section > .image-section > .images > img{
        width: 100px;
        height: 100px;
        border: 1px solid white;
        cursor: pointer;
        transition: 0.2s all;
    }

    .product-page > .product-section > .image-section > .images > img:hover{
        border: 1px solid black;
        /* opacity: 0.5; */
    }

    /* Description */

    .product-page > .product-section > .description{
        width: 50%;
        padding: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        row-gap: 10px;
        align-items: center;
        background-color: #ffffff;
    }

    .product-page > .product-section > .description > .product-details{
        width: 100%;
        padding: 10px 0;
        /* background-color: yellow; */
    }

    .product-page > .product-section > .description > .product-details > h3{
        margin: 0;
        padding: 0 0 0 0;
        text-align: center;
        font-size: 24px;
        font-weight: 500;
        color: black;
    }

    .product-page > .product-section > .description > .product-details > h4{
        margin: 0 0 30px 0;
        padding: 0 0 0 0;
        text-align: center;
        font-size: 20px;
        font-weight: 400;
        color: black;
    }

    .product-page > .product-section > .description > .product-details > h5{
        margin: 0;
        padding: 4px 0 4px 20px;
        /* text-align: center; */
        font-size: 20px;
        font-weight: 400;
        font-weight: 500;
        color: black;
    }

    .product-page > .product-section > .description > .product-details > h5:nth-of-type(1){
        margin-top: 0;
    }

    .product-page > .product-section > .description > .product-details > h5 > span{
        font-style: italic;
    }

    .product-page > .product-section > .description > .price{
        font-weight: 400;
        padding: 10px 0 20px;
    }

    .product-page > .product-section > .description > .quantity{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;
        margin: 0 0 0 0;
        /* background-color: blueviolet; */
    }

    .product-page > .product-section > .description > .quantity > input {
        text-align: center;
        padding: 0;
        width: 60px;
        height: 30px;
        font-size: 18px;
        border: 1px solid black;
        background-color: white;
        color: black;
    }


    .product-page > .product-section > .description > .quantity > button {
        text-align: center;
        padding: 0;
        width: 30px;
        height: 30px;
        font-size: 18px;
        border: none;
        background-color: black;
        color: white;
    }

    .product-page > .product-section > .description > .quantity > button:hover {
        border: 1px solid black;
        background-color: white;
        color: black;
    }


    .product-page > .product-section > .description > button {
        padding: 0;
        margin-top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        justify-self: center;
        width: 160px;
        height: 40px;
        font-weight: 400;
        font-size: 20px;
        background-color: #DE6449;
        border: 1px solid white;
        color: white;
        transition: 0.2s all;
    }

    .product-page > .product-section > .description > button:hover{
        background-color: white;
        border: 1px solid #DE6449;
        color: #DE6449;
    }

</style>