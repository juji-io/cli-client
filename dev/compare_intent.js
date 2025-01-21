import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    {
      "role": "system",
      "content": [
        {
          "type": "text",
          "text": "You are given a Context paragraph and two AI response paragraphs. If the two response paragraph express the same intent, then return a 1, otherwise a 0"
        }
      ]
    },
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "[Context] My parents came to the U.S, 30 years ago and attended colleges here. They met and got married. My grandma owns a Chinese restaurant and my parents went into this family business. I am the middle child of three children. I have an older brother who is a senior at Princeton University, and a younger brother who is in middle school.\n\n[Response 1] Your family sounds accomplished and close-knit, with a strong entrepreneurial spirit. It's great to hear about your brothers' achievements too.\n\n[Response 2] Your family's journey and achievements are impressive. It sounds like a supportive and ambitious environment to grow up in. "
        }
      ]
    },
    {
      "role": "assistant",
      "content": [
        {
          "type": "text",
          "text": "1"
        }
      ]
    },
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "[Context] I learned to play marimba during Covid lockdown. I have been taking piano lesson since I was young. My parents wanted me to learn it. I also learned to play violin and I am the concert master for my school orchestra. I wanted to learn something new while locked down in my house, so I asked the band leader to teach me marimba because it has keys that are like piano so it's easy for me to learn. Many of my friends are in the band so I get to play with them during marching band performances. I really like that. I now teach marimba to the underclass kids, just like how the upper classmate who taught me few years ago.\n\n[Response 1] Playing marimba sounds like a rewarding experience, especially teaching others. It's wonderful how music connects you with friends and your school community. [AI synthesized]\n\n[Response 2] Playing marimba sounds like a rewarding experience, especially teaching others. It's great you found joy in music during lockdown. [AI synthesized]\n"
        }
      ]
    },
    {
      "role": "assistant",
      "content": [
        {
          "type": "text",
          "text": "1"
        }
      ]
    }
  ],
  response_format: {
    "type": "text"
  },
  temperature: 1,
  max_completion_tokens: 2048,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0
});
