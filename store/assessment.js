// assessemnt store

// state
export const state = () => ({
  // store data
  assessmentId: null,
  assessmentName: null,
  studentId: null,
})

export const mutations = {
  SET_ASSESSMENT(state, payload) {
    state.assessmentId = payload.id
    state.assessmentName = payload.name
  },
  SET_STUDENT(state, payload) {
    state.studentId = payload.id
  },
}
