<template>
    <div class="layout">
        <div id="payment-container" v-html="content"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            content: "", // Iyzico HTML içeriği burada saklanacak
            token: "",   // Token bilgisi burada saklanacak
        };
    },
    mounted() {
        this.initializePaymentContent();
    },
    methods: {
        initializePaymentContent() {
            // Query parametrelerinden `content` ve `token` değerlerini alıyoruz
            this.content = this.$route.query.content;
            this.token = this.$route.query.token;

            // Ödeme formunun bulunduğu container'ı seçiyoruz
            const paymentContainer = document.getElementById("payment-container");
            paymentContainer.innerHTML = this.content;

            // Tüm script etiketlerini seçip tarayıcıya manuel ekliyoruz
            const scripts = paymentContainer.querySelectorAll("script");

            scripts.forEach((script) => {
                const newScript = document.createElement("script");
                newScript.type = "text/javascript";

                if (script.src) {
                    // Eğer script bir src içeriyorsa, kaynağını ayarlıyoruz
                    newScript.src = script.src;
                    newScript.async = true;
                    newScript.defer = true;
                } else {
                    // Eğer inline script ise, içeriği ayarlıyoruz
                    newScript.innerHTML = script.innerHTML;
                }

                // Yeni script'i body'ye ekliyoruz
                document.body.appendChild(newScript);
            });

            console.log("Scripts injected successfully");
        },
    },
};
</script>

<style scoped>
    .layout{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: grey;
    }
</style>