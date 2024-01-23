<template>
  <main class="wrapper p-4 text-white-main">
    <form @submit.prevent class="flex flex-col gap-4">
      <AppInputWithLabel 
        label="Username or e-mail address"
        type="text"
        name="usernameOrEmail"
        autocomplete="off"
        v-model:modelValue="formData.usernameOrEmail"
      />
      <AppInputWithLabel 
        label="Password"
        type="password"
        name="password"
        autocomplete="off"
        v-model:modelValue="formData.password"
      />
      <div class="flex flex-col items-end gap-4 mt-4 sm:flex-row sm:justify-end sm:items-start">
        <AppLink 
          text="Register" 
          styling="secondary" 
          to="/register" 
        />
        <AppButton 
          text="Login" 
          styling="primary" 
        />
      </div>
    </form>
  </main>
</template>

<script setup lang="ts">
import type { LoginData } from '~/types/Login'
definePageMeta({
  layout: 'default',
  middleware: ['logged-in']
})
const formData = ref<LoginData>({
  usernameOrEmail: '',
  password: ''
})
</script>

<style scoped>

</style>