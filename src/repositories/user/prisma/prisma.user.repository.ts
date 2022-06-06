import { prisma } from '../../../database/prisma/client'
import { CreateUserRequest, UserRepository } from '../user.repository'

export class PrismaUserRepository implements UserRepository {
   async findByEmail(email: string) {
      const user = await prisma.user.findFirst({ where: { email } })
      return user
   }

   async create(data: CreateUserRequest) {
      const { password, ...user } = await prisma.user.create({
         data,
      })

      return user
   }
}
