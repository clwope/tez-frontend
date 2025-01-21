<template>
    <div class="login-form">
        <h2>{{formHeader}}</h2>
        <form v-if="formType === 'login'" @submit.prevent="">
            <div>
                <label for="email">E-posta: </label>
                <input type="email" id="email" v-model="loginData.email" required />
            </div>
            <div>
                <label for="password">Şifre: </label>
                <input :type="showPassword ? 'text' : 'password'" id="password" v-model="loginData.password" required />
            </div>
            <label>
                <input type="checkbox" v-model="showPassword" /> Şifreyi Göster
            </label>
            <div class="buttons">
                <button type="submit" @click="handleLogin">Giriş Yap</button>
                <button type="button" @click="changeFormToSignIn">Kayıt Ol</button>
            </div>
        </form>

        <form v-else @submit.prevent="">
            <div>
                <label for="name">Kullanıcı İsmi: </label>
                <input type="text" id="name" v-model="SignInData.username" required />
            </div>
            <div>
                <label for="email">E-posta: </label>
                <input type="email" id="email" v-model="SignInData.email" required />
            </div>
            <div>
                <label for="phoneNumber">Telefon Numarası: </label>
                <input type="text" id="phoneNumber" v-model="SignInData.phoneNumber" required />
            </div>
            <div>
                <label for="password">Şifre: </label>
                <input :type="showPassword ? 'text' : 'password'" id="password" v-model="SignInData.password" required />
            </div>
            <label>
                <input type="checkbox" v-model="showPassword" /> Şifreyi Göster
            </label>
            <div class="buttons">
                <button type="submit" @click="handleSignIn">Kayıt Ol</button>
                <button type="button" @click="changeFormToLogin">Giriş Yap</button>
            </div>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default{
        data(){
            return{
                loginData: {
                    email: '',
                    password: ''
                },
                SignInData:{
                    username: '',
                    email: '',
                    phoneNumber: '',
                    password: ''
                },
                formType: 'login',
                formHeader: 'Giriş Yap',
                showPassword: false
            }
        },
        methods: {
            async handleLogin(){
                try {
                    let response = await axios.post('http://18.196.156.3:8080/api/user/user-login', {
                        email: this.loginData.email,
                        password: this.loginData.password,
                    })

                    console.log(response.data);

                } catch (error) {
                    alert("Incorrect password or email!");
                    console.log(error);
                }
            },
            async handleSignIn(){
                try {
                    let response = await axios.post('http://18.196.156.3:8080/api/user/user-register', {
                        name: this.SignInData.username,
                        email: this.SignInData.email,
                        phoneNumber: this.SignInData.phoneNumber,
                        password: this.SignInData.password,
                    })

                    console.log(response.data);

                } catch (error) {
                    console.log(error);
                }
            },
            changeFormToSignIn(){
                this.formType = 'signin';
                this.formHeader = 'Kayıt ol';
            },
            changeFormToLogin(){
                this.formType = 'login';
                this.formHeader = 'Giriş Yap';
            }
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap');

    .login-form{
        width: 100%;
        height: 100%;
        padding: 60px 0 110px;
        background-color: whitesmoke;
    }

    .login-form > h2{
        font-family: "Oswald";
        font-optical-sizing: auto;
        font-style: normal;
        font-size: 40px;
        text-align: center;
        color: green;
        margin-top: 0;
        margin-bottom: 20px;
        /* background-color: red */
    }

    .login-form > form{
        width: 580px;
        padding: 30px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;
        justify-self: center;
        background-color: #e5e5e5;
    }

    .login-form > form > div{
        width: 72%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        /* background-color: whitesmoke; */
    }

    .login-form > form > div > label{
        font-family: "Oswald";
        font-optical-sizing: auto;
        font-style: normal;
        font-size: 25px;
        font-weight: 400;
    }

    .login-form > form > div > input{
        width: 240px;
        height: 100%;
        font-family: "Oswald";
        font-optical-sizing: auto;
        font-style: normal;
        font-size: 20px;
    }

    .login-form > form > .buttons{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 60px;
    }

    .login-form > form > .buttons > button{
        width: 120px;
        height: 40px;
        font-family: "Oswald";
        font-optical-sizing: auto;
        font-style: normal;
        font-size: 20px;
        font-weight: 500;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: black;
        color: white;
        border: none;
    }

    .login-form > form > .buttons > button:hover{
        background-color: white;
        color: black;
        border: 1px solid black;
        cursor: pointer;
    }
</style>