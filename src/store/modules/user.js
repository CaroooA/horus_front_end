import { login } from '@/api/user'

const getDefaultState = () => {
  return {
    id: '',
    name: ''
  }
}

const state = {
  id: '',
  name: ''
}

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_NAME: (state, name) => {
    state.name = name
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), pwd: password, role: '管理员' }).then(response => {
        const { data } = response
        commit('SET_ID', data.userid)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
