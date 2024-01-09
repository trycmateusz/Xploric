<template>
  <button class="vote-btn main-transition">
    <img
      :src="imgSrc"
      :alt="`${vote} ${username}'s comment`"
    >
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  vote: 'upvote' | 'downvote'
  username: string
  text: string
}>()
const { getAbsolutePath } = useImages()
const imgSrc = computed(() => {
  if (props.vote) {
    return getAbsolutePath(`~/assets/img/${props.vote}-filled.svg`)
  } else {
    return getAbsolutePath(`~/assets/img/${props.vote}-border.svg`)
  }
})
</script>

<style scoped>

</style>
