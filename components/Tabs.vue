<template>
    <div class="flex flex-wrap justify-center items-center">
        <div class="shadow-lg">
            <div v-if="isYoutubeLink(videoPlay)">
                <iframe :src="getEmbedLink(videoPlay)" frameborder="0" allowfullscreen class="w-[800px] h-[350px]"></iframe>
            </div>
            <div v-else>
                <video :key="videoPlay" ref="videoPlayer" id="videoPlay" controls class="w-[800px] h-[350px]">
                    <source :src="videoPlay" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
        <div v-if="items" class="w-full">
            <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row sm:gap-y-2 ">
                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal cursor-pointer"
                        :title="'Teknik'" v-on:click="toggleTabs(1)"
                        v-bind:class="{ 'text-gray-900 bg-white': openTab !== 1, 'text-white bg-red-700': openTab === 1 }">
                        Teknik
                    </a>
                </li>
                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal cursor-pointer"
                        :title="'Fisik'" v-on:click="toggleTabs(2)"
                        v-bind:class="{ 'text-gray-900 bg-white': openTab !== 2, 'text-white bg-red-700': openTab === 2 }">
                        Fisik
                    </a>
                </li>
                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal cursor-pointer"
                        :title="'Taktik : Attacking'" v-on:click="toggleTabs(3)"
                        v-bind:class="{ 'text-gray-900 bg-white': openTab !== 3, 'text-white bg-red-700': openTab === 3 }">
                        Taktik : Attacking
                    </a>
                </li>
                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal cursor-pointer"
                        :title="'Taktik : Defending'" v-on:click="toggleTabs(4)"
                        v-bind:class="{ 'text-gray-900 bg-white': openTab !== 4, 'text-white bg-red-700': openTab === 4 }">
                        Taktik : Defending
                    </a>
                </li>
                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal cursor-pointer"
                        :title="'Mental'" v-on:click="toggleTabs(5)"
                        v-bind:class="{ 'text-gray-900 bg-white': openTab !== 5, 'text-white bg-red-700': openTab === 5 }">
                        Mental
                    </a>
                </li>
            </ul>

            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="px-4 py-5 flex-auto">
                    <div class="flexborder-gray-900/10 relative">
                        <div class="relative text-base font-semibold text-gray-900 py-1 pr-10">
                            <h5>Rekomendasi :</h5>
                            <div class="relative top-0 left-0 bg-gray-200 rounded-md py-1 px-2 w-[600px]">
                                <Dropdown :opsi="recom" :value="rekomendasi" placeholder="Pilih Rekomendasi" />
                            </div>
                        </div>
                    </div>
                    <div class="flex border-gray-900/10 mt-3">
                        <div class="text-base font-semibold text-gray-900 py-1 pr-10">
                            <h5>Status : </h5>
                        </div>
                        <div class="bg-yellow-200 rounded-md py-1 px-2">
                            <p>{{ items.status.name }}</p>
                        </div>
                    </div>
                    <div class="tab-content tab-space">
                        <div v-bind:class="{ 'hidden': openTab !== 1, 'block': openTab === 1 }">
                            <form>
                                <div v-for="(item, index) in items.performance_tests" :key="index">
                                    <!-- {{ item }} -->
                                    <div v-if="item.performance_item.performance_category.id === 1">
                                        <h5 class="font-bold mt-10 ">{{ item.performance_item.name }}</h5>
                                        <div class="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
                                            <div class="sm:col-span-2 sm:col-start-1">
                                                <label for="realisasi"
                                                    class="block text-sm font-medium leading-6 text-gray-900">Realisasi</label>
                                                <div class="mt-2">
                                                    <input type="number" name="realisasi" id="realisasi"
                                                        v-model="item.realization"
                                                        class="pl-3 font-semibold block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>

                                            <div class="sm:col-span-2">
                                                <label for="aktual"
                                                    class="block text-sm font-medium leading-6 text-gray-900">
                                                    Aktual</label>
                                                <div class="mt-2">
                                                    <input type="number" name="aktual" id="aktual"
                                                        v-model="item.actual_score"
                                                        class="pl-3 font-semibold block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>

                                            <div class="sm:col-span-2">
                                                <label for="postal-code"
                                                    class="block text-sm font-medium leading-6 text-gray-900">Play
                                                    Video</label>
                                                <div class="mt-2">
                                                    <button @click.prevent="playVideos(item.link_url)"
                                                        class="flex bg-red-700 rounded-full grid-cols-2 text-white pr-2"
                                                        title="Play Video">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                                            viewBox="0 0 24 24">
                                                            <path fill="white"
                                                                d="M10 15.577L15.577 12L10 8.423v7.154ZM12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924q-1.216-1.214-1.925-2.856Q3 13.87 3 12.003q0-1.866.708-3.51q.709-1.643 1.924-2.859q1.214-1.216 2.856-1.925Q10.13 3 11.997 3q1.866 0 3.51.708q1.643.709 2.859 1.924q1.216 1.214 1.925 2.856Q21 10.13 21 11.997q0 1.866-.708 3.51q-.709 1.643-1.924 2.859q-1.214 1.216-2.856 1.925Q13.87 21 12.003 21Z" />
                                                        </svg>
                                                        <p class="pt-1">Play Video</p>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                        <div v-bind:class="{ 'hidden': openTab !== 2, 'block': openTab === 2 }">
                            <form>
                                <div v-for="(item, index) in items.performance_tests" :key="index">
                                    <!-- {{ item }} -->
                                    <div v-if="item.performance_item.performance_category.id === 2">
                                        <h5 class="font-bold mt-10 ">{{ item.performance_item.name }}</h5>
                                        <div class="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
                                            <div class="sm:col-span-2 sm:col-start-1">
                                                <label for="realisasi"
                                                    class="block text-sm font-medium leading-6 text-gray-900">Realisasi</label>
                                                <div class="mt-2">
                                                    <input type="number" name="realisasi" id="realisasi"
                                                        v-model="item.realization"
                                                        class="pl-3 font-semibold block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>

                                            <div class="sm:col-span-2">
                                                <label for="aktual"
                                                    class="block text-sm font-medium leading-6 text-gray-900">
                                                    Aktual</label>
                                                <div class="mt-2">
                                                    <input type="number" name="aktual" id="aktual"
                                                        v-model="item.actual_score"
                                                        class="pl-3 font-semibold block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>

                                            <div class="sm:col-span-2">
                                                <label for="postal-code"
                                                    class="block text-sm font-medium leading-6 text-gray-900">Play
                                                    Video</label>
                                                <div class="mt-2">
                                                    <button @click.prevent="playVideos(item.link_url)"
                                                        class="flex bg-red-700 rounded-full grid-cols-2 text-white pr-2"
                                                        title="Play Video">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                                            viewBox="0 0 24 24">
                                                            <path fill="white"
                                                                d="M10 15.577L15.577 12L10 8.423v7.154ZM12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924q-1.216-1.214-1.925-2.856Q3 13.87 3 12.003q0-1.866.708-3.51q.709-1.643 1.924-2.859q1.214-1.216 2.856-1.925Q10.13 3 11.997 3q1.866 0 3.51.708q1.643.709 2.859 1.924q1.216 1.214 1.925 2.856Q21 10.13 21 11.997q0 1.866-.708 3.51q-.709 1.643-1.924 2.859q-1.214 1.216-2.856 1.925Q13.87 21 12.003 21Z" />
                                                        </svg>
                                                        <p class="pt-1">Play Video</p>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                        <div v-bind:class="{ 'hidden': openTab !== 3, 'block': openTab === 3 }">
                            <form>
                                <div v-for="(item, index) in items.performance_tests" :key="index">
                                    <!-- {{ item }} -->
                                    <div v-if="item.performance_item.performance_category.id === 3">
                                        <h5 class="font-bold mt-10 ">{{ item.performance_item.name }}</h5>
                                        <div class="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
                                            <div class="sm:col-span-2">
                                                <label for="aktual"
                                                    class="block text-sm font-medium leading-6 text-gray-900">
                                                    Aktual</label>
                                                <div class="mt-2">
                                                    <input type="number" name="aktual" id="aktual"
                                                        v-model="item.actual_score"
                                                        class="pl-3 font-semibold block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>

                                            <div class="sm:col-span-2">
                                                <label for="postal-code"
                                                    class="block text-sm font-medium leading-6 text-gray-900">Play
                                                    Video</label>
                                                <div class="mt-2">
                                                    <button @click.prevent="playVideos(item.link_url)"
                                                        class="flex bg-red-700 rounded-full grid-cols-2 text-white pr-2"
                                                        title="Play Video">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                                            viewBox="0 0 24 24">
                                                            <path fill="white"
                                                                d="M10 15.577L15.577 12L10 8.423v7.154ZM12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924q-1.216-1.214-1.925-2.856Q3 13.87 3 12.003q0-1.866.708-3.51q.709-1.643 1.924-2.859q1.214-1.216 2.856-1.925Q10.13 3 11.997 3q1.866 0 3.51.708q1.643.709 2.859 1.924q1.216 1.214 1.925 2.856Q21 10.13 21 11.997q0 1.866-.708 3.51q-.709 1.643-1.924 2.859q-1.214 1.216-2.856 1.925Q13.87 21 12.003 21Z" />
                                                        </svg>
                                                        <p class="pt-1">Play Video</p>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                        <div v-bind:class="{ 'hidden': openTab !== 4, 'block': openTab === 4 }">
                            <form>
                                <div v-for="(item, index) in items.performance_tests" :key="index">
                                    <!-- {{ item }} -->
                                    <div v-if="item.performance_item.performance_category.id === 4">
                                        <h5 class="font-bold mt-10 ">{{ item.performance_item.name }}</h5>
                                        <div class="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
                                            <div class="sm:col-span-2">
                                                <label for="aktual"
                                                    class="block text-sm font-medium leading-6 text-gray-900">
                                                    Aktual</label>
                                                <div class="mt-2">
                                                    <input type="number" name="aktual" id="aktual"
                                                        v-model="item.actual_score"
                                                        class="pl-3 font-semibold block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>

                                            <div class="sm:col-span-2">
                                                <label for="postal-code"
                                                    class="block text-sm font-medium leading-6 text-gray-900">Play
                                                    Video</label>
                                                <div class="mt-2">
                                                    <button @click.prevent="playVideos(item.link_url)"
                                                        class="flex bg-red-700 rounded-full grid-cols-2 text-white pr-2"
                                                        title="Play Video">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                                            viewBox="0 0 24 24">
                                                            <path fill="white"
                                                                d="M10 15.577L15.577 12L10 8.423v7.154ZM12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924q-1.216-1.214-1.925-2.856Q3 13.87 3 12.003q0-1.866.708-3.51q.709-1.643 1.924-2.859q1.214-1.216 2.856-1.925Q10.13 3 11.997 3q1.866 0 3.51.708q1.643.709 2.859 1.924q1.216 1.214 1.925 2.856Q21 10.13 21 11.997q0 1.866-.708 3.51q-.709 1.643-1.924 2.859q-1.214 1.216-2.856 1.925Q13.87 21 12.003 21Z" />
                                                        </svg>
                                                        <p class="pt-1">Play Video</p>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                        <div v-bind:class="{ 'hidden': openTab !== 5, 'block': openTab === 5 }">
                            <div class="flex border-gray-900/10 mt-3">
                                <div class="text-base font-semibold text-gray-900 py-1 pr-10">
                                    <h5>Skor: </h5>
                                </div>
                                <div class="text-5xl font-semibold rounded-md py-1 px-2 text-green-500">
                                    <p>{{ items.totalMental }}</p>
                                </div>
                            </div>
                            <h1>{{ items.score_scat }}</h1>
                            <form>
                                <div class="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
                                    <div class="sm:col-span-2 sm:col-start-1">
                                        <label for="realisasi"
                                            class="block text-sm font-medium leading-6 text-gray-900 font-semibold">Rating
                                            Nilai</label>
                                        <div class="mt-2">
                                            <input type="number" name="realisasi" id="realisasi"
                                                class="pl-3 font-semibold block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                                v-model="items.scat_score" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <!-- Tabs di dalam Tab "Mental" -->
                            <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row sm:gap-y-2 ">
                                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                    <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal cursor-pointer "
                                        :title="'Sub Tab 1 dalam Mental'" v-on:click="toggleSubTabs(1)"
                                        v-bind:class="{ 'text-gray-900 bg-white': subTab !== 1, 'text-white bg-red-700': subTab === 1 }">
                                        1-16 = Low Level Anxiety
                                    </a>
                                </li>
                                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                    <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal cursor-pointer"
                                        :title="'Sub Tab 2 dalam Mental'" v-on:click="toggleSubTabs(2)"
                                        v-bind:class="{ 'text-gray-900 bg-white': subTab !== 2, 'text-white bg-red-700': subTab === 2 }">
                                        17-24 = Average Level Anxiety
                                    </a>
                                </li>
                                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                    <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal cursor-pointer"
                                        :title="'Sub Tab 2 dalam Mental'" v-on:click="toggleSubTabs(3)"
                                        v-bind:class="{ 'text-gray-900 bg-white': subTab !== 3, 'text-white bg-red-700': subTab === 3 }">
                                        >25 = High Level Anxiety
                                    </a>
                                </li>
                                <!-- Dan seterusnya -->
                            </ul>
                            <div v-if="openTab === 5">
                                <div v-show="subTab === 1">
                                    <table class="w-full border-collapse text-center border border-black">
                                        <thead class="border border-black">
                                            <tr class="bg-red-700 border border-black">
                                                <th class="py-2 px-4 text-center border border-black">Skor</th>
                                                <th class="py-2 px-4 text-center border border-black">Rating</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="index in 16" :key="index" class="border-t">
                                                <td class="py-2 px-4 border border-black">{{ index }}</td>
                                                <td class="py-2 px-4 border border-black">{{ 100 - (index - 1) * 2 }}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                                <div v-show="subTab === 2">
                                    <table class="w-full border-collapse text-center border border-black">
                                        <thead class="border border-black">
                                            <tr class="bg-red-700 border border-black">
                                                <th class="py-2 px-4 text-center border border-black">Skor</th>
                                                <th class="py-2 px-4 text-center border border-black">Rating</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="index in 8" :key="index + 16" class="border-t">
                                                <td class="py-2 px-4 border border-black">{{ index + 16 }}</td>
                                                <td class="py-2 px-4 border border-black">{{ 70 - index * 2 }}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                                <div v-show="subTab === 3">
                                    <table class="w-full border-collapse text-center border border-black">
                                        <thead class="border border-black">
                                            <tr class="bg-red-700 border border-black">
                                                <th class="py-2 px-4 text-center border border-black">Skor</th>
                                                <th class="py-2 px-4 text-center border border-black">Rating</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="index in 21" :key="index + 24" class="border-t">
                                                <template v-if="index !== 10">
                                                    <!-- Memeriksa agar angka 10 tidak ditampilkan -->
                                                    <td class="py-2 px-4 border border-black">{{ index + 24 }}</td>
                                                    <td class="py-2 px-4 border border-black">{{ 54 - index * 2 }}</td>
                                                </template>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- Dan seterusnya -->
                            </div>
                        </div>
                    </div>
                    <div class="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                        <button type="submit" @click="dataVerifikasi"
                            class="rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Verifikasi</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            openTab: 1,
            subTab: 1,
            videoPlay: "",
            items: null,
            recom: null,
            rekomendasi: "-"
        };
    },
    mounted() {
        this.fetchDetail()
        this.fetchRecommendeds()
    },
    methods: {
        fetchDetail() {
            this.reloadVid = false
            this.$axios
                .$get(`https://bepssi.kunci.co.id/api/performance/${this.$store.state.employee.id}/detail`)
                .then(({ data }) => {
                    if (data && data.performance_tests.length > 0) {
                        this.videoPlay = data.performance_tests[0].link_url
                        // if (this.$refs.videoPlayer) {
                        //     this.$refs.videoPlayer.play();
                        // }
                    }
                    this.items = data
                    this.items.totalMental = _.sum(_.flatMap(this.items.mental_tests, "score_scat"))
                    console.log(this.items);
                })
        },

        dataVerifikasi() {
            var dataPostVerifikasi = {
                recommended_id: this.items.id,
                scat_score: this.items.scat_score ? this.items.scat_score : 0,
                status: 1,
                performance_tests: this.items.performance_tests.map(e => {
                    return {
                        performance_test_id: e.id,
                        actual_score: e.actual_score ? e.actual_score : 0,
                        realization: e.realization ? e.realization : 0
                    }
                })
            }
            let config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `https://bepssi.kunci.co.id/api/performance/${this.$store.state.employee.id}/verify`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2JlcHNzaS5rdW5jaS5jby5pZC9hcGkvYXV0aC9sb2dpbiIsImlhdCI6MTY5NTc5NzIxNywibmJmIjoxNjk1Nzk3MjE3LCJqdGkiOiI4Qmh3d3RoaHdISmtRYXpEIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.eplSXLlhUeHHJW7O_XLCnwvMosBxZRgsOMKa3vG57rE'
                },
                data: dataPostVerifikasi
            };
            this.$axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    this.$swal({
                        title: 'Data Terverifikasi',
                        text: 'Data telah berhasil diverifikasi!',
                        icon: 'success',
                        button: 'OK'
                    }).then(() => {
                        // Pindah halaman ke halaman test-parameter
                        this.$router.push('/verification'); // Ubah '/test-parameter' sesuai dengan rute halaman test-parameter Anda
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        fetchRecommendeds() {
            this.$axios
                .$get(`https://bepssi.kunci.co.id/api/recommendeds`)
                .then(({ data }) => {
                    this.recom = data
                    console.log(this.recom);
                })
        },
        isYoutubeLink(link) {
            return link.includes('youtu.be') || link.includes('youtube.com');
        },
        getEmbedLink(link) {
            if (link.includes('youtu.be') || link.includes('youtube.com')) {
                const videoId = link.split('/').pop().split('?')[0];
                return `https://www.youtube.com/embed/${videoId}`;
            }
            return link;
        },
        toggleTabs(tabNumber) {
            this.openTab = tabNumber;
        },
        toggleSubTabs(tabNumber) {
            this.subTab = tabNumber;
        },
        playVideos(link) {
            this.videoPlay = link
        },
    },
};
</script>
