import { Configuration, OpenAIApi } from "openai";
import fetchAdapter from "@vespaiach/axios-fetch-adapter";
import { DRAWORDS_OPENAI_KEY, OpenAiKey } from "../setting/setting";

export type WordProps = {
  word: string;
  interestedArea?: string;
  locale?: string;
};
type GPTExplaination = {
  sentence: string;
  pic_prompt: string;
  explanation: string;
  similar_words: Array<string>;
};
export type GPTResponse = {
  sentence: string;
  pic_prompt: string;
  explanation: string;
  similar_words: Array<string>;
  pic_url?: string;
  pic_64?: any;
};

export class ChatGPTClient {
  waitForTokenCallback: ((newGptToken: string) => void) | undefined;

  randomMessage(
    interestedArea: string | undefined,
    msg1: string,
    msg2: string
  ): string {
    if (interestedArea) {
      return Math.random() > 0.5 ? msg1 : msg2;
    }
    return msg2;
  }
  async askGPT(props: WordProps): Promise<GPTResponse | undefined> {
    const openAiKey = await this.getOpenAiKey();

    if (!openAiKey) {
      return Promise.reject();
    }
    const msg1 = `You are excellent English teacher, every time I ask you about a new word or phrase, you can alway give me 
    1.one example sentence better related to the area of ${props.interestedArea}  and 2.draw me a picture (prompt to generate the picture)  and  3.a brief explain about the word and 4.some similar words. Here is the word:${props.word}. 
     Please return your answer in json with 4 keys [sentence , pic_prompt, explanation,similar_words]`;
    const msg2 = `You are excellent English teacher, every time I ask you about a new word or phrase, you can alway give me 
     1.one example sentence and 2.generate a picture (or prompt to generate the picture) to describe the word and 3.a brief explain about the word and 4.some similar words. Here is the word:${props.word}. 
      Please return your answer in json with 4 keys [sentence , pic_prompt, explanation,similar_words]`;

    const systemMessage = this.randomMessage(props.interestedArea, msg1, msg2);

    console.log(systemMessage);

    const configuration = new Configuration({
      apiKey: openAiKey.openAIToken,
      baseOptions: {
        adapter: fetchAdapter,
      },
    });
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({
      stream: false,
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: systemMessage }],
    });
    const ct = completion.data.choices[0].message?.content;
    console.log("gpt step1", ct);

    const re = JSON.parse(ct!) as GPTExplaination;
    const url = await this.generatePic(re.pic_prompt, openAiKey.openAIToken);
    console.log("gpt done", url);
    const img64 = await this.convert(url!);

    return { ...re, pic_url: url, pic_64: img64 };
  }

  async generatePic(
    pic_prompt: string,
    token: string
  ): Promise<string | undefined> {
    const configuration = new Configuration({
      apiKey: token,
      baseOptions: {
        adapter: fetchAdapter,
      },
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
      prompt: `${pic_prompt}`,
      n: 1,
      size: "512x512",
    });
    return response.data.data[0].url;
  }

  async getOpenAiKey(): Promise<OpenAiKey | undefined> {
    const result = await chrome.storage.local.get(DRAWORDS_OPENAI_KEY);

    if (!result[DRAWORDS_OPENAI_KEY]) {
      let internalUrl = chrome.runtime.getURL("js/setting.html");
      chrome.tabs.create({ url: internalUrl });
    }

    return result[DRAWORDS_OPENAI_KEY];
  }

  async convert(url: string): Promise<any> {
    console.log("start convert");

    const base64 = await fetch(url, { mode: "no-cors" })
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise((res) => {
          reader.onloadend = () => {
            res(reader.result);
          };
        });
      });

    console.log("base64 ", base64);
    return base64;
  }
}
