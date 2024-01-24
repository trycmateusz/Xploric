<template>
  <ClientOnly>
    <nav class="sticky w-full top-[Calc(var(--nav-height)_+_1px)] border-b border-black-lighter bg-black-main z-40">
      <div class="flex wrapper">
        <button v-if="router.options.history.state.back" class="p-4 text-base" @click="router.back()">
          <img
            class="h-[1.5em]"
            src="~/assets/img/arrow-left.svg"
          >
        </button>
        <div class="ml-auto">
          <div class="relative">
            <button class="p-4 text-base" @click="volumeExpanded = !volumeExpanded">
              <img
                class="h-[1.5em]"
                src="~/assets/img/volume.svg"
                alt=""
              >
            </button>
            <div class="absolute top-[Calc(100%_+_1rem)] right-4 pointer-events-none">
              <progress
                v-if="volumeExpanded"
                id="volume"
                ref="progress"
                aria-label="Current song progress"
                class="border-black-lighter h-[1.2em] pointer-events-auto cursor-pointer"
                :max="1"
                :value="currentAudioStore.volume"
                @click="setVolume"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  </ClientOnly>
</template>

<script setup lang="ts">
const router = useRouter()
const currentAudioStore = useCurrentAudioStore()
const volumeExpanded = ref(false)
const progress = ref<HTMLProgressElement | undefined>(undefined)
const setVolume = (e: MouseEvent) => {
  if (progress.value) {
    let progressPercentage = +(e.offsetX / progress.value.clientWidth).toFixed(3)
    if (progressPercentage >= 0.97) {
      progressPercentage = 1
    } else if (progressPercentage <= 0.03) {
      progressPercentage = 0
    }
    currentAudioStore.setVolume(progressPercentage)
  }
}
</script>

<style scoped>
::-webkit-progress-bar {
  background-color: var(--black-lighter);
  border: 1px solid var(--black-main);
  border-radius: 100vw;
  overflow: hidden;
}
::-webkit-progress-value {
  background-color: var(--white-main);
}
</style>
