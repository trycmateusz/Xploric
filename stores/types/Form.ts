import type { UserPrivacyOption } from '~/types/User'

export interface FormEdit {
  username: string
  password: string
  email: string
  public: UserPrivacyOption
  inReviews: UserPrivacyOption
}
