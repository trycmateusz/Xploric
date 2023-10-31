<template>
  <button
    class="max-w-max py-[0.6rem] px-[3rem] text-xl rounded-full break-words focus:outline-offset-8 hover:opacity-70 focus:opacity-70 transition-opacity"
    :class="[styling]"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  styling: 'primary' | 'secondary' | 'tertiary'
  text: string
}>()
</script>

<style lang="scss" scoped>
.primary {
  @apply bg-light-blue-lighter text-black-main
}
.secondary {
  @apply text-white-main border-black-lighter border
}
</style>
