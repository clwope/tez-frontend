<template>
    <div class="add-product">
        <sidebar></sidebar>

        <div class="form">

            <h1>Müzayede Ürünü Ekle</h1>

            <form class="row g-3">
                <div class="col-md-6">
                    <label for="auction_product_brand" class="form-label">Marka</label>
                    <input type="text" class="form-control" id="auction_product_brand" v-model="product.brand">
                </div>
                <div class="col-md-6">
                    <label for="auction_product_model" class="form-label">Model</label>
                    <input type="text" class="form-control" id="auction_product_model" v-model="product.model">
                </div>
                <div class="col-md-6">
                    <label for="auction_product_case_color" class="form-label">Kasa Rengi</label>
                    <input type="text" class="form-control" id="auction_product_case_color" v-model="product.caseColor">
                </div>
                <div class="col-md-6">
                    <label for="auction_product_case_shape" class="form-label">Kasa Şekli</label>
                    <input type="text" class="form-control" id="auction_product_case_shape" v-model="product.caseShape">
                </div>
                <div class="col-md-6">
                    <label for="auction_product_cord_color" class="form-label">Kordon Rengi</label>
                    <input type="text" class="form-control" id="auction_product_cord_color" v-model="product.bandColor">
                </div>
                <div class="col-md-6">
                    <label for="auction_product_dial_color" class="form-label">Kadran Rengi</label>
                    <input type="text" class="form-control" id="auction_product_dial_color" v-model="product.dialColor">
                </div>
                <div class="col-md-6">
                    <label for="auction_product_gender" class="form-label">Cinsiyet</label>
                    <select class="form-select" id="auction_product_gender" v-model="product.gender">
                        <option value="Unisex" selected>Unisex</option>
                        <option value="Erkek">Erkek</option>
                        <option value="Kadın">Kadın</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label for="auction_product_technology" class="form-label">Teknoloji</label>
                    <input type="text" class="form-control" id="auction_product_technology" v-model="product.technology">
                </div>
                <div class="col-md-6">
                    <label for="auction_product_price" class="form-label">Fiyat</label>
                    <input type="number" min="0" class="form-control" id="auction_product_price" placeholder="1699.95" v-model="product.price">
                </div>
                <div class="col-md-6">
                    <label for="auction_product_start_date" class="form-label">Başlangıç Tarihi</label>
                    <input type="datetime-local" class="form-control" id="auction_product_start_date" v-model="product.startDate">
                </div>
                <div class="col-md-6">
                    <label for="auction_product_end_date" class="form-label">Bitiş Tarihi</label>
                    <input type="datetime-local" class="form-control" id="auction_product_end_date" v-model="product.endDate">
                </div>
                <div class="col-md-6">
                    <label for="product_images" class="form-label">Ürün Resimleri</label>
                    <input type="file" class="form-control" id="product_images" @change="handleFileUpload" multiple>
                    <div class="image-preview">
                        <img v-for="(image, index) in previewImages" :key="index" :src="image" class="preview-image" />
                    </div>
                </div>
            </form>

            <button type="submit" @click="addAuctionProduct">Ürünü Ekle</button>

        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

    export default {
        data() {
            return {
            previewImages: [],
            product: {
                name: 'Ürün İsmi',
                description: 'abc',
                price: null,
                sku: '1234',
                brand: null,
                model: null,
                caseColor: null,
                caseShape: null,
                bandColor: null,
                dialColor: null,
                gender: null,
                technology: null,
                isAvailable: true,
                stockCount: 1,
                productImages: null,
                userId: null,
                startingPrice: null,
                startDate: null,
                endDate: null,
                categoryId: "3deabc52-a8e6-47df-a211-fac748c6c979"
            }
            };
        },
        methods: {
            handleFileUpload(event) {
                this.previewImages = []; // Clear existing previews
                this.product.productImages = [];

                const files = event.target.files;

                Array.from(files).forEach(file => {
                    let path = "/tez-frontend/images/";
                    this.product.productImages.push({ path: path + file.name });

                    const reader = new FileReader();
                    reader.onload = e => {
                        this.previewImages.push(e.target.result); // Add preview image URL
                    };
                    reader.readAsDataURL(file); // Convert file to Data URL for preview
                });
            },
            logProduct(){
                console.log(this.product);
            },
            formatDateToISO(dateString) {
                const localDate = new Date(dateString); // Parse the input as local time
                return new Date(localDate).toISOString();
                // return new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000).toISOString();
            },
            async addAuctionProduct(){
                this.product.startingPrice = this.product.price;
                let token = jwtDecode(this.$store.state.token);
                this.product.userId = token.Id;

                if (this.product.startDate) {
                    this.product.startDate = this.formatDateToISO(this.product.startDate);
                }
                if (this.product.endDate) {
                    this.product.endDate = this.formatDateToISO(this.product.endDate);
                }

                this.logProduct();

                try {
                    let response = await axios.post('http://18.196.156.3:8080/api/auction/create-auction', this.product, {
                        headers: {
                            Authorization: `Bearer ${this.$store.state.token}`
                        }
                    });

                    console.log(response.data);
                    alert("Müzayede ürününüz başarıyla eklendi!");
                } catch (error) {
                    console.error(error);
                    alert("Bir hata oluştu");
                }
            }
        },
        beforeMount(){
            if(!this.$store.state.token){
                this.$router.push('/login');
            }
        }
    };
</script>

<style scoped>
    .add-product{
        width: 100%;
        display: flex;
        background-color: whitesmoke;
    }

    /* Form */

    .add-product > .form{
        width: 100%;
        padding: 0 250px 60px;
        /* background-color: yellow; */
    }

    .add-product > .form > h1{
        text-align: center;
        font-weight: 400;
        padding: 40px;
    }

    .add-product > .form > button{
        width: 180px;
        height: 50px;
        margin-top: 50px;
        font-size: 20px;
        font-weight: 500;
        display: flex;
        justify-content: center;
        align-items: center;
        justify-self: center;
        border: 1px solid #DE6449;
        border-radius: 5px;
        color: white;
        background-color: #DE6449;
        transition: 0.2s;
    }

    .add-product > .form > button:hover{
        border: 1px solid #DE6449;
        color: #DE6449;
        background-color: white;
    }

    .add-product > .form > form{
        padding: 20px 20px 40px;
        background-color: #e5e5e5;
    }

    .add-product > .form > form > div > label{
        font-size: 20px;
    }

    .image-preview {
        padding: 10px;
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        row-gap: 10px;
        flex-wrap: wrap;
        /* background-color: yellow; */
    }

    .preview-image {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border: 2px solid white;
    }

    #auction_product_gender{
        font-size: 18px;
    }
</style>