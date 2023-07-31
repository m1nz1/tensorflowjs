import { Configuration, OpenAIApi } from 'openai'

const configFunction = new Configuration({
  apiKey: process.env.VUE_APP_gpt3
})

const openai = new OpenAIApi(configFunction)

export async function gpt3(input) {
  const pmt = `Human:${input} \nAI:`
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    prompt: pmt,
    messages: [
      {
        role: 'system',
        content: '40대 남성'
      },
      {
        role: 'user',
        content: '담배주세요'
      },
      {
        role: 'assistant',
        content: '미성년자는 안됩니다. 신분증 주세요'
      },
      {
        role: 'user',
        content: '${pmt}'
      }
    ]
  })

  const answer = response.data.choices[0].text
  return answer
}
