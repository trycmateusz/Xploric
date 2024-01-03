<template>
  <div
    class="relative w-1/2 flex justify-center aspect-square ml-auto mr-auto rounded-xl bg-black-lighter overflow-hidden main-transition"
  >
    <img v-if="!coverImgUrl" src="~/assets/img/playlist-add-placeholder.svg" alt="">
    <img v-else :src="coverImgUrl" class="w-auto min-h-full max-w-max" alt="">
    <input class="absolute w-full h-full opacity-0 cursor-pointer" type="file" name="" @change="checkFileIfImage">
  </div>
</template>

<script setup lang="ts">
defineProps<{
  coverImgUrl: string | null
}>()
const emit = defineEmits<{
  (e: 'set-cover-url', imgUrl: string): void
}>()
const checkFileIfImage = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (!input.files[0].type.startsWith('image')) {
    return
  }
  emit('set-cover-url', URL.createObjectURL(input.files[0]))
}
</script>

<style scoped>

</style>
