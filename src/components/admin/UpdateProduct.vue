<template>
    <div class="add-product">
        <sidebar></sidebar>

        <div class="form">

            <h1>Online Satış Ürünü Güncelle</h1>

            <form class="row g-3">
                <div class="col-md-6">
                    <label for="product_brand" class="form-label">Marka</label>
                    <input type="text" class="form-control" id="product_brand" v-model="product.brand">
                </div>
                <div class="col-md-6">
                    <label for="product_model" class="form-label">Model</label>
                    <input type="text" class="form-control" id="product_model" v-model="product.model">
                </div>
                <div class="col-md-6">
                    <label for="product_case_color" class="form-label">Kasa Rengi</label>
                    <input type="text" class="form-control" id="product_case_color" v-model="product.caseColor">
                </div>
                <div class="col-md-6">
                    <label for="product_case_shape" class="form-label">Kasa Şekli</label>
                    <input type="text" class="form-control" id="product_case_shape" v-model="product.caseShape">
                </div>
                <div class="col-md-6">
                    <label for="product_cord_color" class="form-label">Kordon Rengi</label>
                    <input type="text" class="form-control" id="product_cord_color" v-model="product.bandColor">
                </div>
                <div class="col-md-6">
                    <label for="product_dial_color" class="form-label">Kadran Rengi</label>
                    <input type="text" class="form-control" id="product_dial_color" v-model="product.dialColor">
                </div>
                <div class="col-md-6">
                    <label for="product_gender" class="form-label">Cinsiyet</label>
                    <select class="form-select" id="product_gender" v-model="product.gender">
                        <option value="Unisex" selected>Unisex</option>
                        <option value="Erkek">Erkek</option>
                        <option value="Kadın">Kadın</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label for="product_technology" class="form-label">Teknoloji</label>
                    <input type="text" class="form-control" id="product_technology" v-model="product.technology">
                </div>
                <div class="col-md-6">
                    <label for="product_sku" class="form-label">Stok Kodu</label>
                    <input type="text" class="form-control" id="product_sku" v-model="product.sku">
                </div>
                <div class="col-md-6">
                    <label for="product_price" class="form-label">Fiyat</label>
                    <input type="number" min="0" class="form-control" id="product_price" placeholder="1699.90" v-model="product.price">
                </div>
                <div class="col-md-6">
                    <label for="product_stok_count" class="form-label">Stok Adedi</label>
                    <input type="number" min="1" class="form-control" id="product_stok_count" v-model="product.stockCount">
                </div>
                <div class="col-md-6">
                    <!-- <label for="product_images" class="form-label">Ürün Resimleri</label>
                    <input type="file" class="form-control" id="product_images" @change="handleFileUpload" multiple> -->
                    <div class="image-preview">
                        <img v-for="(image, index) in previewImages" :key="index" :src="image" class="preview-image" />
                    </div>
                </div>
            </form>

            <button type="submit" @click="updateProduct">Ürünü Güncelle</button>

        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { jwtDecode } from 'jwt-decode';

    export default {
        data() {
            return {
                productId: this.$route.params.id,
                previewImages: [],
                product: {
                    name: 'Ürün İsmi',
                    description: 'abc',
                    price: null,
                    sku: null,
                    brand: null,
                    model: null,
                    caseColor: null,
                    caseShape: null,
                    bandColor: null,
                    dialColor: null,
                    gender: null,
                    technology: null,
                    isAvailable: true,
                    stockCount: null,
                    productImages: null,
                    userId: null,
                    categoryId: "3deabc52-a8e6-47df-a211-fac748c6c979"
                }
            };
        },
        methods: {
            logProduct(){
                console.log(this.product);
            },
            async updateProduct(){
                try {
                    this.logProduct();

                    let response = await axios.put('http://18.196.156.3:8080/api/product/update-product', {productDto: this.product},
                        {
                            headers: {
                                Authorization: `Bearer ${this.$store.state.token}`
                            }
                        }
                    );

                    console.log(response.data);
                    alert("Ürününüz başarıyla güncellendi!");
                    this.$router.push('/admin/products');
                } catch (error) {
                    console.error(error);
                    alert("Bir hata oluştu");
                }
            },
            async getProduct(){
                let response = await axios.get('http://18.196.156.3:8080/api/product/get-product-by-id', {
                    params: {
                        productId: this.productId
                    }
                })
                console.log(response.data.data)

                this.product = response.data.data

                let tempImages = this.product.productImages
                this.previewImages = tempImages.map((image) => image.path)
                console.log(this.previewImages);
            }
        },
        mounted(){
            this.getProduct();
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

    #product_gender{
        font-size: 18px;
    }
</style>