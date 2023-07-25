import { GPTResponse } from "./chat_gpt_client";

export type WordView = {
  word: string;
  addr: string;
  type: string;
  pageUrl: string;
  gpt: GPTResponse;
  topic?: string;
  locale?: string;
};
