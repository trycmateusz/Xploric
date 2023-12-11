<template>
  <div class="rounded-full overflow-hidden" :class="wholeWrapperClasses">
    <progress
      id="songPlayed"
      ref="progress"
      aria-label="Current song progress"
      class="w-full h-6 overflow-hidden align-middle appearance-none"
      :max="currentAudioStore.maxProgressValue"
      :value="currentAudioStore.getCurrentProgress"
      @click="setProgress"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  onWholeWrapper: boolean
}>()
const progress = ref<HTMLProgressElement | undefined>(undefined)
const currentAudioStore = useCurrentAudioStore()
const wholeWrapperClasses = computed(() => {
  if (props.onWholeWrapper) {
    return ['rounded-none']
  }
})
const setProgress = (e: MouseEvent) => {
  if (progress.value && currentAudioStore.current) {
    const progressPercentage = +(e.offsetX / progress.value.clientWidth).toFixed(2)
    currentAudioStore.setCurrentAudioTime(currentAudioStore.current.duration_ms * progressPercentage / 1000)
  }
}
</script>

<style scoped lang="scss">
::-webkit-progress-bar {
  background-color: var(--black-lighter);
}
::-webkit-progress-value {
  background-color: var(--white-main);
  border-radius: 0 100vw 100vw 0;
}
</style>
