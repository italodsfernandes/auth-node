import { NextFunction, Response, Request } from 'express'

export const errorMiddleware = (
   error: any,
   request: Request,
   response: Response,
   next: NextFunction,
) => {
   if (error.statusCode) {
      response.status(error.statusCode).json({
         statusCode: error.statusCode,
         message: error.message,
      })
      return
   }

   response.status(500).json({
      statusCode: 500,
      message: error.message,
   })
   next(error)
}
