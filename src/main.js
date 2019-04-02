import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router/index'
import store from './store'
import * as firebase from 'firebase/app'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    var config = {
      apiKey: 'AIzaSyBDFpoc16FgmGfsqG6RRA5X8S5a-Y4Kc_4',
      authDomain: 'onlinestore-a7b77.firebaseapp.com',
      databaseURL: 'https://onlinestore-a7b77.firebaseio.com',
      projectId: 'onlinestore-a7b77',
      storageBucket: 'onlinestore-a7b77.appspot.com',
      messagingSenderId: '733342545836'
    }
    firebase.initializeApp(config)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
    this.$store.dispatch('fetchProducts')
  }
}).$mount('#app')
