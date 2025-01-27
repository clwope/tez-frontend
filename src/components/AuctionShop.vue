<template>
    <div class="shop">

        <div class="banner">
            <h2>Müzayede Ürünleri</h2>
            <p>Müzayedelere katılın ve istediğiniz ürünü kazanmak için en iyi teklifinizi yapın!</p>
        </div>

        <div class="products">
            <div v-if="products" class="product-card" v-for="(product, index) in products" :key="index">
                <img :src="product.productDto.productImages[0].path">
                <div class="description">
                    <h3>{{product.productDto.brand}}</h3>
                    <h4>{{product.productDto.model}}</h4>
                    <hr>
                    <h5>Başlangıç Fiyatı: {{(product.startingPrice).toFixed(2)}} TL</h5>
                    <button @click="goToProduct(product.auctionId)">Teklif Ver</button>
                </div>
            </div>
            <div v-else><h3>Şu anda aktif müzayede yok...</h3></div>
        </div>

    </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      products: [], // Ürün listesi
      connection: null, // SignalR bağlantısı
    };
  },
  methods: {
    async getAuctionProducts(){
        let response = await axios.get('http://18.196.156.3:8080/api/auction/get-all-active-auctions')

        this.products = response.data.data;

        // console.log(response.data);
        console.log(this.products);
    },
    // SignalR bağlantısını kur
    startSignalRConnection() {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl("http://18.196.156.3:8080/auctionHub")
        .withAutomaticReconnect()
        .build();

      // SignalR bağlantısını başlat
      this.connection
        .start()
        .then(() => {
          console.log("SignalR bağlantısı kuruldu.");

          // Aktif müzayedeleri dinle
          this.connection.on("ReceiveAllActiveAuctions", (data) => {
            console.log("Aktif müzayedeler güncellendi:", data);
                this.products = data;
          });
        })
        .catch((err) => console.error("SignalR bağlantı hatası:", err));
    },
    goToProduct(id){
        if(!this.$store.state.token){
            alert("Önce giriş yapmanız gerekiyor.");
            return;
        }
        this.$router.push(`/auction-product/${id}`);
    }
  },
  mounted() {
    this.getAuctionProducts();
    this.startSignalRConnection(); // SignalR bağlantısını başlat
  },
  beforeDestroy() {
    if (this.connection) {
      this.connection.stop(); // Bileşen yok edilmeden önce bağlantıyı durdur
    }
  },
};
</script>

<style scoped>

    .shop{
        width: 100%;
        background-color: whitesmoke;
    }

    /* Banner */

    .shop > .banner{
        width: 100%;
        height: 140px;
        background-color: lightgray;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .shop > .banner > p{
        font-size: 18px;
        font-style: italic;
    }

    /* Products */

    .shop > .products{
        width: 100%;
        padding: 30px 80px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); /* Adjust to fit the screen */
        justify-items: center;
        gap: 60px 30px;
        /* background-color: aquamarine; */
    }

    .shop > .products > .product-card{
        width: 340px;
        height: 400px;
        border: 1px solid black;
    }

    .shop > .products > .product-card > img{
        width: 100%;
        height: 60%;
        display: block;
        object-fit: cover;
    }

    .shop > .products > .product-card > .description{
        width: 100%;
        height: 40%;
    }

    .shop > .products > .product-card > .description > h3{
        margin: 0;
        padding: 5px 0;
        text-align: center;
        font-weight: 500;
        font-size: 22px;
    }

    .shop > .products > .product-card > .description > hr{
        margin: 0;
    }

    .shop > .products > .product-card > .description > h4{
        margin: 0 0 10px 0;
        text-align: center;
        padding-left: 10px;
        font-weight: 400;
        font-size: 18px;
    }

    .shop > .products > .product-card > .description > h5{
        margin: 5px 0 10px 0;
        text-align: center;
        font-weight: 500;
        font-size: 20px;
        font-style: italic;
        color: black;
    }

    .shop > .products > .product-card > .description > button{
        display: flex;
        justify-self: center;
        justify-content: center;
        align-items: center;
        background-color: #DE6449;
        color: white;
        border: 1px solid white;
        width: 128px;
        height: 36px;
        border-radius: 2px;
        transition: 0.2s;
        font-size: 18px;
    }

    .shop > .products > .product-card > .description > button:hover{
        background-color: white;
        color: #DE6449;
        border: 1px solid #DE6449;
    }

</style>