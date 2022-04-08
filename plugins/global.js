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


  /**
   * get province
   * @param {number} page
   */
  const getProvince = async (page = 1) => {
    await context.$axios.$get('village/province', {
      params: {
        page
      }
    }).then((response) => {
      return response.data;
    })
  }
  inject('getProvince', getProvince)

  /**
   * get city
   * @param {*} provinceId
   */
  const getCity = async (provinceId) => {
    await context.$axios.$get('village/province', {
      params: {
        province_id: provinceId
      }
    }).then((response) => {
      return response.data;
    })
  }
  inject('getCity', getCity)
}
