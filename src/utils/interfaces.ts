export interface LoginCredentials {
  email: string
  password: string
}

export interface RegistrationCredentials {
  email: string
  name: string
  password: string
  repeatPassword: string
}

export interface RestorePasswordCredentials {
  password: string
  repeatPassword: string
}

export interface UpdatingCredentials {
  email: string
  name: string
  password: string
  repeatPassword: string
}

export interface UserData {
  email: string
  name: string
}
