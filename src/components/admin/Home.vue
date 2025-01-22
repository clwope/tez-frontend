<template>
    <div class="admin-home">

        <sidebar></sidebar>

        <main>
            <h2>Hoşgeldiniz {{username}}!</h2>
            <h3>Toplam Ürünleriniz: 12</h3>
            <h3>Online Satış Ürünleri: <a href="">8</a></h3>
            <h3>Müzayede Ürünleri: <a href="">4</a></h3>

            <div class="buttons">
                <router-link to="/admin/add-product">Online Satış Ürünü Ekle</router-link>
                <router-link to="/admin/add-auction-product">Müzayede Ürünü Ekle</router-link>
            </div>
        </main>

    </div>
</template>

<script>
    import axios from 'axios';
    import { jwtDecode } from 'jwt-decode';

    export default {
        data(){
            return {
                username: ''
            }
        },
        methods: {
            async getUserData(){
                let userId = jwtDecode(this.$store.state.token).Id;
                console.log(userId)
                let response = await axios.get('http://18.196.156.3:8080/api/user/get-user-by-id', {
                    headers: {
                        Authorization: `Bearer ${this.$store.state.token}`,
                        userId: userId
                    }
                });
                console.log(response.data);

                this.username = response.data.data.userName;

                console.log(this.username)
            }
        },
        mounted(){
            this.getUserData();
        }
    }
</script>

<style scoped>
    .admin-home{
        width: 100%;
        display: flex;
        background-color: whitesmoke;
    }

    /* Main */

    .admin-home > main{
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .admin-home > main > h2{
        text-align: center;
        padding: 30px 0 60px;
    }

    .admin-home > main > h3{
        font-weight: 400;
        padding: 0 0 0 30px;
    }

    .admin-home > main > h3 > a{
        text-decoration: none;
        color: white;
        color: #4361ee;
    }

    .admin-home > main > .buttons{
        display: flex;
        padding: 80px 0 40px;
        justify-content: center;
        align-items: center;
        column-gap: 180px;
        /* background-color: yellow; */
    }

    .admin-home > main > .buttons > a{
        text-decoration: none;
        color: white;
        font-size: 20px;
        padding: 12px;
        border-radius: 8px;
        border: 1px solid #DE6449;
        background-color: #DE6449;
        transition: 0.2s;
    }

    .admin-home > main > .buttons > a:hover{
        color: #DE6449;
        background-color: white;
    }
</style>