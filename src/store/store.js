import Vue from 'vue'
import Vuex from 'vuex';
import Auth from '../helper/auth';
Vue.use(Vuex)

const auth = new Auth().login();


const state = {
    data: {
        status: '',
        token: localStorage.getItem('token') || '',
    }

};
const getters = {
    isLoggedIn: state => state.data.token,
    authStatus: state => state.data.status,
};
const mutations = {
    auth_request(state) {
        state.data.status = 'loading'
    },
    auth_success(state, token) {
        state.data.status = 'success'
        state.data.token = token
    },
    auth_error(state) {
        state.data.status = 'error'
    },
    logout(state) {
        state.data.status = ''
        state.data.token = ''
    },

};
const actions = {
    login({ commit }, user) {
        return new Promise((resolve, reject) => {
            commit('auth_request')
            auth.post("oauth/token", user)
            .then(resp => {
                let token = resp.data.access_token
                localStorage.setItem('token', token)
                commit('auth_success', token)
                resolve(resp)
            })
            .catch(err => {
                commit('auth_error')
                reject(err)
            })
            
        })

    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            localStorage.removeItem('token')
            delete auth.defaults.headers.common['Authorization']
            commit('logout')
            resolve()
        })
    }
}

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});

export default store;