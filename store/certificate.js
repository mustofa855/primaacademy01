export const state = () => ({
  // store data
  cerficateId: null,
  competencyId: null,
  elementId: null,
  criteriaId: null,
})

export const mutations = {
  SET_CERFICATE_ID(state, payload) {
    state.cerficateId = payload
  },
  SET_COMPETENCY_ID(state, payload) {
    state.competencyId = payload
  },
  SET_ELEMENT_ID(state, payload) {
    state.elementId = payload
  },
  SET_CRITERIA_ID(state, payload) {
    state.criteriaId = payload
  },
}
