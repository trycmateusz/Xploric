<template>
  <div>
    <button
      class="background relative w-full main-transition focus:outline-none"
      aria-label="Change profile's background image"
      @click="() => console.log('change image')"
    >
      <img
        class="absolute h-1/3 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
        src="~/assets/img/edit-white.svg"
        alt=""
      >
      <ProfilePageBackground
        v-if="user"
        class="opacity-50"
        :bg-url="user.profileBgUrl"
      />
    </button>
    <div class="wrapper p-4 text-white-main">
      <h1 class="text-3xl mb-10 text-light-blue-lighter">
        Editing your profile
      </h1>
      <form class="flex flex-col gap-8" @submit.prevent>
        <AppInputWithLabel
          v-model="formData.username"
          name="username"
          label="Change username"
          type="text"
          autocomplete="username"
        />
        <AppInputWithLabel
          v-model="formData.password"
          name="password"
          label="Change password"
          type="password"
          autocomplete="current-password"
        />
        <AppInputWithLabel
          v-model="formData.email"
          name="email"
          label="Change email"
          type="email"
          autocomplete="email"
        />
        <AppSelect
          v-model="formData.public"
          name="public"
          label="Make account public"
          :options="userPrivacyOptions"
        />
        <AppSelect
          v-model="formData.inReviews"
          name="in-reviews"
          label="Show playlists in 'Review someone's playlist' section"
          :options="userPrivacyOptions"
          :is-disabled="formData.public === 'Never'"
        />
      </form>
      <div class="flex flex-col gap-4 mt-10 items-end">
        <AppButton
          text="Discard"
          styling="secondary"
          @click="router.back()"
        />
        <AppButton
          text="Apply changes"
          styling="primary"
          @click="applyChanges"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import cloneDeep from 'lodash/cloneDeep'
import type { FormEdit } from '~/types/Form'
import type { User } from '~/types/User'
import { userPrivacyOptions } from '~/types/User'
definePageMeta({
  middleware: ['auth']
})
const userStore = useUserStore()
const router = useRouter()
const user = ref<User | null>(cloneDeep(userStore.auth))
const formData = ref<FormEdit>({
  username: user.value?.username || '',
  password: '',
  email: '',
  public: user.value?.public || 'Always',
  inReviews: user.value?.inReviews || 'Always'
})
const applyChanges = () => {
  router.push('/')
}
watch(formData, () => {
  if (formData.value.public === 'Never') {
    formData.value.inReviews = 'Never'
  }
}, {
  deep: true
})
</script>

<style scoped lang="scss">

</style>
