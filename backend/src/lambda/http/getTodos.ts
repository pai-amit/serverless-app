
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getUserId } from '../utils'
import { getTodos } from '../../businessLogic/todos'
import { createLogger } from '../../utils/logger'
import 'source-map-support/register'

const logger = createLogger('getTodos')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const userId = getUserId(event)
  logger.info(`Fetch all To-Do items for the user ${userId}`)
  const todoItems = await getTodos(userId)
  return {
    statusCode: 200,
    body: JSON.stringify({
      items: todoItems
    })
  }
}).use(
  cors({
    credentials: true
  })
)