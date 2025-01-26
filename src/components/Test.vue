<template>
    <button @click="getOrders">Get Orders</button>
    <button @click="deleteProduct('70bd8673-4a0c-46e3-af45-818f67c4f468')">Delete Product</button>
</template>

<script>
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

    export default{
        data(){
            return{
                data: null
            }
        },
        methods: {
            async getOrders(){
                let response = await axios.get('http://18.196.156.3:8080/api/product/get-product-by-id', {
                    params: {
                        productId: "6f909f3e-c20b-4c2d-baa0-560d471bc5d6"
                    }
                });
                console.log(response.data);
            },
            async deleteProduct(id){
                let response = await axios.delete('http://18.196.156.3:8080/api/product/delete-product-by-id', {
                    headers: {
                        Authorization: `Bearer ${this.$store.state.token}`,
                        productId: id
                    }
                });
                console.log(response.data);
            }
        }
    }
</script>

<style scoped>

</style>