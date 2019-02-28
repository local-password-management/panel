import Vue from 'vue'
import Vuex from 'vuex';
import Auth from '../helper/auth';
Vue.use(Vuex)

const auth = new Auth().Login();
const api = new Auth().Api();


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
    Login({ commit }, user) {
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
    Logout({ commit }) {
        return new Promise((resolve, reject) => {
            localStorage.removeItem('token')
            delete auth.defaults.headers.common['Authorization']
            commit('logout')
            resolve()
        })
    },
    GetFields({commit},params){
        return new Promise((resolve, reject) => {
            api.get("fields?project_id=" + params)
                .then(res => {
                    resolve(res)
                })
                .catch(err =>{
                    reject(err)
                });
        });
    },
    AddField({commit},data){
        return new Promise((resolve, reject) => {
            api.post("fields",data)
                .then(res => {
                    resolve(res)
                })
                .catch(err =>{
                    reject(err)
                });
        });
    },
    GetGroupFields({commit}){
        return new Promise((resolve, reject) => {
            api.get("field-groups")
                .then(res => {
                    resolve(res)
                })
                .catch(err =>{
                    reject(err)
                });
        });
    },
    GetAllData({commit}){
        return new Promise((resolve, reject) => {
            api.get("projects")
                .then(res => {
                    resolve(res)
                })
                .catch(err =>{
                    reject(err)
                });
        });
    },
    GetData({commit},params) {
        return new Promise((resolve, reject) => {
            api.get("projects/" + params)
                .then(res => {
                    resolve(res)
                })
                .catch(err =>{
                    reject(err)
                });
        });
    },
    UpdateData({commit},setParam){
        return new Promise((resolve, reject) => {
            api.put("projects/" + setParam.params, setParam.data)
            .then(res => {
              resolve(res);
            })
            .catch(err => {
              reject(err);
            });
        });
    }
}

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});

export default store;