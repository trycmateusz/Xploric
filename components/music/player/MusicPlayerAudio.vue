<template>
  <audio
    ref="audio"
    controls
    preload="metadata"
    :src="previewUrl"
    @loadeddata="emit('audio-data-loaded')"
  >
    <a :href="previewUrl">
      Download {{ songName }}
    </a>
  </audio>
</template>

<script setup lang="ts">
defineProps<{
  songName: string
  previewUrl: string
}>()
const audio = ref<HTMLAudioElement | undefined>(undefined)
onMounted(() => {
  if (audio.value) {
    emit('set-audio', audio.value)
  }
})
const emit = defineEmits<{
  (e: 'audio-data-loaded'): void
  (e: 'set-audio', tag: HTMLAudioElement): void
}>()
</script>

<style scoped>

</style>
