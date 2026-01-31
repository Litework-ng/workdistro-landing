import type { Handler } from "@netlify/functions"

export const handler: Handler = async (event) => {
  const { message } = JSON.parse(event.body || "{}")

  if (!message) {
    return {
      statusCode: 400,
      body: "Missing message",
    }
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    return {
      statusCode: 500,
      body: "Telegram env vars not set",
    }
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "Markdown",
    }),
  })

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true }),
  }
}