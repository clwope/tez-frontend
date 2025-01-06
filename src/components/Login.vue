<template>
    <div class="login-form">
        <h2>{{formHeader}}</h2>
        <form v-if="formType === 'login'" @submit.prevent="">
            <div>
                <label for="email">Email: </label>
                <input type="email" id="email" v-model="loginData.email" required />
            </div>
            <div>
                <label for="password">Password: </label>
                <input type="password" id="password" v-model="loginData.password" required />
            </div>
            <div class="buttons">
                <button type="submit">Login</button>
                <button type="button" @click="changeFormToSignIn">Sign In</button>
            </div>
        </form>

        <form v-else @submit.prevent="">
            <div>
                <label for="name">Name: </label>
                <input type="name" id="name" v-model="SignInData.name" required />
            </div>
            <div>
                <label for="surname">Surname: </label>
                <input type="surname" id="surname" v-model="SignInData.surname" required />
            </div>
            <div>
                <label for="email">Email: </label>
                <input type="email" id="email" v-model="SignInData.email" required />
            </div>
            <div>
                <label for="password">Password: </label>
                <input type="password" id="password" v-model="SignInData.password" required />
            </div>
            <div class="buttons">
                <button type="submit">Sign In</button>
                <button type="button" @click="changeFormToLogin">Login</button>
            </div>
        </form>
    </div>
</template>

<script>
    // import axios from 'axios';

    export default{
        data(){
            return{
                loginData: {
                    email: '',
                    password: ''
                },
                SignInData:{
                    name: '',
                    surname: '',
                    email: '',
                    password: ''
                },
                formType: 'login',
                formHeader: 'Login'
            }
        },
        methods: {
            // async handleLogin(){
            //     try {
            //         let response = await axios.post('http://localhost:5216/login', {
            //             email: this.loginData.email,
            //             password: this.loginData.password,
            //         })

            //         // console.log(jwtDecode(response.data.token));
            //         localStorage.setItem("token", response.data.token);
            //         window.location.href = "/dashboard";

            //     } catch (error) {
            //         alert("Incorrect password or email!");
            //         console.log(error);
            //     }
            // },
            // async handleSignIn(){
            //     try {
            //         let response = await axios.post('http://localhost:5216/signup', {
            //             name: this.SignInData.name,
            //             surname: this.SignInData.surname,
            //             email: this.SignInData.email,
            //             password: this.SignInData.password,
            //         })

            //         localStorage.setItem("token", response.data.token);
            //         window.location.href = "/dashboard";

            //     } catch (error) {
            //         console.log(error);
            //     }
            // },
            changeFormToSignIn(){
                this.formType = 'signin';
                this.formHeader = 'Sign In';
            },
            changeFormToLogin(){
                this.formType = 'login';
                this.formHeader = 'Login';
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
        width: 60%;
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