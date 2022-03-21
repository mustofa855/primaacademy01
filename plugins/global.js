export default (context, inject) => {
  /**
   *
   * @param {*} string
   * @returns
   */
  const errorMessages = (string) => {
    const error = string.map((e) => `<div>${e.msg}</div><br>`)

    let errorMsg = ''
    error.forEach((element) => {
      errorMsg += element
    })

    return errorMsg
  }

  // Inject $excerpt(msg) in Vue, context and store.
  inject('errorMessages', errorMessages)
  // For Nuxt <= 2.12, also add 👇
}
