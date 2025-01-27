<template>
    <div class="products">
        <sidebar></sidebar>

        <div class="table-div">

            <h1>Müzayede Ürünlerim</h1>

                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Marka</th>
                            <th scope="col">Model</th>
                            <th scope="col">Cinsiyet</th>
                            <th scope="col">Teknoloji</th>
                            <th scope="col">Başlangıç Fiyatı</th>
                            <th scope="col">En Yüksek Teklif</th>
                            <th scope="col">Başlangıç Zamanı</th>
                            <th scope="col">Bitiş Zamanı</th>
                            <th scope="col">Ürüne Git</th>
                            <th scope="col">Sil</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product, index) in products" :key="index">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{product.productDto.brand}}</td>
                            <td>{{product.productDto.model}}</td>
                            <td>{{product.productDto.gender}}</td>
                            <td>{{product.productDto.technology}}</td>
                            <td>{{(product.startingPrice).toFixed(2)}} TL</td>
                            <td>{{(product.highestBid).toFixed(2)}} TL</td>
                            <td>{{formatDate(product.auctionStartDate)}}</td>
                            <td>{{formatDate(product.auctionEndDate)}}</td>
                            <td><button class="get-btn" @click="goToProduct(product.productDto.id)">Ürüne Git</button></td>
                            <td><button class="delete-btn" @click="deleteAuctionProduct(product.auctionId)" :disabled="product.auctionEnded === true">Sil</button></td>
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
            async getAuctionProducts(){
                try {
                    let userId = jwtDecode(this.$store.state.token).Id;
                    let response = await axios.get('http://18.196.156.3:8080/api/auction/get-auctions-by-userid', {
                        headers: {
                            userId: userId,
                            Authorization: `Bearer ${this.$store.state.token}`
                        }
                    })
                    console.log(response.data.data);

                    this.products = response.data.data;

                } catch (error) {
                    console.error(error);
                }
            },
            async deleteAuctionProduct(id){
                try {
                    let token = this.$store.state.token;
                    let response = await axios.delete('http://18.196.156.3:8080/api/auction/delete-auction', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            auctionId: id
                        }
                    })

                    console.log(response.data)

                    alert("Seçtiğiniz ürün başarıyla silindi");
                    this.$router.go(0);
                } catch (error) {
                    console.error(error);
                    alert("Bir hata oluştu")
                }
            },
            formatDate(dateString) {
                const date = new Date(dateString);
                date.setHours(date.getHours() + 3);
                const year = date.getUTCFullYear();
                const month = String(date.getUTCMonth() + 1).padStart(2, "0");
                const day = String(date.getUTCDate()).padStart(2, "0");
                const hours = String(date.getUTCHours()).padStart(2, "0");
                const minutes = String(date.getUTCMinutes()).padStart(2, "0");

                return `${year}-${month}-${day} ${hours}:${minutes}`;
            },
            goToProduct(id){
                this.$router.push(`/auction-product/${id}`);
            }
        },
        mounted(){
            this.getAuctionProducts();
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

    .products > .table-div > .table > tbody > tr > td > button.get-btn{
        width: 80px;
        height: 30px;
        font-weight: 500;
        color: white;
        background-color: green;
        border-radius: 5px;
        border: none;
        transition: 0.2s;
    }

    .products > .table-div > .table > tbody > tr > td > button.get-btn:hover{
        background-color: white;
        color: green;
        border: 1px solid green;
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