
import { Configuration, OpenAIApi } from 'openai'
import fetchAdapter from '@vespaiach/axios-fetch-adapter'

const GPT_TOKEN_NAME = 'openAIToken';

export type WordProps = {
    word: string,
    topic?: string,
    locale?: string,
}
type GPTExplaination = {
    sentence: string,
    pic_prompt: string,
    explanation: string,
}
export type GPTResponse = {
    sentence: string,
    pic_prompt: string,
    explanation: string,
    pic_url?: string
}



export class ChatGPTClient {
    waitForTokenCallback: ((newGptToken: string) => void) | undefined;
    async askGPT(props: WordProps): Promise<GPTResponse | undefined> {
        const token = await this.getToken();

        if (!token) {
            return Promise.reject();
        }
        const systemMessage = `You are excellent English teacher, every time I ask you about a new word or phrase, you can alway give me 
         1. one example sentence  and 2. draw me a picture (prompt to generate the picture)  and  3. a brief explain about the word. Here is the word:${props.word}. 
          Please return your answer in json with 3 keys [sentence , pic_prompt, explanation]`;

        const configuration = new Configuration({
            apiKey: token,
            baseOptions: {
                adapter: fetchAdapter
            }
        });
        const openai = new OpenAIApi(configuration);
        const completion = await openai.createChatCompletion({
            stream: false,
            model: "gpt-3.5-turbo",
            messages: [{ "role": "system", "content": systemMessage }],
        });

        const re = JSON.parse(completion.data.choices[0].message?.content!) as GPTExplaination;
        const url = await this.generatePic(re.pic_prompt, token)
        return { ...re, pic_url: url }

    }

    async generatePic(pic_prompt: string, token: string): Promise<string | undefined> {
        const configuration = new Configuration({
            apiKey: token,
            baseOptions: {
                adapter: fetchAdapter
            }
        });
        const openai = new OpenAIApi(configuration);
        const response = await openai.createImage({
            prompt: `${pic_prompt}`,
            n: 1,
            size: "512x512",
        });
        return response.data.data[0].url

    }

    async getToken(): Promise<string | undefined> {
        const result = await chrome.storage.local.get(GPT_TOKEN_NAME);

        if (!result[GPT_TOKEN_NAME]) {
            let internalUrl = chrome.runtime.getURL("js/index.html");
            chrome.tabs.create({ url: internalUrl });
        }

        return result[GPT_TOKEN_NAME];


    }
}