
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createTodo } from '../../businessLogic/todos'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import 'source-map-support/register'

const logger = createLogger('createTodo')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newTodo: CreateTodoRequest = JSON.parse(event.body)
  const userId = getUserId(event)

  logger.info(`Creating a new To-Do : ${newTodo} for the User : ${userId}`)
  const newTodoItem = await createTodo(userId, newTodo)
  return {
    statusCode: 201,
    body: JSON.stringify({
      item: newTodoItem
    })
  }
}).use(
  cors({
    credentials: true
  })
)