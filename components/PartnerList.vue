<template>
    <div>
        <title-bar :title="title" />
        <table class="w-full border-collapse">
            <link href="https://fonts.googleapis.com/css2?family=Your+Selected+Font&display=swap" rel="stylesheet">
            <thead>
                <tr class="bg-gray-100">
                    <th class="py-2 px-4 text-left">Nomor</th>
                    <th class="py-2 px-4 text-left">Nama file</th>
                    <th class="py-2 px-4 text-left">Type</th>
                    <th class="py-2 px-4 text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-t">
                    <td class="py-2 px-4">ABC</td>
                    <td class="py-2 px-4">DEF</td>
                    <td class="py-2 px-4">GHI</td>
                    <td class="py-2 px-4">
                        <button class="text-blue-500 mr-2"  @click="toPage('/verification/partner-list/partner-verify')">
                            <img :src="(`/${icon_Part}`)" class="m-auto w-8" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script>
import TitleBar from '~/components/TitleBar.vue'
export default {
    // components: { KunciButton },
  props: {
    /**
     * icon from static folder use the extension name
     * @type {String}
     * @default paper.svg
     */
    icon_Doc: {
      type: String,
      default: 'paper.svg',
    },
    icon_Part: {
      type: String,
      default: 'eyeClick.svg',
    },
    to: {
      type: String,
      default: '',
    },
  },
  methods: {
    toPage(route) {
      
      this.$router.push(route)
      // Implement your navigation logic here using the 'route' prop
      // For example, you can use Vue Router to navigate to the specified route.
    },
  },
    components: { TitleBar },
    layout: 'admin',
    data() {
        return {
            title: 'Partner Verification',
            subtitle: new Date(),
        }
    },
}
</script>
  