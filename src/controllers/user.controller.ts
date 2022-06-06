import { Request, Response } from 'express'
import { PrismaUserRepository } from '../repositories/user/prisma/prisma.user.repository'
import { AuthenticateUserService } from '../services/user/authenticateUser.service'
import { CreateUserService } from '../services/user/createUser.service'

export class UserController {
   async create(request: Request, response: Response) {
      const userRepository = new PrismaUserRepository()

      const { name, email, password } = request.body

      const createUserService = new CreateUserService(userRepository)

      const user = await createUserService.execute({ name, email, password })

      return response.status(201).json(user)
   }

   async authenticate(request: Request, response: Response) {
      const userRepository = new PrismaUserRepository()

      const { email, password } = request.body

      const authenticateUserService = new AuthenticateUserService(
         userRepository,
      )

      const token = await authenticateUserService.execute({ email, password })

      response.json(token)
   }
}
