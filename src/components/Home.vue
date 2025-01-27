<template>
    <div class="home-page">

        <div id="carouselExampleCaptions" class="carousel slide">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="../assets/images/resim_2.png" class="d-block w-100">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Online Satış</h5>
                        <p>Ürülerinizi listeleyip satın veya hayalinizdeki ürünü satın alın.</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="../assets/images/resim_5.jpeg" class="d-block w-100">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Müzayede İmkanı</h5>
                        <p>Ürünlerinizi açık artırmalara koyup daha değerli bir şekilde satabilirsiniz!</p>
                    </div>
                </div>
                <div class="carousel-item">
                <img src="../assets/images/resim_3.png" class="d-block w-100">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>7/24 Destek</h5>
                        <p>Her hangi bir sorununuzda iletişim sayfasındaki bilgileri kullanarak bizimle iletişime geçebilirsiniz.</p>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>

        <div class="hr"></div>
        
        <div class="info-top">
            <div class="info">
                <i class="bi bi-truck"></i>
                <h3>Hızlı Teslimat</h3>
                <p>Güvenli ve hızlı teslimat imkanı!</p>
            </div>
            <div class="info">
                <i class="bi bi-box-seam"></i>
                <h3>Kargo Bedava</h3>
                <p>Tüm ürünlerde teslimat ücretsiz!</p>
            </div>
            <div class="info">
                <i class="bi bi-patch-check"></i>
                <h3>En İyi Kalite</h3>
                <p>Tüm ürünlerde en iyi kalite garantisi!</p>
            </div>
            <div class="info">
                <i class="bi bi-telephone"></i>
                <h3>7/24 Müşteri Hizmetleri</h3>
                <p>Haftanın her günü ve her saat müşteri desteği!</p>
            </div>
        </div>

        <div class="hr"></div>

        <div class="info-center">
            <div class="info-img">
                <img src="../assets/images/resim_1.jpg" alt="">
            </div>
            <div class="info">
                <h3>Müzayede İmkanı</h3>
                <p>
                    Belirli ürünlerde geçerli olan canlı müzayede özelliği sayesinde, 
                    beğendiğin ve ihtiyacın olan ürünler için dilediğin gibi teklif ver, 
                    diğer kullanıcılarla kıyasıya bir rekabete girerek en avantajlı fiyatı 
                    yakala ve hayalindeki ürüne zahmetsizce sahip ol! 
                    Bu eşsiz fırsat sayesinde hem heyecanın tadını çıkarabilir 
                    hem de bütçeni koruyarak istediğin ürünü satın almanın keyfini yaşayabilirsin.
                </p>
                <router-link to="/auction-shop">Müzayede</router-link>
            </div>
        </div>   
        
        <div class="hr"></div>

        <div class="info-bottom">
            <div class="info">
                <h3>Alışveriş Seçeneği</h3>
                <p>
                    İstediğin zaman, istediğin yerden, dilediğin ürüne kolayca sahip olma ayrıcalığını yaşa!
                    Online alışveriş sayesinde, zamandan ve mekândan bağımsız bir şekilde ihtiyacın olan her şeye
                    sadece birkaç tıkla ulaşabilir, güvenli ve hızlı bir şekilde siparişini tamamlayarak hayalindeki
                    ürünlere zahmetsizce sahip olmanın keyfini çıkarabilirsin.
                </p>
                <router-link to="/shop">Ürünler</router-link>
            </div>
            <div class="info-img">
                <img src="../assets/images/resim_3.png" alt="">
            </div>
        </div>

        <div class="hr"></div>

        <div class="testimonials">
            <h3>Kullanıcı Yorumları <i class="bi bi-megaphone"></i></h3>
            <Carousel v-bind="carouselConfig">
                <Slide v-for="(testimonial, index) in testimonials" :key="index">
                    <div class="carousel__item">
                        <img :src="testimonial.image">
                        <h4>{{ testimonial.author }}</h4>
                        <p>{{ testimonial.quote }}</p>
                    </div>
                </Slide>

                <template #addons>
                    <Navigation />
                    <Pagination />
                </template>
            </Carousel>
        </div>

    </div>
</template>

<script>
    import 'vue3-carousel/carousel.css'
    import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

    export default{
        components: {
            Carousel,
            Slide,
            Pagination,
            Navigation
        },
        data(){
            return{
                carouselConfig: {
                    wrapAround: true
                },
                testimonials: [
                    { quote: "İstediğim saatleri bulabiliyorum!", author: "Emre Demir", image: "/tez-frontend/images/user_img2.jpg" },
                    { quote: "Ürünümü müzayede sayesinde piyasasının üstünde satabildim.", author: "Zeynep Yıldız", image: "/tez-frontend/images/user_img.jpg" },
                    { quote: "Herkese öneriyorum admin paneli çok kullanışlı!!", author: "Murat Şahin", image: "/tez-frontend/images/user_img3.jpg" },
                ]
            }
        }
    }
</script>


<style scoped>
.home-page {
    width: 100%;
    background-color: whitesmoke;
}

/* Carousel */

.home-page > .carousel {
    width: 100%;
}

.home-page > .carousel > .carousel-inner > .carousel-item > img {
    max-height: 560px;
    object-fit: fill;
    object-position: center;
}

.home-page > .hr{
    max-width: 100%;
    margin: 0;
    padding: 0;
    height: 2px;
    background-color: black;
}

/* Info Top */

.info-top{
    width: 100%;
    height: 200px;
    display: flex;
    background-color: whitesmoke;
}

.info-top > .info{
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* background-color: greenyellow; */
}

.info-top > .info > i{
    font-size: 50px;
}

/* Info Center */

.info-center{
    max-width: 100%;
    height: 500px;
    display: flex;
    background-color: whitesmoke;
}

.info-center > .info-img{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 40px;
    background-color: antiquewhite;
}

.info-center > .info-img > img{
    width: 580px;
    height: 400px;
    object-fit: fill;
}

.info-center > .info{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
}

.info-center > .info > h3{
    font-size: 38px;
    font-weight: 500;
}

.info-center > .info > p{
    font-size: 20px;
    padding: 0 30px;
}

.info-center > .info > a{
    text-decoration: none;
    color: white;
    width: 110px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    border-radius: 5px;
    border: 1px solid white;
    background-color: #DE6449;
}

.info-center > .info > a:hover{
    color: #DE6449;
    background-color: white;
    border: 1px solid #DE6449;
}

/* Info Bottom */

.info-bottom{
    max-width: 100%;
    height: 500px;
    display: flex;
    background-color: whitesmoke;
}

.info-bottom > .info-img{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 40px;
    background-color: antiquewhite;
}

.info-bottom > .info-img > img{
    width: 580px;
    height: 400px;
    object-fit: fill;

}

.info-bottom > .info{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
}

.info-bottom > .info > h3{
    font-size: 38px;
    font-weight: 500;
}

.info-bottom > .info > p{
    font-size: 20px;
    padding: 0 30px;
}

.info-bottom > .info > a{
    text-decoration: none;
    color: white;
    width: 110px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    border-radius: 5px;
    border: 1px solid white;
    background-color: #DE6449;
}

.info-bottom > .info > a:hover{
    color: #DE6449;
    background-color: white;
    border: 1px solid #DE6449;
}

/* Testimonials */

.testimonials{
    max-width: 100%;
    padding: 40px 0 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: whitesmoke;
}

.testimonials h3{
    margin: 0 0 60px 0;
    padding: 0;
    font-size: 36px;
    font-weight: 400;
    color: #DE6449;
}

.testimonials > .carousel{
    width: 720px;
    height: 400px;
    border-radius: 8px;
    outline: 2px solid black;
    overflow: visible;
    /* background-color: aqua; */
}

.carousel__slide{
    height: 400px;
    /* background-color: red; */
}

.carousel__item{
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 6px;
    align-items: center;
    border-radius: 8px;
    background-color: antiquewhite;
}

.carousel__item img{
    width: 180px;
    height: 180px;
    margin-top: -20px;
    margin-bottom: 6px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid white;
    /* background-color: aqua; */
}

.carousel__item h4{
    margin: 0;
    padding: 0;
    font-weight: 300;
    color: black;
    /* background-color: yellow; */
}

.carousel__item p{
    margin: 0;
    padding: 0;
    font-size: 20px;
    color: black;
    font-style: italic;
    /* background-color: aquamarine; */
}

:deep(.carousel){
    --vc-nav-width: 60px;
    --vc-nav-height: 60px;
    --vc-nav-color: black;
    --vc-pgn-height: 8px;
    --vc-pgn-width: 20px;
    --vc-pgn-active-color: black;
}


</style>
  