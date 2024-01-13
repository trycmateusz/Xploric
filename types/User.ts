const userPrivacyOptionsAsReadonly = ['Never', 'Through a link', 'Always'] as const
export const userPrivacyOptions = [...userPrivacyOptionsAsReadonly]

type UserPrivacyOptionsTuple = typeof userPrivacyOptionsAsReadonly

export type UserPrivacyOption = UserPrivacyOptionsTuple[number]

export interface UserRatingsNonNullable {
  downvotes: string[]
  upvotes: string[]
}
export interface UserRatings extends Partial<UserRatingsNonNullable> {}
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
