export const state = () => ({
  // store data
  user: null,
  isAuth: false,
  role: null,
})

export const mutations = {
  SET_IS_AUTH(state, payload) {
    state.isAuth = payload
  },
  SET_ROLE(state, payload) {
    state.role = payload
  },
}

export const actions = {
  async nuxtServerInit({ commit }, context) {
    await commit('SET_IS_AUTH', context.app.$auth.$state.loggedIn)
    if (context.app.$auth.$state.user) {
      commit('SET_ROLE', context.app.$auth.$state.role)
    }
  },
  // async nuxtServerInit({ commit }, { req }) {
  //   await commit('SET_IS_AUTH', context.app.$auth.$state.loggedIn)
  //   if (req.session.user) {
  //     commit('setUser', req.session.user)
  //   }
  // }
}
