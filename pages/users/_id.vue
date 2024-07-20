<template>
  <div>
    <div>
      <title-bar is-controlbar :title="'Halaman Detail Pengguna'"
        :subtitle="'Pada menu ini anda dapat melihat dan mengubah data pengguna'" />
    </div>
    <tombol-button @click="$router.push('/users')" class="bg-success text-white kembali-button">
      Kembali ke Daftar Pengguna
    </tombol-button>

    <div class="relative min-w-0 shadow-lg rounded-xl">
      <form class="grid grid-cols-2 min-w-0 break-words px-5 py-5 mt-8 bg-white w-full shadow-lg rounded-xl"
        @submit.prevent="updateUser">
        <!-- Nama Lengkap -->
        <div class="form-group px-5 flex flex-col gap-1">
          <label for="fullname" class="block font-bold mb-2">Nama Lengkap</label>
          <input :class="{ 'opacity-80 cursor-not-allowed': !isEditable }" :disabled="!isEditable" type="text"
            id="fullname" name="fullname" placeholder="Ex. 90" v-model="user.fullname"
            class="w-full p-2 border border-gray-300 rounded mb-4 outline-none">
        </div>
        <!-- Username -->
        <div class="form-group px-5 flex flex-col gap-1">
          <label for="username" class="block font-bold mb-2">Nama Pengguna</label>
          <input :class="{ 'opacity-80 cursor-not-allowed': !isEditable }" :disabled="!isEditable" type="text"
            id="username" name="username" placeholder="Ex. 90" v-model="user.username"
            class="w-full p-2 border border-gray-300 rounded mb-4 outline-none">
        </div>
        <!-- NIK Pengguna -->
        <div class="form-group px-5 flex flex-col gap-1">
          <label for="nik_user" class="block font-bold mb-2">NIK</label>
          <input :class="{ 'opacity-80 cursor-not-allowed': !isEditable }" :disabled="!isEditable" type="text"
            id="nik_user" name="nik_user" placeholder="Ex. 90" v-model="user.nik_user"
            class="w-full p-2 border border-gray-300 rounded mb-4 outline-none">
        </div>
        <!-- Email Pengguna -->
        <div class="form-group px-5 flex flex-col gap-1">
          <label for="email" class="block font-bold mb-2">Email</label>
          <input :class="{ 'opacity-80 cursor-not-allowed': !isEditable }" :disabled="!isEditable" type="text"
            id="email" name="email" placeholder="Ex. 90" v-model="user.email"
            class="w-full p-2 border border-gray-300 rounded mb-4 outline-none">
        </div>
        <!-- Tinggi Badan -->
        <div class="form-group px-5 flex flex-col gap-1">
          <label for="height" class="block font-bold mb-2">Tinggi Badan</label>
          <input :class="{ 'opacity-80 cursor-not-allowed': !isEditable }" :disabled="!isEditable" type="text"
            id="height" name="height" placeholder="Ex. 90" v-model="user.height"
            class="w-full p-2 border border-gray-300 rounded mb-4 outline-none">
        </div>
        <!-- Berat Badan -->
        <div class="form-group px-5 flex flex-col gap-1">
          <label for="weight" class="block font-bold mb-2">Berat Badan</label>
          <input :class="{ 'opacity-80 cursor-not-allowed': !isEditable }" :disabled="!isEditable" type="text"
            id="weight" name="weight" placeholder="Ex. 90" v-model="user.weight"
            class="w-full p-2 border border-gray-300 rounded mb-4 outline-none">
        </div>
        <!-- Nomor Telepon -->
        <div class="form-group px-5 flex flex-col gap-1">
          <label for="phone_number" class="block font-bold mb-2">Nomor Telepon</label>
          <input :class="{ 'opacity-80 cursor-not-allowed': !isEditable }" :disabled="!isEditable" type="text"
            id="phone_number" name="phone_number" placeholder="Ex. 90" v-model="user.phone_number"
            class="w-full p-2 border border-gray-300 rounded mb-4 outline-none">
        </div>
        <!-- Jenis Kelamin -->
        <div class="form-group px-5 flex flex-col gap-1">
          <label :class="{ 'opacity-80 cursor-not-allowed': !isEditable }" :disabled="!isEditable" for="jenis_kelamin"
            class="block font-bold mb-2">Jenis Kelamin</label>
          <select id="jenis_kelamin" :class="{ 'opacity-80 cursor-not-allowed': !isEditable }" :disabled="!isEditable"
            class="p-2 border rounded-md border-gray-300 bg-transparent text-md text-gray-500 focus:ring-2 focus:ring-inset focus:ring-red-600"
            v-model="user.jenis_kelamin">
            <option value="laki-laki">Laki-Laki</option>
            <option value="perempuan">Perempuan</option>
          </select>
        </div>
        <!-- User Role -->
        <div class="form-group px-5 flex flex-col gap-1">
          <label :class="{ 'opacity-80 cursor-not-allowed': !isEditable }" :disabled="!isEditable" for="user_role"
            class="block font-bold mb-2">Role Pengguna</label>
          <select id="user_role" :class="{ 'opacity-50 cursor-not-allowed': !isEditable }" :disabled="!isEditable"
            class="p-2 border rounded-md border-gray-300 bg-transparent text-md text-gray-500 focus:ring-2 focus:ring-inset focus:ring-red-600"
            v-model="user.user_role" @change="updateUserRole">
            <option value="1">Admin</option>
            <option value="2">Pemain</option>
            <option value="3">Pelatih</option>
          </select>
        </div>
        <!-- Instagram -->
        <div class="form-group px-5 flex flex-col gap-1">
          <label for="instagram_acc" class="block font-bold mb-2">Akun Instagram</label>
          <input :class="{ 'opacity-80 cursor-not-allowed': !isEditable }" :disabled="!isEditable" type="text"
            id="instagram_acc" name="instagram_acc" placeholder="Ex. 90" v-model="user.instagram_acc"
            class="w-full p-2 border border-gray-300 rounded mb-4 outline-none">
        </div>
        <!-- Kota -->
        <div class="form-group px-5 flex flex-col gap-1">
          <label for="city_user" class="block font-bold mb-2">Kota</label>
          <input :class="{ 'opacity-80 cursor-not-allowed': !isEditable }" :disabled="!isEditable" type="text"
            id="city_user" name="city_user" placeholder="Ex. 90" v-model="user.city_user"
            class="w-full p-2 border border-gray-300 rounded mb-4 outline-none">
        </div>
        <!-- Ulang Tahun -->
        <div class="form-group px-5 flex flex-col gap-1">
          <label for="birthday_user" class="block font-bold mb-2">Tanggal Lahir</label>
          <input :class="{ 'opacity-80 cursor-not-allowed': !isEditable }" :disabled="!isEditable" type="date"
            id="birthday_user" name="birthday_user" placeholder="Ex. 90" v-model="user.birthday_user"
            class="w-full p-2 border border-gray-300 rounded mb-4 outline-none">
        </div>
        <!-- KTP -->
        <div class="form-group px-5 flex flex-col gap-1">
          <label for="ktp_user" class="block font-bold mb-2">KTP</label>
          <div class="flex items-center">
            <input :class="{ 'opacity-80 cursor-not-allowed': !isEditable }" :disabled="!isEditable" type="text"
              id="ktp_user" name="ktp_user" placeholder="KTP" :value="'KTP ' + user.fullname + '.pdf'"
              class="w-full p-2 border border-gray-300 rounded outline-none mr-2 mb-5" readonly>
            <!-- Tombol tampil modal -->
            <button type="button" @click="showModal(user.ktp_user)"
              class="bg-success text-white px-4 py-2 rounded mb-5 hover:bg-succes-shade transition ease-in-out duration-200">
              <img class="w-6" :src="'/eye.svg'" />
            </button>
          </div>
        </div>
        <!-- Kartu Keluarga -->
        <div class="form-group px-5 flex flex-col gap-1">
          <label for="kk_user" class="block font-bold mb-2">Kartu Keluarga</label>
          <div class="flex items-center">
            <input :class="{ 'opacity-80 cursor-not-allowed': !isEditable }" :disabled="!isEditable" type="text"
              id="kk_user" name="kk_user" placeholder="Kartu Keluarga"
              :value="'Kartu Keluarga ' + user.fullname + '.pdf'"
              class="w-full p-2 border border-gray-300 rounded outline-none mr-2 mb-5" readonly>
            <!-- Tombol tampil modal -->
            <button type="button" @click="showModal(user.kk_user)"
              class="bg-success text-white px-4 py-2 rounded mb-5 hover:bg-succes-shade transition ease-in-out duration-200">
              <img class="w-6" :src="'/eye.svg'" />
            </button>
          </div>
        </div>
        <!-- Akta Kelahiran -->
        <div class="form-group px-5 flex flex-col gap-1">
          <label for="akta_kelahiran" class="block font-bold mb-2">Akta Kelahiran</label>
          <div class="flex items-center">
            <input :class="{ 'opacity-80 cursor-not-allowed': !isEditable }" :disabled="!isEditable" type="text"
              id="akta_kelahiran" name="akta_kelahiran" placeholder="Akta Kelahiran"
              :value="'Akta kelahiran ' + user.fullname + '.pdf'"
              class="w-full p-2 border border-gray-300 rounded outline-none mr-2 mb-5" readonly>
            <!-- Tombol tampil modal -->
            <button type="button" @click="showModal(user.akta_kelahiran)"
              class="bg-success text-white px-4 py-2 rounded mb-5 hover:bg-succes-shade transition ease-in-out duration-200">
              <img class="w-6" :src="'/eye.svg'" />
            </button>
          </div>
        </div>
        <!-- Ijazah -->
        <div class="form-group px-5 flex flex-col gap-1">
          <label for="ijazah_user" class="block font-bold mb-2">Ijazah</label>
          <div class="flex items-center">
            <input :class="{ 'opacity-80 cursor-not-allowed': !isEditable }" :disabled="!isEditable" type="text"
              id="ijazah_user" name="ijazah_user" placeholder="KTP" :value="'Ijazah ' + user.fullname + '.pdf'"
              class="w-full p-2 border border-gray-300 rounded outline-none mr-2 mb-5" readonly>
            <!-- Tombol tampil modal -->
            <button type="button" @click="showModal(user.ijazah_user)"
              class="bg-success text-white px-4 py-2 rounded mb-5 hover:bg-succes-shade transition ease-in-out duration-200">
              <img class="w-6" :src="'/eye.svg'" />
            </button>
          </div>
        </div>

        <!-- Alamat -->
        <div class="form-group px-5 flex flex-col gap-1">
          <label for="address_acc" class="block font-bold mb-2">Alamat Pengguna</label>
          <textarea :class="{ 'opacity-80 cursor-not-allowed': !isEditable }" :disabled="!isEditable" id="address_acc"
            name="address_acc" placeholder="Enter your comment" rows="4" v-model="user.address_acc"
            class="w-full p-2 border border-gray-300 rounded mb-4 focus:border-gray-500 focus:outline-none"></textarea>
        </div>

        <!-- Raport -->
        <div class="form-group px-5 flex flex-col gap-1">
          <label for="raport_user" class="block font-bold mb-2">Raport</label>
          <div class="flex items-center">
            <input :class="{ 'opacity-80 cursor-not-allowed': !isEditable }" :disabled="!isEditable" type="text"
              id="raport_user" name="raport_user" placeholder="KTP" :value="'Raport ' + user.fullname + '.pdf'"
              class="w-full p-2 border border-gray-300 rounded outline-none mr-2 mb-5" readonly>
            <!-- Tombol tampil modal -->
            <button type="button" @click="showModal(user.raport_user)"
              class="bg-success text-white px-4 py-2 rounded mb-5 hover:bg-succes-shade transition ease-in-out duration-200">
              <img class="w-6" :src="'/eye.svg'" />
            </button>
          </div>
        </div>

        <!-- Edit, Save, Delete, and Cancel buttons -->
        <div class="absolute bottom-5 right-5 flex gap-2">
          <button type="button" @click="editUser"
            class="rounded-md bg-yellow-500 px-7 py-3 text-md font-semibold text-white shadow-sm hover:bg-yellow-700 transition duration-150 ease-out hover:ease-in">Edit</button>
          <button v-if="isEditing" type="button" @click="cancelEdit"
            :class="{ 'opacity-50 cursor-not-allowed': !isEditable }" :disabled="!isEditable"
            class="rounded-md bg-gray-600 px-7 py-3 text-md font-semibold text-white shadow-sm hover:bg-gray-700 transition duration-150 ease-out hover:ease-in">Batal</button>
          <button type="submit" :class="{ 'opacity-50 cursor-not-allowed': !isEditable }" :disabled="!isEditable"
            class="rounded-md bg-teal-600 px-7 py-3 text-md font-semibold text-white shadow-sm hover:bg-teal-700 transition duration-150 ease-out hover:ease-in">Simpan</button>
          <button type="button" @click="deleteUser" :class="{ 'opacity-50 cursor-not-allowed': !isEditable }"
            :disabled="!isEditable"
            class="rounded-md bg-red-600 px-7 py-3 text-md font-semibold text-white shadow-sm hover:bg-red-700 transition duration-150 ease-out hover:ease-in">Delete</button>
        </div>
      </form>
    </div>

    <!-- Modal -->
    <transition name="modal">
      <div v-if="modal.show" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div class="bg-white rounded-lg shadow-xl w-3/4 h-[800px] p-4">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl">Detail Dokumen</h2>
            <button @click="modal.show = false" class="text-gray-400 hover:text-gray-600 focus:outline-none">
              <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <iframe v-if="modal.url" :src="modal.url" class="w-full h-[700px]" frameborder="0"></iframe>
        </div>
      </div>
    </transition>

  </div>
</template>


<script>
import TitleBar from '~/components/TitleBar.vue';
import TombolButton from '~/components/TombolButton.vue';
import Swal from 'sweetalert2';

export default {
  components: { TitleBar, TombolButton },
  layout: 'admin',
  data() {
    return {
      user: null,
      isEditable: false,
      isEditing: false,
      modal: {
        show: false,
        url: null,
      },
    };
  },
  async fetch({ params, $axios }) {
    const response = await $axios.$get(`https://6662bec962966e20ef09d5d2.mockapi.io/api/users/${params.id}`);
    return { user: response };
  },
  async asyncData({ params, $axios }) {
    try {
      const response = await $axios.$get(`https://6662bec962966e20ef09d5d2.mockapi.io/api/users/${params.id}`);
      return { user: response };
    } catch (error) {
      console.error('Error fetching user:', error);
      return { user: null };
    }
  },
  methods: {
    editUser() {
      Swal.fire({
        title: 'Apakah anda yakin ingin melakukan edit data pengguna?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.isEditable = true;
          this.isEditing = true; // Tampilkan tombol Batal
        }
      });
    },
    updateUser() {
      Swal.fire({
        title: 'Apakah Anda yakin?',
        text: "Anda tidak akan dapat membatalkan ini!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, simpan!',
        cancelButtonText: 'Batal'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await this.$axios.$put(`https://6662bec962966e20ef09d5d2.mockapi.io/api/users/${this.user.id}`, this.user);
            console.log('User updated:', response);
            Swal.fire(
              'Berhasil!',
              'Data pengguna telah diubah.',
              'success'
            ).then(() => {
              this.$router.push('/users');
            });
          } catch (error) {
            console.error('Error updating user:', error);
            Swal.fire(
              'Gagal!',
              'Terjadi kesalahan saat mengubah data pengguna.',
              'error'
            );
          }
        }
      });
    },
    deleteUser() {
      Swal.fire({
        title: 'Apakah Anda yakin?',
        text: "Anda tidak akan dapat membatalkan ini!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await this.$axios.$delete(`https://6662bec962966e20ef09d5d2.mockapi.io/api/users/${this.user.id}`);
            console.log('User deleted:', response);
            Swal.fire(
              'Berhasil!',
              'Pengguna telah dihapus.',
              'success'
            ).then(() => {
              this.$router.push('/users');
            });
          } catch (error) {
            console.error('Error deleting user:', error);
            Swal.fire(
              'Gagal!',
              'Terjadi kesalahan saat menghapus pengguna.',
              'error'
            );
          }
        }
      });
    },
    updateUserRole(event) {
      this.user.user_role = parseInt(event.target.value);
    },
    cancelEdit() {
      Swal.fire({
        title: 'Apakah Anda yakin?',
        text: "Anda akan membatalkan perubahan!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, batalkan!',
        cancelButtonText: 'Tidak'
      }).then((result) => {
        if (result.isConfirmed) {
          this.isEditable = false;
          this.isEditing = false; // Sembunyikan tombol Batal
        }
      });
    },
    showModal(docUrl) {
      const fileId = docUrl.match(/\/d\/(.*?)\//)[1];
      const viewerLink = `https://drive.google.com/file/d/${fileId}/preview`;
      this.modal.url = viewerLink;
      this.modal.show = true;
    }
  },
};
</script>


<style scoped>
.kembali-button:hover {
  background-color: #045C57;
}

.user-detail-container {
  padding: 20px;
}

.user-detail-container h2 {
  margin-bottom: 20px;
}

.user-detail-container ul {
  list-style-type: none;
  padding: 0;
}

.user-detail-container li {
  background: #f9f9f9;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
}
</style>
