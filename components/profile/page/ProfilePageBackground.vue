<template>
  <div
    v-if="bgUrl"
    :data-loaded="bgLoaded"
    class="background h-[40vh] max-h-[500px] w-full bg-center bg-cover"
  />
  <div
    v-else-if="!bgLoaded"
    class="h-[40vh] max-h-[500px] bg-black-darker"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  bgUrl: string | undefined
}>()
const bgLoaded = ref(false)
const bgImageValue = computed(() => {
  return `url('${props.bgUrl}')`
})
onMounted(() => {
  bgLoaded.value = true
})
</script>

<style scoped>
.background[data-loaded="true"]{
  background-image: v-bind(bgImageValue);
}
</style>
