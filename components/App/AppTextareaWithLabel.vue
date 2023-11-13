<template>
  <div class="flex flex-col gap-2">
    <label class="inline-block w-max text-xl" :for="name">
      {{ label }}
    </label>
    <textarea
      :id="name"
      class="p-4 rounded-xl min-h-[10rem] resize-none bg-black-lighter main-transition hover:text-light-blue-lighter focus:text-light-blue-lighter"
      :name="name"
      :value="modelValue"
      @input="emitValueChange"
    />
  </div>
</template>

<script setup lang="ts">
type ModelValue = string | number
defineProps<{
  name: string
  label: string
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
