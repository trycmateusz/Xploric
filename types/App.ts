export interface AppOption {
  id: string
  text: string
  red?: boolean
}

export interface AppOptionLink extends AppOption {
  to: string
}

export interface AppOptionButton extends AppOption {
  onClick: Function
}
