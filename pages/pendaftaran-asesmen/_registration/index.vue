<template>
  <div class="flex flex-col gap-4">
    <title-asesmen
      :title="$store.state.registration.name"
      :subtitle="`${$store.state.registration.name} Dipilih`"
    />
    <breadcrumbs
      :items="[{
        label: 'Beranda',
        to: '/pendaftaran-asesmen',
        active: true
      }
        ,
      {
        label: `${$store.state.registration.name}`,
        to: 'pendaftaran-asesmen/registration',
        active: false
      }
      ]"
    />
    <kunci-form
      v-slot="{ hasErrors }"
      :items="items"
      :endpoint="endpoint"
      :redirect="''"
      class="flex flex-col gap-4"
    >
      <card :title="'Data Pribadi'">
        <FormulateInput
          v-model="items.name"
          type="text"
          label="Nama"
          placeholder="Nama"
          validation="required"
          error-behavior="live"
        />
      </card>
      <card :title="'Data Akun'"></card>
      <card :title="'Data Pekerjaan Sekarang'"></card>
      <card>
        <template #actions class="!pb-0">
          <div class="flex items-center justify-center gap-4">
            <kunci-button
              class="!bg-white !text-gray-600 border-gray-600 border shadow-none hover:!bg-gray-600 hover:!text-white"
              type="button"
              @click="goBack"
            >Kembali</kunci-button>
            <kunci-button type="submit" :disabled="hasErrors">Tambah</kunci-button>
          </div>
        </template>
      </card>
    </kunci-form>
  </div>
</template>

<script>
import Breadcrumbs from '~/components/Breadcrumbs.vue'
import Card from '~/components/Card.vue'
import KunciButton from '~/components/KunciButton.vue'
import KunciForm from '~/components/KunciForm.vue'
export default {
  components: { Breadcrumbs, Card, KunciButton, KunciForm },
  layout: 'participant',
  auth: false,
  data() {
    return {
      endpoint: 'participant/register/create',
      items: {
        name: ''
      },
    }
  }
}
</script>

<style>
</style>
