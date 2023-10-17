<template>
    <div tabindex="1" style="" class="font-lato">
        <transition name="fadefast">
        <div  
            v-if="statModal"   
            aria-hidden="true" 
            class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-40 w-full lg:inset-0 h-modal lg:h-full flex  justify-center bg-gray-800/[.7] "
        >
            <div v-click-outside="persistentAction" :class="width ? width : 'w-full lg:w-1/2' " class="fixed p-0 lg:p-4 z-20 lg:h-auto" >
                <div class="relative bg-white lg:rounded-lg shadow lg:px-6 px-5 h-screen lg:h-fit py-10 "> 
                    <div class="flex items-center rounded-t ">
                        <h3 class="flex-auto text-xl md:text-2xlplus text-center leading-8 font-lato text-warna-empat dark:text-white" :class="show ? 'pl-[26px]' : 'pl-0'">
                            {{title}}
                        </h3>
                        <button v-if="show" @click="tutupModal" class="flex-none">
                            <img src="/icons/icon-close-login.png" alt="close" width="26" height="26" class="cursor-pointer">
                        </button>
                    </div>
                    <hr class="border-warna-lima my-4">
                    <div class="max-h-[calc(100vh-220px)] overflow-y-auto">
                        <slot />
                    </div>
                        <slot name="footer" />
                </div>
            </div>
        </div>
        </transition>
    </div>
</template>
<script>
export default {
    props:['value','title', 'persistent', 'width', 'show'],
    data() {
        return {
            statModal: false
        }
    },
    mounted() {
        this.initialize();
        // window.addEventListener("keydown", e => {
        //     if (e.code === 'Escape') {
        //         this.persistentAction()
        //     } else if (e.code ==='Enter') {
        //         this.$emit('keyup',e)
        //     }
        // });

    },
    watch: {
        // statModal(val) {
        //     if (val === true) {
        //         document.body.classList.add('overflow-hidden')
        //     } else {
        //         document.body.classList.remove('overflow-hidden')
        //     }
        // }
    },

    methods: {
        initialize() {
            this.statModal = this.value
        },
        tutupModal() {
            this.statModal = false
            this.$emit('input', false)
        },
        persistentAction() {
            if (this.persistent && this.persistent === true) {
                console.log("a")
            } else {
                this.tutupModal()
            }
        },

    }
}
</script>