<template>
  <main class="wrapper p-4 text-white-main">
    <form @submit.prevent class="flex flex-col gap-4">
      <AppInputWithLabel 
        label="Username"
        type="text"
        name="username"
        autocomplete="off"
        v-model:modelValue="formData.username"
      />
      <AppInputWithLabel 
        label="E-mail address"
        type="email"
        name="email"
        autocomplete="off"
        v-model:modelValue="formData.email"
      />
      <AppInputWithLabel 
        label="Password"
        type="password"
        name="password"
        autocomplete="off"
        v-model:modelValue="formData.password"
      />
      <AppInputWithLabel 
        label="Confirm password"
        type="password"
        name="passwordConfirm"
        autocomplete="off"
        v-model:modelValue="formData.passwordConfirm"
      />
      <div class="flex flex-col items-end gap-4 mt-4 sm:flex-row sm:justify-end sm:items-start">
        <AppButton 
          text="Register" 
          styling="primary" 
        />
      </div>
    </form>
  </main>
</template>

<script setup lang="ts">
import type { RegisterData } from '~/types/Register'
definePageMeta({
  layout: 'default'
})
const formData = ref<RegisterData>({
  username: '',
  email: '',
  password: '',
  passwordConfirm: ''
})
</script>

<style scoped>

</style>