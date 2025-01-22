<template>
    <div class="auction-products">
        <sidebar></sidebar>

        <div class="table-div">

            <h1>Müzayede Ürünlerin</h1>

            <div class="table">

            </div>

        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { jwtDecode } from 'jwt-decode';

    export default {
        data() {
            return {
            
            }
        }
    };
</script>

<style scoped>
    .auction-products{
        width: 100%;
        display: flex;
        background-color: whitesmoke;
    }

    /* Form */

    .add-product > .table-div{
        width: 100%;
        display: flex;
        flex-direction: column;
        /* background-color: yellow; */
    }
</style>