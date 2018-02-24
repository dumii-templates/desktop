import Vue from 'vue'
import Vuex from 'vuex'
import { moduleRoutes } from '@/view/public/routes'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    activeMenu: '',
    menus: moduleRoutes,
    sides: []
  },
  mutations: {
    changeMenu (state, name) {
      state.activeMenu = name
    },
    setSides (state, sides) {
      state.sides = sides
    }
  }
})

export default store
