<template>
    <div class="about-page">
      <div class="banner">
        <h1>Hakkımızda</h1>
        <p>WinBid: Müzayedede Kazanmanın Adı!</p>
      </div>
  
      <div class="content">
        <section class="mission">
          <h2>Misyonumuz</h2>
          <p>
            WinBid olarak, kullanıcıların online müzayedelerle en iyi teklifleri vererek hayallerindeki ürünlere kolayca
            ulaşmalarını sağlamak için çalışıyoruz. Güvenilir bir platform oluşturmak, tüm kullanıcılarımız için
            şeffaf, kolay ve keyifli bir deneyim sunmak en büyük önceliğimizdir.
          </p>
        </section>
  
        <section class="services">
          <h2>Hizmetlerimiz</h2>
          <ul>
            <li>Online canlı müzayede katılımı</li>
            <li>Geniş ürün yelpazesi ve kaliteli ürün seçenekleri</li>
            <li>7/24 müşteri hizmetleri desteği</li>
            <li>Şeffaf ve güvenli teklif verme sistemi</li>
          </ul>
        </section>
  
        <section class="values">
          <h2>Değerlerimiz</h2>
          <p>
            Şeffaflık, güvenilirlik ve müşteri memnuniyeti, WinBid'in temel değerlerini oluşturur. 
            Amacımız, kullanıcılarımıza adil bir müzayede ortamı sunarak en iyi deneyimi yaşatmaktır.
          </p>
        </section>

      </div>
    </div>
</template>

<script>
export default {
name: "AboutPage",
};
</script>

<style scoped>
.about-page {
font-family: Arial, sans-serif;
background-color: whitesmoke;
padding: 20px;
}

.banner {
text-align: center;
background-color: #de6449;
color: white;
padding: 40px 20px;
border-radius: 10px;
margin-bottom: 30px;
}

.banner h1 {
margin: 0;
font-size: 48px;
font-weight: lighter;
}

.banner p {
margin: 10px 0 0;
font-size: 20px;
font-style: italic;
}

.content section {
margin-bottom: 30px;
padding: 20px;
background-color: white;
border-radius: 10px;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.content h2 {
font-size: 32px;
color: #de6449;
margin-bottom: 10px;
}

.content p {
font-size: 18px;
line-height: 1.6;
}

.content ul {
list-style-type: disc;
padding-left: 20px;
}

.content ul li {
font-size: 18px;
margin-bottom: 10px;
}

.contact strong {
color: #de6449;
}
</style>
  