<template>
  <li class="flex flex-col w-full gap-4 items-end">
    <span class="block p-4 bg-black-lighter rounded-xl w-fit">
      {{ comment.text }}
    </span>
    <div class="flex flex-col gap-4 justify-end text-sm items-end sm:flex-row sm:gap-8 sm:items-center">
      <div
        :data-rating-negative="isRatingNegative"
        class="rating-box flex gap-4 items-center"
      >
        <CommentListItemVote
          v-if="user"
          :username="user.username"
          :text="comment.text"
          vote="upvote"
          :chosen="isUpvoted"
        />
        <span class="rating">
          {{ comment.rating }}
        </span>
        <CommentListItemVote
          v-if="user"
          :username="user.username"
          :text="comment.text"
          vote="downvote"
          :chosen="isDownvoted"
        />
      </div>
      <div
        v-if="user"
        class="flex-shrink flex items-center gap-2"
      >
        <button v-if="userStore.auth?.id === comment.userId" class="main-transition">
          <img src="~/assets/img/bin.svg" alt="Remove comment">
        </button>
        <button
          class="h-[1.5em] main-transition"
          @click="commentStore.closeAllRepliesButOne(comment)"
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
      v-if="user && comment.replyOpen"
      :username="user.username"
      @close="commentStore.closeOneReply(comment)"
    />
  </li>
</template>

<script setup lang="ts">
import type { Comment } from '~/types/Comment'
const props = defineProps<{
  comment: Comment
}>()
const userStore = useUserStore()
const commentStore = useCommentStore()
const isRatingNegative = computed(() => {
  return props.comment.rating < 0
})
const user = computed(() => {
  return userStore.getUser(props.comment.userId)
})
const isUpvoted = computed(() => {
  if (userStore.auth && props.comment.ratedBy) {
    if (userStore.auth.id in props.comment.ratedBy) {
      return props.comment.ratedBy[userStore.auth.id] === 1
    }
  }
  return false
})
const isDownvoted = computed(() => {
  if (userStore.auth && props.comment.ratedBy) {
    if (userStore.auth.id in props.comment.ratedBy) {
      return props.comment.ratedBy[userStore.auth.id] === -1
    }
  }
  return false
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
~/stores/types/Comment
