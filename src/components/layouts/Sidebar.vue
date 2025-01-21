<template>
    <div class="sidebar">
        <router-link to="/admin/home">Ana Sayfa</router-link>
        <a href="">Online Satış Ürünleri</a>
        <a href="">Müzayede Ürünleri</a>
        <a href="">Siparişlerim</a>
    </div>
</template>

<script>

</script>

<style scoped>
    .sidebar{
        width: 280px;
        min-height: 100vh;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;
        background-color: #DE6449;
    }

    .sidebar > a{
        text-decoration: none;
        color: white;
        font-size: 20px;
        font-weight: 400;
    }

    .sidebar > a:hover{
        color: lightgrey;
    }
</style>