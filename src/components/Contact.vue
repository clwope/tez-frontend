<template>
    <div class="contact-page">
      <div class="banner">
        <h1>İletişim</h1>
        <p>Bizimle iletişime geçmekten çekinmeyin!</p>
      </div>
  
      <div class="content">
        <section class="contact-info">
          <h2>İletişim Bilgileri</h2>
          <p>
            Herhangi bir sorunuz, öneriniz veya destek ihtiyacınız varsa bize ulaşabilirsiniz:
          </p>
          <ul>
            <li><strong>Email:</strong> support@winbid.com</li>
            <li><strong>Telefon:</strong> +90 555 555 5555</li>
            <li><strong>Adres:</strong> İstanbul, Türkiye</li>
          </ul>
        </section>
  
        <section class="contact-form">
          <h2>Bize Mesaj Gönderin</h2>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">Adınız:</label>
              <input type="text" id="name" v-model="form.name" placeholder="Adınızı girin" required />
            </div>
            <div class="form-group">
              <label for="email">Email Adresiniz:</label>
              <input type="email" id="email" v-model="form.email" placeholder="Email adresinizi girin" required />
            </div>
            <div class="form-group">
              <label for="message">Mesajınız:</label>
              <textarea id="message" v-model="form.message" placeholder="Mesajınızı yazın" rows="5" required></textarea>
            </div>
            <button type="submit">Gönder</button>
          </form>
        </section>
      </div>
    </div>
</template>

<script>
export default {
name: "ContactPage",
data() {
    return {
    form: {
        name: "",
        email: "",
        message: "",
    },
    };
},
methods: {
    submitForm() {
    // Form gönderim mantığını buraya ekleyebilirsiniz.
    console.log("Form gönderildi:", this.form);
    alert("Mesajınız başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz.");
    this.form.name = "";
    this.form.email = "";
    this.form.message = "";
    },
},
};
</script>

<style scoped>
.contact-page {
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

.content {
display: flex;
flex-direction: column;
gap: 40px;
}

.contact-info {
background-color: white;
padding: 20px;
border-radius: 10px;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.contact-info h2 {
font-size: 32px;
color: #de6449;
margin-bottom: 10px;
}

.contact-info p {
font-size: 18px;
line-height: 1.6;
}

.contact-info ul {
list-style-type: none;
padding: 0;
margin: 20px 0 0;
}

.contact-info ul li {
font-size: 18px;
margin-bottom: 10px;
}

.contact-info ul li strong {
color: #de6449;
}

.contact-form {
background-color: white;
padding: 20px;
border-radius: 10px;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.contact-form h2 {
font-size: 32px;
color: #de6449;
margin-bottom: 20px;
}

.form-group {
margin-bottom: 20px;
}

.form-group label {
display: block;
font-size: 18px;
margin-bottom: 8px;
}

.form-group input,
.form-group textarea {
width: 100%;
padding: 10px;
font-size: 16px;
border: 1px solid #ccc;
border-radius: 5px;
box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.1);
}

button {
background-color: #de6449;
color: white;
border: none;
padding: 12px 24px;
font-size: 18px;
border-radius: 5px;
cursor: pointer;
transition: background-color 0.3s ease;
}

button:hover {
background-color: white;
color: #de6449;
border: 1px solid #de6449;
}
</style>  