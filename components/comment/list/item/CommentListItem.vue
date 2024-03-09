<template>
  <li class="flex flex-col w-full gap-4 items-end">
    <span class="block p-4 bg-black-lighter rounded-tl-xl rounded-tr-xl rounded-bl-xl rouded-br-none break-words w-fit max-w-full">
      {{ comment.text }}
    </span>
    <div class="flex flex-col gap-4 justify-end text-sm items-end sm:flex-row sm:gap-8 sm:items-center">
      <div
        :data-rating-negative="isRatingNegative"
        class="rating-box flex gap-4 items-center"
      >
        <CommentListItemRating
          v-if="user"
          :username="user?.username"
          :rating="rating"
          :rated="authRatingValue"
          @toggle-rating="toggleRating"
        />
      </div>
      <div
        v-if="user"
        class="flex-shrink flex items-center gap-2"
      >
        <button
          v-if="userStore.auth?.id === comment.userId"
          class="main-transition"
          @click="commentStore.deleteComment(props.comment.id, props.comment.responseTo)"
        >
          <img src="~/assets/img/bin.svg" alt="Remove comment">
        </button>
        <button
          class="h-[1.5em] main-transition"
          @click="emit('toggle-reply', comment.id)"
        >
          <img
            class="h-full"
            src="~/assets/img/reply.svg"
            :alt="`Reply to ${user.username}'s comment`"
          >
        </button>
        <nuxt-link class="flex gap-2 items-center main-transition" :to="`/user/${user.id}`">
          <img class="h-[1.5em]" src="~/assets/img/user.svg" alt="">
          {{ user.username }}
        </nuxt-link>
      </div>
    </div>
    <CommentList
      v-if="comment.responses && comment.responses.length > 0"
      class="mt-4 pr-8 border-r-2 border-black-lighter"
      :for-responses="true"
      :comments="commentStore.getResponses(comment.responses)"
    />
    <CommentListItemResponse
      v-if="user && replyOpen"
      :comment-id="comment.id"
      :playlist-id="comment.playlistId"
      :username="user.username"
      @reply="(text) => replyToComment(text)"
    />
  </li>
</template>

<script setup lang="ts">
import type { Comment, CommentRatingOptions } from '~/types/Comment'
const props = defineProps<{
  comment: Comment
  replyOpen: boolean
}>()
const emit = defineEmits<{
  (e: 'toggle-reply', id: string): void
  (e: 'close-reply'): boolean
}>()
const userStore = useUserStore()
const commentStore = useCommentStore()
const rating = ref(props.comment.rating)
const authRatingValue = ref<CommentRatingOptions>(userStore.getAuthCommentRating(props.comment.id))
const isRatingNegative = computed(() => {
  return rating.value < 0
})
const user = computed(() => {
  return userStore.getUser(props.comment.userId)
})
console.log(user.value)
const replyToComment = async (text: string) => {
  let replied: Comment | undefined
  if (props.comment.responseTo) {
    replied = await commentStore.createResponse(text, props.comment.responseTo, props.comment.playlistId)
  } else {
    replied = await commentStore.createResponse(text, props.comment.id, props.comment.playlistId)
  }
  if (replied) {
    emit('close-reply')
  }
}
const toggleRating = (newRating: -1 | 1) => {
  if (newRating === -1) {
    commentStore.toggleCommentDownvote(props.comment.id)
  } else if (newRating === 1) {
    commentStore.toggleCommentUpvote(props.comment.id)
  }
  if (newRating === authRatingValue.value) {
    authRatingValue.value = 0
  } else {
    authRatingValue.value = newRating
  }
}
watch(authRatingValue, (newRating, oldRating) => {
  if (oldRating === -1) {
    rating.value += newRating + 1
  } else if (oldRating === 1) {
    rating.value += newRating - 1
  } else {
    rating.value += newRating
  }
})
onUnmounted(async () => {
  if (userStore.auth) {
    if (authRatingValue.value !== userStore.getAuthCommentRating(props.comment.id)) {
      await commentStore.updateComment(props.comment.id, {
        rating: rating.value
      })
    }
  }
})
</script>

<style lang="scss">
$black-svg-to-light-blue-lighter: invert(80%) sepia(28%) saturate(399%) hue-rotate(156deg) brightness(93%) contrast(81%);
$black-svg-to-red-main: invert(16%) sepia(38%) saturate(7469%) hue-rotate(351deg) brightness(97%) contrast(77%);
.rating-box {
  &[data-rating-negative="true"]{
    .vote-btn {
      filter: $black-svg-to-red-main;
    }
    .rating {
      color: var(--red-main)
    }
  }
  &[data-rating-negative="false"]{
    .vote-btn {
      filter: $black-svg-to-light-blue-lighter;
    }
    .rating {
      color: var(--light-blue-lighter);
    }
  }
}
</style>
