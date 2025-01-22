<template>
    <div class="products">
        <sidebar></sidebar>

        <div class="table-div">

            <h1>Online Satış Ürünlerin</h1>

                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th>3</th>
                            <td>Larry the Bird</td>
                            <td>@twitter</td>
                            <td>@facebook</td>
                        </tr>
                    </tbody>
                </table>

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
    .products{
        width: 100%;
        display: flex;
        background-color: whitesmoke;
    }

    /* Form */

    .products > .table-div{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 30px;
        padding: 30px 60px;
        /* background-color: yellow; */
    }

    .products > .table-div > h1{
        text-align: center;
    }

    .products > .table-div > .table{
        border: 1px solid black;
    }
</style>