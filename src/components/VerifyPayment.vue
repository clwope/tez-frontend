<template>
    <div class="payment-success">
        <h2>Ödeme Başarılı</h2>
        <p>Ödemeniz başarıyla tamamlanmıştır. Teşekkür ederiz!</p>
        <router-link to='/'>Geri Dön</router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    }
};
</script>

<style scoped>
.payment-success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    font-family: Arial, sans-serif;
    font-size: 18px;
    margin: 20px auto;
    max-width: 500px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.payment-success > a{
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
    justify-self: center;
    background-color: #DE6449;
    transition: 0.2s;
}

.payment-success > a:hover{
    color: #DE6449;
    background-color: white;
    border: 1px solid #DE6449;
}
</style>