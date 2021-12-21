export const state = () => ({
  // store data
  user: null,
  isAuth: false,
})

export const mutations = {
  SET_IS_AUTH(state, payload) {
    state.isAuth = payload
  },
}

export const actions = {
  async nuxtServerInit({ commit }, { req, context }) {
    await commit('SET_IS_AUTH', context.app.$auth.$state.loggedIn)
    if (req.session.user) {
      commit('setUser', req.session.user)
    }
  },
}
