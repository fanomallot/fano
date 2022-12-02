import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    products: [],
    productInBag: []
  },
  mutations: {
    loadProducts(state, products) {
      state.products = products
    },

    loadBag(state, products ) {
      state.productInBag = products
    },

    addToBag(state, product) {
      state.productInBag.push(product)
      localStorage.setItem('productInBag', JSON.stringify(state.productInBag))
    },

    removeToBag(state, product) {
      if (confirm('Are you sure?')) {
        const index = state.productInBag.indexOf(product);
        state.productInBag.splice(index, 1)
        localStorage.setItem('productInBag', JSON.stringify(state.productInBag))
      }
    }
  },
  actions: {
    loadProducts({ commit }) {
      axios.get('https://fakestoreapi.com/products')
      .then(response => {
        commit('loadProducts', response.data)
      })
    },

    loadBag({ commit }) {
      if (localStorage.getItem('productInBag')) {
        commit('loadBag', JSON.parse(localStorage.getItem('productInBag')))
      }
    },

    addToBag({ commit }, product) {
      commit('addToBag', product)
    },

    removeToBag({ commit }, product) {
      commit('removeToBag', product)
    }
  },
  modules: {
  }
})
