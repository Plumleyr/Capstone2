import OpenAIApi from "openai";

export const openai = new OpenAIApi({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});
