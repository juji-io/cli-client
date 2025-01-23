#!/usr/bin/env node

import dotenv from 'dotenv';
dotenv.config();
//import punycode from 'punycode';

import { request } from "http";
import OpenAI from "openai";
import { text } from "stream/consumers";
//require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const system_prompt = "You are given a Context paragraph and two AI response paragraphs. If the two response paragraph express the same intent, then return a 0, otherwise a 1";
const user_prompt = "[Context] $CONTEXT\n\n[Response 1] $P1\n\n[Response 2] $P2";
let context = "My parents came to the U.S, 30 years ago and attended colleges here. They met and got married. My grandma owns a Chinese restaurant and my parents went into this family business. I am the middle child of three children. I have an older brother who is a senior at Princeton University, and a younger brother who is in middle school.";
let p1 = "Your family sounds accomplished and close-knit, with a strong entrepreneurial spirit. It's great to hear about your brothers' achievements too.";
let p2 = "Your family's journey and achievements are impressive. It sounds like a supportive and ambitious environment to grow up in.";

var request_messages_template = {
  model: "gpt-4o",
  messages: [
    {
      "role": "system",
      "content": [
        {
          "type": "text",
          "text": system_prompt
        }
      ]
    },
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": ""
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
}

//
//
//
async function compare_intent(context1, para1, para2) {

  let request_messages = structuredClone(request_messages_template);

  let text1 = user_prompt;
  text1 = text1.replace("$CONTEXT", context1);
  text1 = text1.replace("$P1", para1);
  text1 = text1.replace("$P2", para2);
  //console.log(text1);

  request_messages.messages[1].content = text1;

  // a new thread blocks here waiting for response. Calling thread continues.
  // response= {
  // id: 'chatcmpl-AstgJSY1tsAxpQ6j8uYF1NaPzd12N',
  //   object: 'chat.completion',
  //     created: 1737647115,
  //       model: 'gpt-4o-2024-08-06',
  //         choices: [
  //           {
  //             index: 0,
  //             message: [Object],
  //             logprobs: null,
  //             finish_reason: 'stop'
  //           }
  //         ],
  // ...}
  const response = await openai.chat.completions.create(request_messages);
  //   .then(resp => {
  //   //console.log(resp);
  //   let resultstr = resp.choices[0].message.content;
  //   console.log("resultstr=", resultstr);
  //   if (resultstr == "1") { // not equal
  //     rc = 1;
  //   }
  // });

  // result returns from openai
  // console.log("await response=", response);
  let resultstr = response.choices[0].message.content;
  // console.log("resultstr=", resultstr);
  let rc = 0;
  if (resultstr == "1") { // not equal
    rc = 1;
  }
  console.log("rc=", rc);
  process.exitCode = rc;
}

function main() {
  compare_intent(context, p1, p2);
}

//console.log("Before main()");
main();
//console.log("After  main()");
// main thread terminates?
