import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // menu: localStorage.getItem('menu'),
    remember: sessionStorage.getItem('remember')
  },
  mutations: {
    [types.Rem]: (state, data) => {
      // console.log(data)
      sessionStorage.remember = data
      state.remember = data
    }
  }
})

export default store
