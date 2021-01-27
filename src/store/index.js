import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cacheList: '',
        loading: 0
    },
    getters: {
        loading: state => state.loading
    },
    mutations: {
        setCacheList(state, listArray) {
            state.cacheList = listArray
        },
        SET_LOADING(state, status) {
            if (0 === status) {
                state.loading = 0
                return
            }
            state.loading = status ? ++state.loading : --state.loading
        },
    },
    actions: {
        SetLoading({ commit }, status) {
            commit('SET_LOADING', status)
        },
    }
})