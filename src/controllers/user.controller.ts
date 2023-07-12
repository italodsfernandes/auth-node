import { Request, Response } from 'express'
import { PrismaUserRepository } from '../repositories/user/prisma/prisma.user.repository'
import { AuthenticateUserService } from '../services/user/authenticateUser.service'
import { CreateUserService } from '../services/user/createUser.service'

export class UserController {
   private userRepository: UserRepository

   constructor() {
      this.userRepository = new PrismaUserRepository();
   }

   async create(request: Request, response: Response) {

      const { name, email, password } = request.body

      const createUserService = new CreateUserService(this.userRepository)

      const user = await createUserService.execute({ name, email, password })

      return response.status(201).json(user)
   }

   async authenticate(request: Request, response: Response) {

      const { email, password } = request.body

      const authenticateUserService = new AuthenticateUserService(
         this.userRepository,
      )

      const token = await authenticateUserService.execute({ email, password })

      response.json(token)
   }
}
