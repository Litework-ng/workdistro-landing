import { Handler } from "@netlify/functions"

export const handler: Handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true }),
  }
}
