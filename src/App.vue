<template>
  <v-app>
    <Navbar/>
    <template v-if="error">
      <v-snackbar
              :multi-line="true"
              :timeout="5000"
              color="error"
              @input="closeError"
              :value="true"
      >
        {{ error }}
        <v-btn
                dark
                flat
                @click="closeError"
        >
          Close
        </v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  components: {
    Navbar
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    }
  }
}
</script>
