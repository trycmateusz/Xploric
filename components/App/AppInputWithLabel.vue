<template>
  <div class="flex flex-col gap-2">
    <label
      class="inline-block w-max text-xl"
      :class="{ 'hidden': error }"
      :for="name"
    >
      {{ label }}
    </label>
    <span
      v-if="error"
      class="text-xl text-red-main"
    >
      {{ errorMessage }}
    </span>
    <input
      :id="name"
      class="p-4 rounded-full bg-black-lighter main-transition hover:text-light-blue-lighter focus:text-light-blue-lighter"
      :name="name"
      :value="modelValue"
      :type="type"
      :autocomplete="autocomplete"
      v-bind="attrs"
      @input="emitValueChange"
    >
  </div>
</template>

<script setup lang="ts">
type ModelValue = string | number | undefined
const props = defineProps<{
  type: string
  name: string
  label: string
  error?: string
  attrs: Object
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
const errorMessage = computed(() => {
  if (props.error) {
    return `${props.label} ${props.error.split(' ').slice(1).join(' ')}`
  }
})
</script>

<style scoped>

</style>
