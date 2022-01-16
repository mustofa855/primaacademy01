<template>
  <div>
    <title-bar
      :back="'/assessment'"
      :title="'NAMA SISWA NANTI GANTI'"
      :subtitle="'NAMA SISWA NANTI GANTI'"
    />

    <!-- content goes here -->
    <div class="flex flex-col gap-4 pb-4">
      <!-- data siswa -->
      <card title="Data Siswa">
        <div class="grid grid-cols-2 gap-4">
          <!-- col 1 -->
          <div>
            <FormulateInput
              type="text"
              label="Nama Lengkap"
              placeholder="Nama Lengkap"
              validation="required"
              error-behavior="live"
            />
            <FormulateInput
              type="number"
              label="NIK"
              placeholder="NIK"
              validation="required"
              error-behavior="live"
            />
            <FormulateInput
              type="text"
              label="Tempat Lahir"
              placeholder="Tempat Lahir"
              validation="required"
              error-behavior="live"
            />
            <FormulateInput
              type="date"
              label="Tanggal Lahir"
              placeholder="Tanggal Lahir"
              validation="required"
              error-behavior="live"
            />
            <FormulateInput
              type="text"
              label="Kebangsaan"
              placeholder="Kebangsaan"
              validation="required"
              error-behavior="live"
            />

            <div>
              <card-title class="mb-4">Tujuan Asesmen</card-title>
              <FormulateInput
                type="text"
                label="Tujuan Asesmen"
                placeholder="Tujuan Asesmen"
                validation="required"
                error-behavior="live"
              />
            </div>
          </div>
          <!-- col 2 -->
          <div>
            <FormulateInput
              type="text"
              label="Alamat Rumah"
              placeholder="Alamat Rumah"
              validation="required"
              error-behavior="live"
            />
            <FormulateInput
              type="text"
              label="Kode POS"
              placeholder="Kode POS"
              validation="required"
              error-behavior="live"
            />
            <FormulateInput
              type="text"
              label="No. Telepon"
              placeholder="No. Telepon"
              validation="required"
              error-behavior="live"
            />
            <FormulateInput
              type="email"
              label="Email"
              placeholder="Email"
              validation="required"
              error-behavior="live"
            />
            <FormulateInput
              type="text"
              label="Kualifikasi Pendidikan"
              placeholder="Kualifikasi Pendidikan"
              validation="required"
              error-behavior="live"
            />
            <FormulateInput
              type="text"
              label="Tanda Tangan"
              placeholder="Tanda Tangan"
              validation="required"
              error-behavior="live"
            />
          </div>
        </div>
      </card>
      <!-- data Data Pekerjaan Sekarang -->
      <card title="Data Pekerjaan Sekarang">
        <div class="grid grid-cols-2 gap-4">
          <!-- col 1 -->
          <div>
            <FormulateInput
              type="text"
              label="Perusahaan/Lembaga"
              placeholder="Perusahaan/Lembaga"
              validation="required"
              error-behavior="live"
            />
            <FormulateInput
              type="text"
              label="Jabatan"
              placeholder="Jabatan"
              validation="required"
              error-behavior="live"
            />
            <FormulateInput
              type="text"
              label="Alamat Lembaga"
              placeholder="Alamat Lembaga"
              validation="required"
              error-behavior="live"
            />
          </div>
          <!-- col 2 -->
          <div>
            <FormulateInput
              type="text"
              label="Kode POS"
              placeholder="Kode POS"
              validation="required"
              error-behavior="live"
            />
            <FormulateInput
              type="text"
              label="No. Telepon"
              placeholder="No. Telepon"
              validation="required"
              error-behavior="live"
            />
            <FormulateInput
              type="email"
              label="Email"
              placeholder="Email"
              validation="required"
              error-behavior="live"
            />
          </div>
        </div>
      </card>
      <!-- data Bukti Kelengkapan -->
      <card title="Bukti Kelengkapan">
        <div class="grid grid-cols-2 gap-4">
          <!-- col 1 -->
          <div>
            <FormulateInput
              type="text"
              label="Kartu Pelajar"
              placeholder="Kartu Pelajar"
              validation="required"
              error-behavior="live"
            />
            <FormulateInput
              type="text"
              label="Sertifikat Praktek Kerja Lapangan"
              placeholder="Sertifikat Praktek Kerja Lapangan"
              validation="required"
              error-behavior="live"
            />
          </div>
          <!-- col 2 -->
          <div>
            <FormulateInput
              type="text"
              label="Rapor Sesuai KKM"
              placeholder="Rapor Sesuai KKM"
              validation="required"
              error-behavior="live"
            />
            <FormulateInput
              type="text"
              label="Pas Foto 4x6"
              placeholder="Pas Foto 4x6"
              validation="required"
              error-behavior="live"
            />
          </div>
        </div>
      </card>
      <!-- data Bukti Kompetensi Relevan -->
      <card title="Bukti Kompetensi Relevan">
        <div class="grid grid-cols-2 gap-4">
          <!-- col 1 -->
          <div>
            <FormulateInput
              type="text"
              label="Rincian Bukti Pendidikan/Pelatihan"
              placeholder="Rincian Bukti Pendidikan/Pelatihan"
              validation="required"
              error-behavior="live"
            />
            <FormulateInput
              type="text"
              label="Pengalaman Kerja"
              placeholder="Pengalaman Kerja"
              validation="required"
              error-behavior="live"
            />
          </div>
          <!-- col 2 -->
          <div>
            <FormulateInput
              type="text"
              label="Pengalaman Hidup"
              placeholder="Pengalaman Hidup"
              validation="required"
              error-behavior="live"
            />
          </div>
        </div>
      </card>
      <card title="Verifikasi" :position="'center'">
        <template #actions>
          <div class="flex flex-row gap-8 items-center justify-center">
            <kunci-button
              class="!bg-white text-gray-600 border-gray-600 border shadow-none hover:!bg-gray-600 hover:text-white"
              type="button"
            >Kembali</kunci-button>
            <kunci-button class="!bg-danger hover:!bg-danger-shade" type="button">Tolak</kunci-button>
            <kunci-button type="submit">Tambah</kunci-button>
          </div>
        </template>
      </card>
    </div>
  </div>
</template>
<script>
import Card from '~/components/Card.vue'
import TitleBar from '~/components/TitleBar.vue'
export default {
  components: { TitleBar, Card },
  layout: 'admin',
}
</script>
