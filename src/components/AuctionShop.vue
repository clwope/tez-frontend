<template>
    <div class="shop">

        <div class="banner">
            <h2>Müzayede Ürünleri</h2>
            <p>Müzayedelere katılın ve istediğiniz ürünü kazanmak için en iyi teklifinizi yapın!</p>
        </div>

        <!-- <div class="options">
            <div class="filter">
                <button class="filter-btn" @click="toggleFilter">Filtrele <i class="bi bi-funnel"></i></button>

                <div class="filter-modal" v-if="isFilterVisible">
                    <div class="filter-content">
                        <h3>Ürünleri Filtrele</h3>
                        <div class="hr"></div>
                        
                        <div class="filter-group">
                            <h4>Marka</h4>

                            <div class="inputs">
                                <div class="input-box">
                                    <input type="checkbox" value="Brand-One"> <span>Brand-One</span>
                                </div>

                                <div class="input-box">
                                    <input type="checkbox" value="Brand-Two"> <span>Brand-Two</span>
                                </div>

                                <div class="input-box">
                                    <input type="checkbox" value="Brand-Three"> <span>Brand-Three</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="filter-group">
                            <h4>Kordon Rengi</h4>

                            <div class="inputs">
                                <div class="input-box">
                                    <input type="checkbox" value="Black"> <span>Black</span>
                                </div>

                                <div class="input-box">
                                    <input type="checkbox" value="White"> <span>White</span>
                                </div>

                                <div class="input-box">
                                    <input type="checkbox" value="Red"> <span>Red</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="filter-group">
                            <h4>Kasa Rengi</h4>

                            <div class="inputs">
                                <div class="input-box">
                                    <input type="checkbox" value="Silver"> <span>Silver</span>
                                </div>

                                <div class="input-box">
                                    <input type="checkbox" value="Gold"> <span>Gold</span>
                                </div>

                                <div class="input-box">
                                    <input type="checkbox" value="Black"> <span>Black</span>
                                </div>

                                <div class="input-box">
                                    <input type="checkbox" value="Silver"> <span>Silver</span>
                                </div>

                                <div class="input-box">
                                    <input type="checkbox" value="Gold"> <span>Gold</span>
                                </div>
                            </div>
                        </div>

                        <div class="buttons">
                            <button>Filtrele</button>
                            <button @click="toggleFilter">Kapat</button>
                        </div>

                    </div>
                </div>
                <div class="filter-backdrop" v-if="isFilterVisible" @click="toggleFilter"></div>
            </div>

            <div class="sort">
                <button class="sort-btn" @click="toggleSort">Sırala <i class="bi bi-filter"></i></button>

                <div class="sort-modal" v-if="isSortVisible">
                    <div class="sort-content">
                        <h3>Ürünleri Sırala</h3>
                        <div class="hr"></div>

                        <div class="sort-group">
                            <h4>Başlangıç Fiyatı</h4>

                            <div class="inputs">
                                <div class="input-box">
                                    <input type="radio" value="Yüksekten düşüğe" name="sorts.price"> <span>Yüksekten düşüğe</span>
                                </div>

                                <div class="input-box">
                                    <input type="radio" value="Düşükten yükseğe" name="sorts.price"> <span>Düşükten yükseğe</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="buttons">
                            <button>Sırala</button>
                            <button @click="toggleSort">Kapat</button>
                        </div>
                    </div>
                </div>
                <div class="sort-backdrop" v-if="isSortVisible" @click="toggleSort"></div>
            </div>
        </div> -->

        <div class="products">
            <div class="product-card" v-for="(product, index) in products" :key="index">
                <img :src="product.img">
                <div class="description">
                    <h3>{{product.name}} - $275.00</h3>
                    <h4>{{product.model}}</h4>
                    <hr>
                    <h5>Son Teklif: {{product.price}}</h5>
                    <button>Teklif Ver</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
// import axios from "axios";

export default {
  data() {
    return {
      products: [], // Ürün listesi
      connection: null, // SignalR bağlantısı
    };
  },
  methods: {
    // SignalR bağlantısını başlat
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
            // this.products = data.map((auction) => ({
            //   img: "/path/to/default/image.jpg", // Örnek resim
            //   name: auction.productName,
            //   model: auction.productModel,
            //   highestBid: auction.highestBid || auction.startingPrice,
            //   price: `${auction.startingPrice} TL`,
            // }));
          });

          // Son teklif güncellemelerini dinle
        //   this.connection.on("ReceiveAllActiveAuctionBind", (data) => {
        //     console.log("Son teklif güncellendi:", data);
        //     const auction = this.products.find(
        //       (product) => product.id === data.auctionId
        //     );
        //     if (auction) {
        //       auction.highestBid = data.bidAmount;
        //     }
        //   });
        })
        .catch((err) => console.error("SignalR bağlantı hatası:", err));
    },
  },
  mounted() {
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

    /* Options */

    .shop > .options{
        width: 100%;
        height: 60px;
        padding: 0 280px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: antiquewhite;
    }

    .shop > .options > .filter > .filter-btn{
        width: 140px;
        height: 30px;
        background-color: black;
        color: white;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        font-size: 16px;
    }

    .shop > .options > .filter > .filter-btn > i{
        margin-top: 2px;
    }

    .shop > .options > .filter > .filter-btn:hover{
        background-color: white;
        color: black;
        border: 1px solid black;
    }

    .shop > .options > .sort > .sort-btn{
        width: 140px;
        height: 30px;
        background-color: black;
        color: white;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        font-size: 16px;
    }

    .shop > .options > .sort > .sort-btn > i{
        margin-top: 2px;
    }

    .shop > .options > .sort > .sort-btn:hover{
        background-color: white;
        color: black;
        border: 1px solid black;
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
        color: green;
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

    /* Filter Modal */

    .filter-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
    }

    .filter-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 500px;
        height: 100vh;
        background-color: white;
        z-index: 1100;
        overflow-y: scroll;
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
    }

    .filter-modal .buttons{
        width: 100%;
        padding: 10px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 40px;
        /* background-color: #DE6449; */
    }

    .filter-modal .buttons button {
        width: 180px;
        height: 40px;
        font-size: 18px;
        background-color: black;
        color: white;
        border: none;
        cursor: pointer;
        transition: 0.2s;
    }

    .filter-modal .buttons button:nth-of-type(2) {
        background-color: red;
    }

    .filter-modal .buttons button:hover {
        background-color: white;
        color: black;
        border: 1px solid black;
    }

    .filter-modal .buttons button:nth-of-type(2):hover {
        background-color: white;
        color: red;
        border: 1px solid red;
    }

    .filter-content {
        padding: 20px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        /* background-color: aquamarine; */
    }

    .filter-content h3{
        margin: 0 0 5px 0;
    }

    .filter-content .hr{
        width: 100%;
        margin: 0;
        padding: 0;
        height: 1px;
        background-color: black;
    }

    .filter-group{
        width: 100%;
        padding: 10px 20px;
        /* background-color: blueviolet; */
    }

    .filter-group h4{
        /* background-color: yellow; */
        margin: 0 0 10px 0;
    }

    .filter-group .inputs{
        width: 100%;
        padding: 5px 10px;
        display: flex;
        flex-wrap: wrap;
        column-gap: 20px;
        row-gap: 14px;
        /* background-color: yellowgreen; */
    }

    .filter-group .inputs .input-box{
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 6px;
        font-size: 18px;
        /* background-color: tomato; */
    }

    .filter-group .inputs .input-box input{
        width: 18px;
        height: 18px;
        cursor: pointer;
    }

    /* Sort Modal */

    .sort-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5); /* Shadow effect */
        z-index: 1000;
    }

    .sort-modal {
        position: fixed;
        top: 0;
        right: 0;
        width: 500px;
        height: 100vh;
        background-color: white;
        z-index: 1100;
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
    }

    .sort-content {
        padding: 20px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        /* background-color: aquamarine; */
    }

    .sort-modal .buttons{
        width: 100%;
        padding: 10px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 40px;
        /* background-color: #DE6449; */
    }

    .sort-modal .buttons button {
        width: 180px;
        height: 40px;
        font-size: 18px;
        background-color: black;
        color: white;
        border: none;
        cursor: pointer;
        transition: 0.2s;
    }

    .sort-modal .buttons button:nth-of-type(2) {
        background-color: red;
    }

    .sort-modal .buttons button:hover {
        background-color: white;
        color: black;
        border: 1px solid black;
    }

    .sort-modal .buttons button:nth-of-type(2):hover {
        background-color: white;
        color: red;
        border: 1px solid red;
    }

    .sort-content h3{
        margin: 0 0 5px 0;
    }

    .sort-content .hr{
        width: 100%;
        margin: 0;
        padding: 0;
        height: 1px;
        background-color: black;
    }

    .sort-group{
        width: 100%;
        padding: 10px 20px;
        /* background-color: blueviolet; */
    }

    .sort-group h4{
        /* background-color: yellow; */
        margin: 0 0 10px 0;
    }

    .sort-group .inputs{
        width: 100%;
        padding: 5px 10px;
        display: flex;
        flex-wrap: wrap;
        column-gap: 20px;
        row-gap: 14px;
        /* background-color: yellowgreen; */
    }

    .sort-group .inputs .input-box{
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 6px;
        font-size: 18px;
        /* background-color: tomato; */
    }

    .sort-group .inputs .input-box input{
        width: 18px;
        height: 18px;
        cursor: pointer;
    }

</style>