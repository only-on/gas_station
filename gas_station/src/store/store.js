import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    station: sessionStorage.getItem('station'),
    remember: sessionStorage.getItem('remember')
  },
  mutations: {
    [types.Station]: (state, data) => {
      // console.log(data)
      sessionStorage.station = data
      state.station = data
    },
    [types.Rem]: (state, data) => {
      // console.log(data)
      sessionStorage.remember = data
      state.remember = data
    }
  }
})

export default store
