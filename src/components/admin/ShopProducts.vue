<template>
    <div class="products">
        <sidebar></sidebar>

        <div class="table-div">

            <h1>Online Satış Ürünlerim</h1>

                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Marka</th>
                            <th scope="col">Model</th>
                            <th scope="col">Cinsiyet</th>
                            <th scope="col">Teknoloji</th>
                            <th scope="col">Stok Adedi</th>
                            <th scope="col">Stok Kodu</th>
                            <th scope="col">Düzenle</th>
                            <th scope="col">Sil</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product, index) in products" :key="index">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{product.brand}}</td>
                            <td>{{product.model}}</td>
                            <td>{{product.gender}}</td>
                            <td>{{product.technology}}</td>
                            <td>{{product.stockCount}}</td>
                            <td>{{product.sku}}</td>
                            <td><button class="update-btn" @click="updateProduct(product.id)">Düzenle</button></td>
                            <td><button class="delete-btn" @click="deleteProduct(product.id)">Sil</button></td>
                        </tr>
                    </tbody>
                </table>

        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { jwtDecode } from 'jwt-decode';

    export default {
        data() {
            return {
                products: []
            }
        },
        methods: {
            async getProducts(){
                try {
                    let userId = jwtDecode(this.$store.state.token).Id;
                    let response = await axios.get('http://18.196.156.3:8080/api/product/get-product-list', {
                        params: {
                            page: 1,
                            pageSize: 36
                        }
                    })
                    console.log(response.data.data);


                    let filteredProducts = response.data.data.filter((product) => product.userId === userId);
                    console.log(filteredProducts);

                    this.products = filteredProducts;

                } catch (error) {
                    console.error(error);
                }
            },
            async deleteProduct(id){
                try {
                    let token = this.$store.state.token;
                    let response = await axios.delete('http://18.196.156.3:8080/api/product/delete-product-by-id', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            productId: id
                        }
                    })

                    alert("Seçtiğiniz ürün başarıyla silindi");
                    this.$router.go(0);
                } catch (error) {
                    console.error(error);
                    alert("Bir hata oluştu")
                }
            },
            async updateProduct(id){
                this.$router.push(`/admin/update-product/${id}`)
            }
        },
        mounted(){
            this.getProducts();
        },
        beforeMount(){
            if(!this.$store.state.token){
                this.$router.push('/login');
            }
        }
    };
</script>

<style scoped>
    .products{
        width: 100%;
        display: flex;
        background-color: whitesmoke;
    }

    /* Form */

    .products > .table-div{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 30px;
        padding: 30px 60px;
        /* background-color: yellow; */
    }

    .products > .table-div > h1{
        font-weight: 400;
        text-align: center;
    }

    .products > .table-div > .table{
        border: 1px solid black;
    }

    .products > .table-div > .table > thead > tr > th{
        font-weight: 500;
        font-size: 18px;
    }

    .products > .table-div > .table > tbody > tr > td > button.update-btn{
        width: 80px;
        height: 30px;
        font-weight: 500;
        color: white;
        background-color: orange;
        border-radius: 5px;
        border: none;
        transition: 0.2s;
    }

    .products > .table-div > .table > tbody > tr > td > button.update-btn:hover{
        background-color: white;
        color: orange;
        border: 1px solid orange;
    }

    .products > .table-div > .table > tbody > tr > td > button.delete-btn{
        width: 50px;
        height: 30px;
        font-weight: 500;
        color: white;
        background-color: red;
        border-radius: 5px;
        border: none;
        transition: 0.2s;
    }

    .products > .table-div > .table > tbody > tr > td > button.delete-btn:hover{
        background-color: white;
        color: red;
        border: 1px solid red;
    }
</style>