<template>
  <main class="wrapper p-4 text-white-main">
    <form
      class="flex flex-col gap-4"
      @submit.prevent="onSubmit"
    >
      <AppInputWithLabel
        v-model:modelValue="username"
        :attrs="usernameAttrs"
        :error="errors.username"
        label="Username"
        type="text"
        name="username"
        autocomplete="off"
      />
      <AppInputWithLabel
        v-model:modelValue="email"
        :attrs="emailAttrs"
        :error="errors.email"
        label="E-mail address"
        type="email"
        name="email"
        autocomplete="off"
      />
      <AppInputWithLabel
        v-model:modelValue="password"
        :attrs="passwordAttrs"
        :error="errors.password"
        label="Password"
        type="password"
        name="password"
        autocomplete="off"
      />
      <AppInputWithLabel
        v-model:modelValue="passwordConfirm"
        :attrs="passwordConfirmAttrs"
        :error="errors.passwordConfirm"
        label="Confirm password"
        type="password"
        name="passwordConfirm"
        autocomplete="off"
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
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import type { RegisterData } from '~/types/Register'
definePageMeta({
  layout: 'default'
})
const { defineField, errors, handleSubmit } = useForm<RegisterData>({
  validationSchema: toTypedSchema(yup.object({
    username: yup.string().min(3).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    passwordConfirm: yup.string().required().oneOf([yup.ref('password')], 'Passwords do not match')
  }))
})
const [username, usernameAttrs] = defineField('username', { validateOnModelUpdate: false })
const [email, emailAttrs] = defineField('email', { validateOnModelUpdate: false })
const [password, passwordAttrs] = defineField('password', { validateOnModelUpdate: false })
const [passwordConfirm, passwordConfirmAttrs] = defineField('passwordConfirm', { validateOnModelUpdate: false })
const onSubmit = handleSubmit((values) => {
  const { passwordConfirm, ...formData } = values
})
</script>

<style scoped>

</style>
