<template>

</template>

<script>
import axios from 'axios';

    export default{
        data(){
            return {
                orderId: this.$store.state.orderId,
                IyzicoToken: this.$store.state.IyzicoToken
            }   
        },
        methods: {
            async verifyPayment(){
                let reqBody = {
                    orderId: this.orderId,
                    IyzicoToken: this.IyzicoToken,
                }

                console.log(reqBody);

                let response = await axios.post('http://18.196.156.3:8080/api/iyzico/verify-payment', reqBody);

                console.log(response.data);
            }
        },
        mounted(){
            this.verifyPayment();
        }
    }
</script>

<style scoped>

</style>