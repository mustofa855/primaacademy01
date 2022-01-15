<template>
  <div class="relative">
    <!-- <div class="font-bold">{{ label }}</div> -->
    <!-- <div class="flex items-center relative">
      <input
        class="form-select py-2 px-4 my-1 border border-gray-200 block w-full rounded-md transition focus:ring focus:ring-primary outline-none"
        list="datalist"
        :placeholder="placeholder"
        :value="searchInput"
        @blur="hideDataList"
        @input="$emit('search', $event.target.value); showList = true; searchInput = $event.target.value"
        @click="showList = true"
      />

      <mdi:search class="w-max m-2 absolute right-1" />
    </div>-->
    <!-- this input using vue formulate -->
    <FormulateInput
      v-model="value"
      type="text"
      :label="label"
      :placeholder="placeholder"
      validation="required"
      error-behavior="live"
      @input="$emit('search', $event); showList = true; searchInput = $event; log($event); startLoading();"
      @blur-context="hideDataList(); clearLoading()"
      @click.prevent="showList = true; $emit('click', $event); startLoading()"
    />
    <!-- containter data list-->
    <div
      class="bg-white top-3/4 shadow-lg z-10 rounded border-primary border-2 mx-auto max-h-xs overflow-auto w-full absolute transition-all"
      :class="showList ? 'block' : 'hidden'"
    >
      <div v-if="options.length > 0">
        <p
          v-for="(item, index) in options"
          :key="index"
          class="w-full hover:bg-primary cursor-pointer hover:text-white p-2 transition duration-200 ease-out"
          @click="updateValue(item.value, item.label)"
        >{{ options.length > 0 ? item.label : 'Data tidak ditemukan' }}</p>
      </div>
      <div v-if="isLoading" class="m-4 flex justify-center justify-items-center items-center">
        <div
          class="ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8 border-t-primary animate-spin"
        ></div>
        <p class="font-semibold mx-2">Tunggu Sebentar</p>
      </div>
      <div v-else>
        <p class="w-full text-center p-2 transition duration-200 ease-out">Data Tidak Ditemukan</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Cari data ...',
    },
    options: {
      type: Array,
      default: () => [],
    },
    timeOut: {
      type: Number,
      default: 3000,
    },
  },
  data() {
    return {
      showList: false,
      searchInput: '',
      value: '',
      isLoading: false,
    }
  },
  watch: {
    options: {
      handler(e) {
        if (e.length > 0) {
          this.clearLoading()
        } else {
          this.startLoading()
        }
      },
      deep: true
    },
    value: {
      handler(e) {
        this.startLoading()
      }
    }
  },
  methods: {
    /**
     * if isDatalist is true, then use event for set new value
     * @param value $event
     */
    updateValue(value, searchValue) {
      // eslint-disable-next-line no-console
      console.log(value)
      this.value = value
      this.showList = false
      this.searchInput = searchValue
      this.$emit('selected', value)
    },
    hideDataList() {
      setTimeout(() => {
        this.showList = false
      }, 1)
    },
    log(e) {
      // eslint-disable-next-line no-console
      console.log(e);
    },
    startLoading() {
      this.isLoading = true
      setTimeout(() => {
        this.clearLoading()
      }, this.timeOut);
    },
    clearLoading() {
      clearTimeout();
      this.isLoading = false;
    }
  },
}
</script>
