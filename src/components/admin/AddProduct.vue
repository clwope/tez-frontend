<template>
    <div class="add-product">
        <sidebar></sidebar>

        <div class="form">

            <h1>Online Satış Ürünü Ekle</h1>

            <form class="row g-3">
                <div class="col-md-6">
                    <label for="product_brand" class="form-label">Marka</label>
                    <input type="text" class="form-control" id="product_brand" v-model="brand">
                </div>
                <div class="col-md-6">
                    <label for="product_model" class="form-label">Model</label>
                    <input type="text" class="form-control" id="product_model" v-model="model">
                </div>
                <div class="col-md-6">
                    <label for="product_case_color" class="form-label">Kasa Rengi</label>
                    <input type="text" class="form-control" id="product_case_color" v-model="caseColor">
                </div>
                <div class="col-md-6">
                    <label for="product_case_shape" class="form-label">Kasa Şekli</label>
                    <input type="text" class="form-control" id="product_case_shape" v-model="caseShape">
                </div>
                <div class="col-md-6">
                    <label for="product_cord_color" class="form-label">Kordon Rengi</label>
                    <input type="text" class="form-control" id="product_cord_color" v-model="cordColor">
                </div>
                <div class="col-md-6">
                    <label for="product_dial_color" class="form-label">Kadran Rengi</label>
                    <input type="text" class="form-control" id="product_dial_color" v-model="dialColor">
                </div>
                <div class="col-md-6">
                    <label for="product_gender" class="form-label">Cinsiyet</label>
                    <select class="form-select" id="product_gender" v-model="gender">
                        <option value="Unisex" selected>Unisex</option>
                        <option value="Erkek">Erkek</option>
                        <option value="Kadın">Kadın</option>
                    </select>
                    <!-- <input type="email" class="form-control" id="product_gender"> -->
                </div>
                <div class="col-md-6">
                    <label for="product_technology" class="form-label">Teknoloji</label>
                    <input type="text" class="form-control" id="product_technology" v-model="technology">
                </div>
                <div class="col-md-6">
                    <label for="product_price" class="form-label">Fiyat</label>
                    <input type="number" min="0" class="form-control" id="product_price" v-model="price">
                </div>
                <div class="col-md-6">
                    <label for="product_images" class="form-label">Ürün Resimleri</label>
                    <input type="file" class="form-control" id="product_images" @change="handleFileUpload" multiple>
                    <div class="image-preview">
                        <img v-for="(image, index) in previewImages" :key="index" :src="image" class="preview-image" />
                    </div>
                </div>
            </form>

            <button type="submit">Ürünü Ekle</button>

        </div>
    </div>
</template>

<script>
    export default {
  data() {
    return {
      previewImages: [], // Array to store image previews
      uploadedFiles: []  // Array to store the actual files
    };
  },
  methods: {
    handleFileUpload(event) {
      this.previewImages = []; // Clear existing previews
      this.uploadedFiles = []; // Clear existing files

      const files = event.target.files;

      Array.from(files).forEach(file => {
        this.uploadedFiles.push(file); // Store the file

        const reader = new FileReader();
        reader.onload = e => {
          this.previewImages.push(e.target.result); // Add preview image URL
        };
        reader.readAsDataURL(file); // Convert file to Data URL for preview
      });
    }
  }
};
</script>

<style scoped>
    .add-product{
        width: 100%;
        display: flex;
        background-color: whitesmoke;
    }

    /* Form */

    .add-product > .form{
        width: 100%;
        padding: 0 300px 60px;
        /* background-color: yellow; */
    }

    .add-product > .form > h1{
        text-align: center;
        font-weight: 400;
        padding: 40px;
    }

    .add-product > .form > button{
        width: 180px;
        height: 50px;
        margin-top: 50px;
        font-size: 20px;
        font-weight: 500;
        display: flex;
        justify-content: center;
        align-items: center;
        justify-self: center;
        border: 1px solid #DE6449;
        border-radius: 5px;
        color: white;
        background-color: #DE6449;
        transition: 0.2s;
    }

    .add-product > .form > button:hover{
        border: 1px solid #DE6449;
        color: #DE6449;
        background-color: white;
    }

    .add-product > .form > form{
        padding: 20px 20px 40px;
        background-color: #e5e5e5;
    }

    .add-product > .form > form > div > label{
        font-size: 20px;
    }

    .image-preview {
        padding: 10px;
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        row-gap: 10px;
        flex-wrap: wrap;
        /* background-color: yellow; */
    }

    .preview-image {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border: 2px solid white;
    }

    #product_gender{
        font-size: 18px;
    }
</style>