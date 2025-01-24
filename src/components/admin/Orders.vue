<template>
    <div class="orders">
        <sidebar></sidebar>

        <div class="table-div">

            <h1>Şiparişlerim</h1>

                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Şipariş ID</th>
                            <th scope="col">Detay</th>
                            <th scope="col">Ücret</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(order, index) in orders" :key="index">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{order.orderId}}</td>
                            <td>{{order.details}}</td>
                            <td>{{parseFloat(order.price).toFixed(2)}} TL</td>
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
                    let response = await axios.get('http://18.196.156.3:8080/api/order/get-all-order-by-active', {
                        params: {
                            page: 1,
                            pageSize: 36,
                            isDeleted: false
                        },
                        headers: {
                            Authorization: `Bearer ${this.$store.state.token}`,
                            userId: jwtDecode(this.$store.state.token).Id,
                        }
                    });

                    let confOrders = response.data.data.map((item) => {
                        let details = item.orderDetailModels.map((data) => {
                            return `${data.brand} ${data.model} (x${data.quantity})`;
                        }).join(', ')

                        let price = item.orderDetailModels.reduce((total, data) => total + (data.price * data.quantity), 0);

                        return {
                            orderId: item.orderId,
                            details,
                            price
                        };
                    })

                    console.log(response.data.data);

                    this.orders = confOrders;

                    console.log(this.orders);
                } catch (error) {
                    console.error(error);
                    alert("Bir hata oluştu");
                }
            }
        },
        mounted(){
            this.getOrders();
        },
        beforeMount(){
            if(!this.$store.state.token){
                this.$router.push('/login');
            }
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