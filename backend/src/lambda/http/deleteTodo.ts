
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { APIGatewayProxyEvent, APIGatewayProxyResult, } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { deleteTodo, getTodoById } from '../../businessLogic/todos'
import { getUserId } from '../utils'
import 'source-map-support/register'

const logger = createLogger('deleteTodo')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const userId = getUserId(event)
  const result = await getTodoById(userId, todoId)

  if (result.Count === 0) {
    logger.warn(`Cannot delete a To-Do item as it does not esist!}`)
    return {
      statusCode: 400,
      body: JSON.stringify(`Todo does not exist`)
    }
  }

  logger.info(`Deleting todo ${todoId} for user ${userId}`)
  await deleteTodo(userId, todoId)
  return {
    statusCode: 200,
    body: ''
  }
}).use(
  cors({
    credentials: true
  })
)