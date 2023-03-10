import { Configuration, OpenAIApi } from "openai";
import { Conversation, Message } from "../store/AppModel";

const exampleConvo = `
=== Example Conversation (You: German, Me: English) ===
THE USER LEARNED TODAY: "Hausaufgaben, wollen" (German)

--- Start ---
You: 
Hallo, hast du deine Hausaufgaben schon gemacht?

Me: 
Nein, sie waren zu schwer.

You:
Ich kann dir helfen. Was hast du gemacht?

Me:
Ich habe es bis Aufkabe 2 geschafft.

You:
Meinst du "Aufgabe"? Aufgabe schreibt man mit einem "g".

Me:
Ja, das meinte ich.

You:
Wollen wir sie zusammen machen?

Me:
What does "Wollen" mean?

You:
"Wollen" means "want". It is a verb.

Me:
Okay, Thank you.

You: 
Gerne. Um was geht es in der Aufgabe?

Me:
Es geht um die Verben "haben" und "sein".

You:
Ah, zum Beispiel "Ich habe Hunger" oder "Ich bin müde"?.

Me:
Ja, genau. What does "müde" mean?

You:
"Müde" bedeutet "tired". Es ist ein Adjektiv.

Me:
Okay, Danke - ich bin fertig mit lernen.

--- End ---
`;

const generateConvoHeader = (conversation: Conversation): string => {
	const example = `=== Conversation (You: ${conversation.bot.studyInfo.speaks}, Me: ${conversation.bot.studyInfo.learns}) ===
THE USER LEARNED TODAY: "${conversation.bot.prompt}" (${conversation.bot.studyInfo.speaks})

--- Start ---
`;
	return example;
};
const generateStartPrompt = (conversation: Conversation): string => {
	const prompt = `Imagine you are my ${conversation.bot.studyInfo.speaks} tutor. I am ${conversation.bot.studyInfo.learns} and you are an ${conversation.bot.studyInfo.speaks} speaker. You teach me your language (${conversation.bot.studyInfo.speaks}) by sending me texts in a chat. I recently learned the following: "${conversation.bot.prompt}". Send me a single, simple text message in ${conversation.bot.studyInfo.speaks}, that makes use of what I learned, which I can reply to. Only reply in ${conversation.bot.studyInfo.learns} when I do not understand something. If my message correct (grammar & spelling) and I have no question, continue the conversation in ${conversation.bot.studyInfo.speaks}!`;
	const header = generateConvoHeader(conversation);
	const full =
		prompt + "\n\n" + exampleConvo + "\n\n" + header + "\n\n" + "You:\n";
	console.log(full);
	return full;
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
	const start = `Imagine you are my ${conversation.bot.studyInfo.speaks} tutor. I am ${conversation.bot.studyInfo.learns} and you are a ${conversation.bot.studyInfo.speaks} speaker. You teach me your language (${conversation.bot.studyInfo.speaks}) by sending me texts in a chat. Before replying, check my message for mistakes. Whenever I make a mistake (grammar & spelling), tell me I made one and teach me how to correct it. When I don't understand something, explain it to me in ${conversation.bot.studyInfo.learns}.  If my message is correct (grammar & spelling) and I have no question, continue the conversation in ${conversation.bot.studyInfo.speaks}!`,
		header = generateConvoHeader(conversation),
		messages = concatConversation(conversation),
		prompt =
			start +
			"\n\n" +
			exampleConvo +
			"\n\n" +
			header +
			messages +
			"\n\n" +
			"You:\n";

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

	hasKey = (): boolean => {
		return this.openai !== undefined;
	};

	isValidKey = async (): Promise<boolean> => {
		try {
			const models = await this.openai?.listModels();
			return models !== undefined;
		} catch (e) {
			return false;
		}
	};

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
				stop: ["Me:"],
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
				stop: ["Me:"],
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
