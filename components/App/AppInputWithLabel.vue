<template>
  <div class="flex flex-col gap-2">
    <label class="text-xl" :for="name">
      {{ label }}
    </label>
    <input
      :id="name"
      class="p-4 rounded-full bg-black-lighter main-transition hover:text-light-blue-lighter focus:text-light-blue-lighter"
      :name="name"
      :value="modelValue"
      :type="type"
      :autocomplete="autocomplete"
      @input="emitValueChange"
    >
  </div>
</template>

<script setup lang="ts">
type ModelValue = string | number
defineProps<{
  type: string
  name: string
  label: string
  autocomplete: string
  modelValue: ModelValue
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: ModelValue): void
}>()
const emitValueChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped>

</style>
