const userPrivacyOptionsAsReadonly = ['Never', 'Through a link', 'Always'] as const
export const userPrivacyOptions = [...userPrivacyOptionsAsReadonly]

type UserPrivacyOptionsTuple = typeof userPrivacyOptionsAsReadonly

export type UserPrivacyOption = UserPrivacyOptionsTuple[number]

export interface UserRatings {
  downvotes?: string[]
  upvotes?: string[]
}
export interface User extends UserRatings {
  id: string
  username: string
  playlists?: string[]
  comments?: string[]
  favourites?: string[]
  profileBgUrl?: string
  public: UserPrivacyOption
  inReviews: UserPrivacyOption
}
