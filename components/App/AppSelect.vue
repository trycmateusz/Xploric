<template>
  <div class="flex flex-col gap-2">
    <label class="text-xl" :for="name">
      {{ label }}
    </label>
    <select
      :id="name"
      :disabled="isDisabled"
      class="p-4 min-w-fit w-1/2 bg-black-lighter border border-black-main main-transition cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed"
      :name="name"
      @change="emitValueChange"
    >
      <option
        v-for="option in options"
        :key="option"
        class="p-4"
        :value="option"
        :selected="option === modelValue"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
type ModelValue = string | number
defineProps<{
  name: string
  label: string
  modelValue: ModelValue
  options: ModelValue[]
  isDisabled?: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: ModelValue): void
}>()
const emitValueChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped lang="scss">
select {
  appearance: none;
  background-image: url('~/assets/img/arrow-down.svg');
  background-repeat: no-repeat;
  background-size: 1rem;
  background-position: center right 1rem;
  &::-ms-expand {
    display: none;
  }
}
</style>
