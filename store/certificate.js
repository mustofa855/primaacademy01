export const state = () => ({
  // store data
  certificateId: null,
  certificateName: null,
  certificateNumber: null,
  competencyId: null,
  elementId: null,
  criteriaId: null,
})

export const mutations = {
  SET_CERTIFICATE(state, payload) {
    state.certificateId = payload.id
    state.certificateNumber = payload.number
    state.certificateName = payload.name
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
