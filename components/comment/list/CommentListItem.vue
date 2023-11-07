<template>
  <li>
    {{ comment.text }}
  </li>
</template>

<script setup lang="ts">
import type { Comment } from '~/types/Comment'
defineProps<{
  comment: Comment
}>()
</script>

<style scoped>

</style>
