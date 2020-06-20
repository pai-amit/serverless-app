import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'
import { getImageSignedUrl } from '../../businessLogic/store'
import { getTodoById } from '../../businessLogic/todos'
import 'source-map-support/register'



const logger = createLogger('generateUploadUrl')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const userId = getUserId(event)
  const result = await getTodoById(userId, todoId)

  if (result.Count === 0) {
    logger.warn(`The To-Do item does not exist!`)
    return {
      statusCode: 400,
      body: JSON.stringify(`The To-Do item does not exist!`)
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      uploadUrl: getImageSignedUrl(todoId)
    })
  }
}).use(
  cors({
    credentials: true
  })
)
