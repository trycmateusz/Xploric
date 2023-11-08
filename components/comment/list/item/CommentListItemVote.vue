<template>
  <button class="vote-btn">
    <img
      :src="imgSrc"
      :alt="`Upvote ${username}'s comment: ${text}`"
    >
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  vote: 'upvote' | 'downvote'
  chosen: boolean
  username: string
  text: string
}>()
const { getAbsolutePath } = useImages()
const imgSrc = computed(() => {
  if (props.chosen) {
    return getAbsolutePath(`~/assets/img/${props.vote}-filled.svg`)
  } else {
    return getAbsolutePath(`~/assets/img/${props.vote}-border.svg`)
  }
})
</script>

<style scoped>

</style>
