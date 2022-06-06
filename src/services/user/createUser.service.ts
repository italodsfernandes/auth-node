import { hashSync } from 'bcryptjs'
import { BadRequestError } from '../../errors'
import {
   CreateUserRequest,
   UserRepository,
} from '../../repositories/user/user.repository'

export class CreateUserService {
   constructor(private userRepository: UserRepository) {}

   async execute(data: CreateUserRequest) {
      const userExists = await this.userRepository.findByEmail(data.email)

      if (userExists) {
         throw new BadRequestError(`User already exists!`)
      }

      const saltRounds = 10
      const passwordHash = await hashSync(data.password, saltRounds)

      const userCreated = await this.userRepository.create({
         name: data.name,
         email: data.email,
         password: passwordHash,
      })

      return userCreated
   }
}
