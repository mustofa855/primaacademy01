export const state = () => ({
  // store data
  certificateId: null,
  certificateName: null,
  certificateNumber: null,
  competencyId: null,
  competencyName: null,
  competencyNumber: null,
  elementId: null,
  criteriaId: null,
})

export const mutations = {
  SET_CERTIFICATE(state, payload) {
    state.certificateId = payload.id
    state.certificateNumber = payload.number
    state.certificateName = payload.name
  },
  SET_COMPETENCY(state, payload) {
    state.competencyId = payload.id
    state.competencyName = payload.title
    state.competencyNumber = payload.code
  },
  SET_ELEMENT_ID(state, payload) {
    state.elementId = payload
  },
  SET_CRITERIA_ID(state, payload) {
    state.criteriaId = payload
  },
}
