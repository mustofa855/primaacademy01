<template>
    <div class="flex flex-wrap">
        <div class="w-full">
            <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row sm:gap-y-2">
                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                        v-on:click="toggleTabs(1)"
                        v-bind:class="{ 'text-gray-900 bg-white': openTab !== 1, 'text-white bg-red-700': openTab === 1 }">
                        Teknik
                    </a>
                </li>
                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                        v-on:click="toggleTabs(2)"
                        v-bind:class="{ 'text-gray-900 bg-white': openTab !== 2, 'text-white bg-red-700': openTab === 2 }">
                        Fisik
                    </a>
                </li>
                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                        v-on:click="toggleTabs(3)"
                        v-bind:class="{ 'text-gray-900 bg-white': openTab !== 3, 'text-white bg-red-700': openTab === 3 }">
                        Taktik : Attacking
                    </a>
                </li>
                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                        v-on:click="toggleTabs(4)"
                        v-bind:class="{ 'text-gray-900 bg-white': openTab !== 4, 'text-white bg-red-700': openTab === 4 }">
                        Taktik : Defending
                    </a>
                </li>
                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                        v-on:click="toggleTabs(5)"
                        v-bind:class="{ 'text-gray-900 bg-white': openTab !== 5, 'text-white bg-red-700': openTab === 5 }">
                        Mental
                    </a>
                </li>
            </ul>

            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="px-4 py-5 flex-auto">
                    <div class="flex border-gray-900/10">
                        <div class="text-base font-semibold text-gray-900 py-1 px-2">
                            <h2>Rekomendasi : </h2>
                        </div>
                        <div class="bg-gray-200 rounded-md py-1 px-2">
                            <p>Belum ada rekomendasi</p>
                        </div>
                    </div>
                    <div class="flex border-gray-900/10 mt-3">
                        <div class="text-base font-semibold text-gray-900 py-1 px-2">
                            <h2>Status : </h2>
                        </div>
                        <div class="bg-yellow-200 rounded-md py-1 px-2">
                            <p>Menunggu</p>
                        </div>
                    </div>
                    <div class="tab-content tab-space">
                        <div v-bind:class="{ 'hidden': openTab !== 1, 'block': openTab === 1 }">
                            <Teknik />
                        </div>
                        <div v-bind:class="{ 'hidden': openTab !== 2, 'block': openTab === 2 }">
                            <Fisik />
                        </div>
                        <div v-bind:class="{ 'hidden': openTab !== 3, 'block': openTab === 3 }">
                            <TaktikAtk />
                        </div>
                        <div v-bind:class="{ 'hidden': openTab !== 4, 'block': openTab === 4 }">
                            <TaktikDef />
                        </div>
                        <div v-bind:class="{ 'hidden': openTab !== 5, 'block': openTab === 5 }">
                            <Mental />
                        </div>
                    </div>
                    <div class="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                        <button type="submit"
                            class="rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Verifikasi</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>

import Teknik from './Teknik.vue'
import Fisik from './Fisik.vue'
import TaktikAtk from './TaktikAtk.vue'
import TaktikDef from './TaktikDef.vue'
import Mental from './Mental.vue'

export default {
    name: "pink-tabs",

    components: {
        Teknik,
        Fisik,
        TaktikAtk,
        TaktikDef,
        Mental
    },
    data() {
        return {
            openTab: 1
        };
    },
    methods: {
        toggleTabs(tabNumber) {
            this.openTab = tabNumber;
        }
    }
};
</script>
