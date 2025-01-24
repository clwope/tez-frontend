<template>
    <div class="orders">
        <sidebar></sidebar>

        <div class="table-div">

            <h1>Online Satış Ürünlerin</h1>

                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Şipariş ID</th>
                            <th scope="col">Model</th>
                            <th scope="col">Cinsiyet</th>
                            <th scope="col">Teknoloji</th>
                            <th scope="col">Stok Adedi</th>
                            <th scope="col">Stok Kodu</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(order, index) in orders" :key="index">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{order.orderId}}</td>
                            <td>{{order.model}}</td>
                            <td>{{order.gender}}</td>
                            <td>{{order.technology}}</td>
                            <td>{{order.stockCount}}</td>
                            <td>{{order.sku}}</td>
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
                orders: []
            }
        },
        methods: {
            async getOrders(){
                try {
                    let response = await axios.get('http://18.196.156.3:8080/api/order/get-all-orders', {
                        params: {
                            page: 1,
                            pageSize: 36
                        },
                        headers: {
                            Authorization: `Bearer ${this.$store.state.token}`,
                            userId: jwtDecode(this.$store.state.token).Id,
                        }
                    });
                    console.log(response.data);
                    this.orders = response.data.data;
                } catch (error) {
                    console.error(error);
                    alert("Bir hata oluştu");
                }
            }
        },
        mounted(){
            this.getOrders();
        }
    };
</script>

<style scoped>
    .orders{
        width: 100%;
        display: flex;
        background-color: whitesmoke;
    }

    /* Form */

    .orders > .table-div{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 30px;
        padding: 30px 60px;
        /* background-color: yellow; */
    }

    .orders > .table-div > h1{
        font-weight: 400;
        text-align: center;
    }

    .orders > .table-div > .table{
        border: 1px solid black;
    }

    .orders > .table-div > .table > thead > tr > th{
        font-weight: 500;
        font-size: 18px;
    }
</style>