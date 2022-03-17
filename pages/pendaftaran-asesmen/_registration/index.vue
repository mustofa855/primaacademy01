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
      <card :title="'Data Pribadi'" class="flex flex-col gap-4">
        <div class="flex flex-1 gap-4">
          <div class="flex-grow">
            <FormulateInput
              v-model="items.name"
              type="text"
              label="Nama"
              placeholder="Nama"
              validation="required"
              error-behavior="live"
            />
            <FormulateInput
              v-model="items.name"
              type="text"
              label="NIK"
              placeholder="NIK"
              validation="required"
              error-behavior="live"
            />
            <FormulateInput
              v-model="items.name"
              type="text"
              label="Tempat Lahir"
              placeholder="Tempat Lahir"
              validation="required"
              error-behavior="live"
            />
            <FormulateInput
              v-model="items.name"
              type="date"
              label="Tanggal Lahir"
              placeholder="Tanggal Lahir"
              validation="required"
              error-behavior="live"
            />
            <FormulateInput
              type="select"
              label="Jenis Kelamin"
              placeholder="Jenis Kelamin"
              :options="[
                { value: '0', label: 'Perempuan' },
                { value: '1', label: 'Laki-laki' },
              ]"
              validation="required"
            />
            <FormulateInput
              type="select"
              label="Kebangsaan"
              placeholder="Kebangsaan"
              :options="[
                { value: '1', label: 'Warga Negara Indonesia (WNI)' },
                { value: '2', label: 'Warga Negara Asing (WNA)' },
              ]"
              validation="required"
            />
            <FormulateInput
              type="image"
              name="signnature"
              label="Tanda Tangan"
              help="Select a png, jpg to upload."
              validation="required|mime:image/jpeg,image/png"
            />
            <a
              href="https://www.signwell.com/online-signature/draw/"
              target="_blank"
              class="text-primary"
            >Klik disini jika belum mempunyai tanda tangan</a>
          </div>
          <div class="flex-grow">
            <FormulateInput
              type="textarea"
              label="Alamat rumah"
              validation="required|max:150"
              error-behavior="live"
            />
            <FormulateInput
              type="text"
              label="Kode Pos"
              placeholder="Kode Pos"
              validation="required"
              error-behavior="live"
            />
            <FormulateInput
              type="number"
              label="Nomor Telepon"
              placeholder="Nomor Telepon"
              validation="required"
              error-behavior="live"
            />
            <FormulateInput
              type="number"
              label="Email"
              placeholder="Email"
              validation="required|email"
              error-behavior="live"
            />
            <FormulateInput
              type="select"
              label="Kualifikasi Pendidikan"
              placeholder="Kualifikasi Pendidikan"
              :options="[
                { value: '1', label: 'SD' },
                { value: '2', label: 'SMP' },
                { value: '3', label: 'SMA' },
                { value: '4', label: 'Diploma (D1)' },
                { value: '5', label: 'Diploma D2' },
                { value: '6', label: 'Diploma D3' },
                { value: '7', label: 'Diploma D4' },
                { value: '8', label: 'Sarjana (S1)' },
                { value: '9', label: 'Magister (S2)' },
                { value: '10', label: 'Doktor (S3)' },
              ]"
              validation="required"
            />
          </div>
        </div>

        <div class="flex flex-col">
          <card-title>Tujuan Asesmen</card-title>
          <div class="flex flex-row">
            <FormulateInput
              type="select"
              label="Pilih Tujuan Asesmen"
              placeholder="Pilih Tujuan Asesmen"
              :options="[
                { value: '1', label: 'Sertifikasi' },
                { value: '2', label: 'Sertifikasi Ulang' },
              ]"
              validation="required"
            />
          </div>
        </div>
      </card>
      <card :title="'Data Akun'">
        <FormulateInput
          v-model="items.name"
          type="text"
          label="Username"
          placeholder="Username"
          validation="required"
          error-behavior="live"
        />
        <FormulateInput
          v-model="items.name"
          type="password"
          label="Password"
          placeholder="Password"
          validation="required|min:8,length"
          error-behavior="live"
        />
        <FormulateInput
          v-model="items.name"
          type="password"
          label="Ulangi Password"
          placeholder="Ulangi Password"
          validation="required|min:8,length"
          error-behavior="live"
        />
      </card>
      <card :title="'Data Pekerjaan Sekarang'">
        <div class="flex flex-1 gap-4">
          <div class="flex-grow">
            <FormulateInput
              v-model="items.name"
              type="text"
              label="Perusahaan/Lembaga"
              placeholder="Perusahaan/Lembaga"
              validation="required"
              error-behavior="live"
            />
            <FormulateInput
              v-model="items.name"
              type="text"
              label="Jabatan"
              placeholder="Jabatan"
              validation="required"
              error-behavior="live"
            />
            <FormulateInput
              type="textarea"
              label="Alamat Lembaga"
              validation="required|max:150"
              error-behavior="live"
            />
          </div>
          <div class="flex-grow">
            <FormulateInput
              v-model="items.name"
              type="text"
              label="Kode Pos"
              placeholder="Kode Pos"
              validation="required"
              error-behavior="live"
            />
            <FormulateInput
              v-model="items.name"
              type="number"
              label="Nomor Telepon"
              placeholder="Nomor Telepon"
              validation="required"
              error-behavior="live"
            />
            <FormulateInput
              type="number"
              label="Email"
              placeholder="Email"
              validation="required|email"
              error-behavior="live"
            />
          </div>
        </div>
      </card>
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
import CardTitle from '~/components/CardTitle.vue'
import KunciButton from '~/components/KunciButton.vue'
import KunciForm from '~/components/KunciForm.vue'
export default {
  components: { Breadcrumbs, Card, KunciButton, KunciForm, CardTitle },
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
