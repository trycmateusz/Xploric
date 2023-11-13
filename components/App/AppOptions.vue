<template>
  <ul class="absolute">
    <li
      v-for="option in options"
      :key="option.id"
    >
      <nuxt-link
        v-if="'to' in option"
        :to="option.to"
      >
        {{ option.text }}
      </nuxt-link>
      <button
        v-if="'onClick' in option"
        @click="option.onClick"
      >
        {{ option.text }}
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { AppOptionLink, AppOptionButton } from '~/types/App'
defineProps<{
  options: (AppOptionLink | AppOptionButton)[]
}>()
</script>

<style scoped>

</style>
