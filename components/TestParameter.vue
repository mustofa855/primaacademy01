<template>
    <div>
        <title-bar :title="title" />
        <div class="flex">
            <!-- Card Klub -->
            <div class=" hover:bg-gray-100 duration-200 ease-out transition max-w-xs w-80 bg-white p-4 shadow-md rounded-lg mr-4 flex items-center cursor-pointer"
                :class="to === '/test-parameter' ? 'cursor-pointer' : ''" @click="toPage('/test-parameter/pemain')">
                <!-- icon  -->
                <div class="bg-primary rounded-full w-12 h-12 flex mr-4">
                    <img :src="(`/${icon_Partner}`)" class="m-auto w-8" />
                </div>
                <h2 class="font-bold text-xl cursor-pointer">Pemain</h2>
            </div>
    
            <!-- Card Pelatih  -->
            <div class="hover:bg-gray-100 duration-200 ease-out transition max-w-xs w-80 bg-white p-4 shadow-md rounded-lg flex items-center cursor-pointer"
                :class="to === '/test-parameter' ? 'cursor-pointer' : ''" @click="toPage('/test-parameter/pelatih')">
                <!-- icon   -->
                <div class="bg-primary rounded-full w-12 h-12 flex mr-4">
                    <img :src="(`/${icon_Part}`)" class="m-auto w-8" />
                </div>
                <h2 class="font-bold text-xl cursor-pointer"><a href=""></a>Pelatih</h2>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  // components: { KunciButton },
  props: {
    /**
     * Title of the card
     * @type {String}
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * icon from static folder use the extension name
     * @type {String}
     * @default paper.svg
     */
    icon_Partner: {
      type: String,
      default: 'group_club.svg',
    },
    icon_Part: {
      type: String,
      default: 'coach.svg',
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
}
</script>

<style>

</style>