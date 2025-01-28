<template>
    <div class="products">
        <sidebar></sidebar>

        <div class="table-div">

            <h1>Katıldığım ve Sonuçlanan Müzayedeler</h1>

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
                            <th scope="col">Kazandınız</th>
                            <th scope="col">Ödeme Yap</th>
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
                            <td><button class="get-btn" @click="goToProduct(product.auctionId)">Ürüne Git</button></td>
                            <td>{{product.isUserWinner ? "Evet" : "Hayır"}}</td>
                            <td><button v-if="product.isUserWinner === true && product.isOrderPay === false" class="pay-btn" @click="createOrder(product)">Öde</button></td>
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
            async getBids(){
                try {
                    let userId = jwtDecode(this.$store.state.token).Id;
                    let response = await axios.get('http://18.196.156.3:8080/api/auction/get-user-auctions-if-bid-on-auction', {
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
            async createOrder(product){
                if (!this.isTokenValid(this.$store.state.token)) {
                    alert("Oturum süresi doldu. Lütfen yeniden giriş yapın.");
                    return;
                }

                if(this.$store.state.token){
                    let userId = jwtDecode(this.$store.state.token).Id;

                    console.log(product);

                    let order = { userId: userId, createBasketItemDtos: [{productId: product.productDto.id, quantity: 1}], isAuctionProductOrder: true, auctionId: product.auctionId };

                    console.log(order);

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
                            price: product.highestBid,
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

                        // localStorage.removeItem('cart');

                        this.$router.push({path: '/payment', query: {content: iyzicoScript, token: iyzicoToken}});

                        // alert("başarılı");

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
            this.getBids();
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

    .products > .table-div > .table > tbody > tr > td > button.pay-btn{
        width: 80px;
        height: 30px;
        font-weight: 500;
        color: white;
        background-color: rgb(255, 102, 0);
        border-radius: 5px;
        border: none;
        transition: 0.2s;
    }

    .products > .table-div > .table > tbody > tr > td > button.pay-btn:hover{
        background-color: white;
        color: rgb(255, 102, 0);
        border: 1px solid rgb(255, 102, 0);
    }
</style>