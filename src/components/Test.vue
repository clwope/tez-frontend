<template>
    <button @click="getProducts">Get Products</button>
    <button @click="deleteProduct('70bd8673-4a0c-46e3-af45-818f67c4f468')">Delete Product</button>
</template>

<script>
import axios from 'axios';

    export default{
        data(){
            return{
                data: null
            }
        },
        methods: {
            async getProducts(){
                let response = await axios.get('http://18.196.156.3:8080/api/product/get-product-list', {
                    headers: {
                        Authorization: `Bearer ${this.$store.state.token}`
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