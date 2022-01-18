export default (context, inject) => {
  const excerpt = (string, limit) =>
    string.length > limit ? (string || '').substring(0, limit) + '…' : string
  // Inject $excerpt(msg) in Vue, context and store.
  inject('excerpt', excerpt)
  // For Nuxt <= 2.12, also add 👇
  context.$excerpt = excerpt
}
