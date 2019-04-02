<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text-secondary mb-3">Create New Product</h1>
                <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                        class="mb-3"
                >
                    <v-text-field
                            name="title"
                            label="Title"
                            type="text"
                            v-model="title"
                            :rules="[v => !!v || 'Title is require']"
                            required
                    ></v-text-field>
                    <v-text-field
                            name="vendor"
                            label="Vendor Product"
                            type="text"
                            v-model="vendor"
                    ></v-text-field>
                    <v-text-field
                            name="color"
                            label="Color Product"
                            type="text"
                            v-model="color"
                    ></v-text-field>
                    <v-text-field
                            name="material"
                            label="Material Product"
                            type="text"
                            v-model="material"
                    ></v-text-field>
                    <v-text-field
                            name="price"
                            label="Price Product"
                            type="text"
                            v-model="price"
                            :rules="[v => !!v || 'Price is require']"
                            required
                    ></v-text-field>
                    <v-textarea
                            name="description"
                            label="Description Product"
                            v-model="description"
                    ></v-textarea>
                </v-form>
                <v-layout class="mb3">
                    <v-flex xs12>
                        <v-btn class="warning" @click="uploadImg">
                            Upload
                            <v-icon gight dark>cloud_upload</v-icon>
                        </v-btn>
                        <input
                            ref="fileInput"
                            type="file"
                            style="display: none"
                            accept="image/*"
                            @change="onFileChange"
                        >
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex xs12>
                        <img :src="imageSrc" alt="" height="200" v-if="imageSrc">
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex xs12>
                        <v-switch
                                color="primary"
                                v-model="promo"
                                label="Add to Promo?"
                        ></v-switch>
                    </v-flex>
                </v-layout>
                <v-layout class="mb3">
                    <v-spacer></v-spacer>
                    <v-flex xs12>
                        <v-btn
                                :loading="loading"
                                :disabled="!valid || !image || loading"
                                class="success"
                                @click="createProduct"
                        >
                            Create Product
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      vendor: '',
      color: '',
      material: '',
      price: 0,
      description: '',
      promo: false,
      valid: false,
      image: null,
      imageSrc: ''
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    createProduct () {
      if (this.$refs.form.validate() && this.image) {
        const product = {
          title: this.title,
          vendor: this.vendor,
          color: this.color,
          material: this.material,
          description: this.description,
          price: this.price,
          promo: this.promo,
          image: this.image
        }
        this.$store.dispatch('createProduct', product)
          .then(() => {
            this.$router.push('/list')
          })
          .catch(() => {})
      }
    },
    uploadImg () {
      this.$refs.fileInput.click()
    },
    onFileChange () {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = e => {
        this.imageSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.image = file
    }
  }
}
</script>

<style scoped>

</style>
