<template>
  <div class="fixed top-[25%] w-full pointer-events-none z-50">
    <ul
      class="wrapper flex flex-col gap-2 px-4 justify-end items-end"
    >
      <transition-group name="list">
        <li
          v-for="notification in notifications"
          :key="notification.id"
          class="relative rounded-md bg-black-darker border border-black-lighter text-center text-white px-12 py-4 pointer-events-auto"
        >
          <button
            aria-label="Remove notification"
            class="absolute top-0 right-0 px-2 py-1 leading-none text-gray-main"
            @click="removeNotification(notification.id)"
          >
            x
          </button>
          <span>
            {{ notification.message }}
          </span>
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { notifications, removeNotification } = usePopupNotifications()
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: opacity .3s;
}
.list-leave-active {
  position: absolute;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
}
</style>
