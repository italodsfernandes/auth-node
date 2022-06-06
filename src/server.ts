import 'express-async-errors'
import express from 'express'
import { errorMiddleware } from './middleware/error.middleware'
import { router } from './routes'
import { SERVER } from './config/default'

export const app = express()

app.use(express.json())
app.use(router)
app.use(errorMiddleware)

app.listen(SERVER.PORT || 3333, () =>
   console.info(`Server is running on port  ${SERVER.PORT}`),
)
