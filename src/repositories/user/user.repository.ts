export type AuthenticateUserRequest = {
   email: string
   password: string
}

export type CreateUserRequest = {
   name: string
   email: string
   password: string
}

export type UserResponse = {
   id: string
   name: string
   email: string
   password?: string
}

export type UserRepository = {
   findByEmail: (email: string) => Promise<UserResponse | null>
   create: (data: CreateUserRequest) => Promise<UserResponse>
}
