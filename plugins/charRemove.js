export default (context, inject) => {
  /**
   *
   * @param {*} string
   * @returns
   */
  const charRemove = (string) => {
    return string.replace(/[^a-zA-Z0-9]/g, ' ');
  }

  // Inject $excerpt(msg) in Vue, context and store.
  inject('charRemove', charRemove)
  // For Nuxt <= 2.12, also add 👇
}
