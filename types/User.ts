const userPrivacyOptionsAsReadonly = ['Never', 'Through a link', 'Always'] as const
export const userPrivacyOptions = [...userPrivacyOptionsAsReadonly]

type UserPrivacyOptionsTuple = typeof userPrivacyOptionsAsReadonly

export type UserPrivacyOption = UserPrivacyOptionsTuple[number]

export interface User {
  id: string
  username: string
  playlists: string[] | null
  favourites: string[] | null
  profileBgUrl: string | null
  public: UserPrivacyOption
  inReviews: UserPrivacyOption
}
