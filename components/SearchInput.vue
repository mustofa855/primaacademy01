<template>
  <div>
    <input
      type="text"
      placeholder="Cari Data..."
      class="w-80 shadow-md rounded-md p-2 px-4 transition focus:ring focus:ring-primary outline-none"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>
<script>
export default {

}
</script>
