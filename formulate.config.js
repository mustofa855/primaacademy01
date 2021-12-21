// formulate.config.js
// import { de } from '@braid/vue-formulate-i18n'

export default {
  // plugins: [de],
  // locale: 'de',
  rules: {
    foobar: ({ value }) => ['foo', 'bar'].includes(value),
  },
  classes: {
    outer: '!mb-4',
    input:
      'border border-gray-400 rounded px-3 py-2 leading-none focus:border-primary outline-none border-box w-full duration-200 ease-out transition',
    label: 'font-semibold',
    errors: 'text-danger',
  },
}
