<template>
  <div class="h-full">
    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>
  </div>
</template>

<script setup>
import { getCookieValue } from '~/helpers/cookie'
const currentAudioStore = useCurrentAudioStore()
onMounted(() => {
  const volume = getCookieValue('volume')
  if(volume && +volume !== NaN){
    currentAudioStore.setVolume(+volume)
  }
})

</script>
