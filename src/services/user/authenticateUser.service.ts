import { compareSync } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { BadRequestError } from '../../errors'
import { JWT } from '../../config/default'
import {
   AuthenticateUserRequest,
   UserRepository,
} from '../../repositories/user/user.repository'

export class AuthenticateUserService {
   constructor(private userRepository: UserRepository) {}

   async execute({ email, password }: AuthenticateUserRequest) {
      const userExists = await this.userRepository.findByEmail(email)

      if (!userExists) {
         throw new BadRequestError(`User or password incorrect.`)
      }

      const passwordMatch = compareSync(password, userExists.password || '')

      if (!passwordMatch) {
         throw new BadRequestError(`User or password incorrect.`)
      }

      delete userExists.password

      const accessToken = sign({ ...userExists }, JWT.SECRET || '', {
         subject: userExists.id,
         expiresIn: '1h',
      })

      return { ...userExists, accessToken }
   }
}
