import { Configuration, OpenAIApi } from "openai";
import { Conversation, Message } from "../store/AppModel";

const generateStartPrompt = (conversation: Conversation): string => {
	const prompt = `Imagine you are my tandem partner. I am ${conversation.bot.studyInfo.learns} and you are an ${conversation.bot.studyInfo.speaks} speaker. Together we learn each others language by sending each other short texts. I recently learned the following: "${conversation.bot.prompt}". Send me a simple sentence in ${conversation.bot.studyInfo.speaks}, that makes use of what I learned, which I can reply to.`;
	console.log(prompt);
	return prompt;
};

const concatConversation = (conversation: Conversation): string => {
	return conversation.messages
		.map((message) => {
			return (
				(message.direction === "incoming" ? "You:" : "Me:") +
				"\n" +
				message.message
			);
		})
		.join("\n\n");
};

const generateReplyPrompt = (conversation: Conversation): string => {
	const start = generateStartPrompt(conversation),
		messages = concatConversation(conversation),
		prompt = start + "\n\n" + messages + "\n\n" + "You:\n";

	console.log(prompt);
	return prompt;
};

class GptApi {
	private configuration?: Configuration;
	private openai?: OpenAIApi;

	constructor() {}

	setKey(key: string) {
		this.configuration = new Configuration({
			apiKey: key,
		});

		this.openai = new OpenAIApi(this.configuration);
	}

	start = async (conversation: Conversation): Promise<Message | undefined> => {
		if (this.openai) {
			const prompt = generateStartPrompt(conversation);
			const response = await this.openai?.createCompletion({
				model: "text-davinci-003",
				prompt: prompt,
				temperature: 0.7,
				max_tokens: 512,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0,
			});

			console.log(response);

			if (response.data.choices) {
				const message: Message = {
					message: response.data.choices[0].text?.trim(),
					sender: "Bot",
					direction: "incoming",
					position: "single",
				};
				return message;
			} else {
				console.log(response.statusText);
				return undefined;
			}
		} else {
			console.log("No OpenAI API key set");
			return undefined;
		}
	};

	reply = async (conversation: Conversation): Promise<Message | undefined> => {
		if (this.openai) {
			const prompt = generateReplyPrompt(conversation);
			const response = await this.openai?.createCompletion({
				model: "text-davinci-003",
				prompt: prompt,
				temperature: 0.7,
				max_tokens: 512,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0,
			});

			console.log(response);

			if (response.data.choices) {
				const message: Message = {
					message: response.data.choices[0].text?.trim(),
					sender: "bot",
					direction: "incoming",
					position: "single",
				};

				return message;
			} else {
				console.log(response.statusText);
				return undefined;
			}
		} else {
			return undefined;
		}
	};
}

export default GptApi;
