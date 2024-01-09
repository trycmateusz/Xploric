const userPrivacyOptionsAsReadonly = ['Never', 'Through a link', 'Always'] as const
export const userPrivacyOptions = [...userPrivacyOptionsAsReadonly]

type UserPrivacyOptionsTuple = typeof userPrivacyOptionsAsReadonly

export type UserPrivacyOption = UserPrivacyOptionsTuple[number]

export interface UserRatedComments {
  [userId: string]: 1 | -1
}

export interface User {
  id: string
  username: string
  playlists?: string[]
  comments?: string[]
  favourites?: string[]
  rated?: UserRatedComments
  profileBgUrl?: string
  public: UserPrivacyOption
  inReviews: UserPrivacyOption
}
