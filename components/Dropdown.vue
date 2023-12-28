<template>
    <div :class="headaudience">
      <div v-if="label" class="font-medium mb-2 text-tiga">
        {{label}} <span class="text-[#DF4B61] font-semibold" v-if="required && required === true">*</span>
      </div>
      <button @click="toggleDropdown" class="cursor-pointer w-full text-black placeholder-enam border border-enam rounded-smplus flex justify-between items-center py-3.5 pl-5 pr-2.5">
        <div v-if="placeholder" class="text-start truncate ">{{ selected !== null ? selected.name : placeholder }}</div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" :class="toggle ? 'rotate-180 ' : '' " class="w-6 h-6 transition-all">
          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
        </svg>
      </button>
      <div v-if="toggle" v-click-outside="closeDropdown" class="relative z-10">
        <div class="absolute bg-white shadow-none lg:shadow-md rounded-md text-sm w-full border-none lg:border border-gray-50 text-black text-left">
          <div v-for="(item, index) in opsi" :key="'opsi' + index" @click="pilihOpsi(item)" class="py-2 px-4 lg:px-5 cursor-pointer hover:bg-gray-50">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['value', 'opsi', 'headaudience', 'label', 'placeholder', 'required'],
    data() {
      return {
        selected: null,
        toggle: false
      }
    },
    computed: {
      lang() {
        return this.$i18n.locale
      },
      bahasa() {
        return this.$i18n.locale === 'id' ? 0 : 1
      }
    },
    methods: {
      toggleDropdown() {
        this.toggle = !this.toggle; // Setel nilai toggle berdasarkan kondisi saat tombol diklik
      },
      closeDropdown() {
        this.toggle = false;
      },
      pilihOpsi(item) {
        this.selected = item;
        this.$emit('input', item.id);
        this.closeDropdown(); // Menutup dropdown setelah memilih opsi
      }
    }
  };
  </script>
  