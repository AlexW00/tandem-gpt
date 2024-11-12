import OpenAI from "openai";
import { Conversation, Message } from "../store/AppModel";

const exampleConvo = `
=== Example Conversation (Assistant:German, User: English) ===
THE USER LEARNED TODAY: "Hausaufgaben, wollen" (German)

--- Start ---
Assistant:
Hallo, hast du deine Hausaufgaben schon gemacht?

User: 
Nein, sie waren zu schwer.

You:
Ich kann dir helfen. Was hast du gemacht?

User:
Ich habe es bis Aufkabe 2 geschafft.

You:
Meinst du "Aufgabe"? Aufgabe schreibt man mit einem "g".

User:
Ja, das meinte ich.

You:
Wollen wir sie zusammen machen?

User:
What does "Wollen" mean?

You:
"Wollen" means "want". It is a verb.

User:
Okay, Thank you.

Assistant:
Gerne. Um was geht es in der Aufgabe?

User:
Es geht um die Verben "haben" und "sein".

You:
Ah, zum Beispiel "Ich habe Hunger" oder "Ich bin müde"?.

User:
Ja, genau. What does "müde" mean?

You:
"Müde" bedeutet "tired". Es ist ein Adjektiv.

User:
Okay, Danke - ich bin fertig mit lernen.

--- End ---
`;

const generateConvoHeader = (conversation: Conversation): string => {
	const header = `In this conversation you are speaking ${conversation.bot.studyInfo.speaks}, I (user) am speaking ${conversation.bot.studyInfo.learns}). I learned today: "${conversation.bot.prompt}" (${conversation.bot.studyInfo.speaks})`;
	return header;
};

const generateSystemInstruction = (
	conversation: Conversation
): OpenAiMessage => {
	let start = `Imagine you are my ${conversation.bot.studyInfo.speaks} tutor. I am ${conversation.bot.studyInfo.learns} and you are a ${conversation.bot.studyInfo.speaks} speaker. You teach me your language (${conversation.bot.studyInfo.speaks}) by sending me texts in a chat. Before replying, check my message for mistakes. Whenever I make a mistake (grammar or spelling), tell me I made one and teach me how to correct it. When I don't understand something, explain it to me in ${conversation.bot.studyInfo.learns}. If my message is correct (grammar and spelling) and I have no question, CONTINUE the conversation in ${conversation.bot.studyInfo.speaks}! ONLY REPLY WITH YOUR MESSAGE; DO NOT REPLY AS ME!`;

	const convoInfo = generateConvoHeader(conversation);

	start = start + "\n" + convoInfo + "\n" + exampleConvo;

	return {
		role: "system",
		content: start,
	};
};

interface OpenAiMessage {
	role: string;
	content: string;
}

const getMessages = (conversation: Conversation): OpenAiMessage[] => {
	const messages: OpenAiMessage[] = [];

	const systemInstruction = generateSystemInstruction(conversation);
	messages.push(systemInstruction);

	conversation.messages.forEach((message) => {
		if (message.sender === "Bot") {
			messages.push({
				role: "assistant",
				content: message.message ?? "",
			});
		} else {
			messages.push({
				role: "user",
				content: message.message ?? "",
			});
		}
	});

	console.log(messages);
	return messages;
};

class GptApi {
	private apiKey?: string;
	private openai?: OpenAI;

	constructor() {}

	setKey(key: string) {
		this.apiKey = key;

		this.openai = new OpenAI({
			apiKey: this.apiKey,
			dangerouslyAllowBrowser: true,
		});
	}

	hasKey = (): boolean => {
		return this.openai !== undefined;
	};

	isValidKey = async (): Promise<boolean> => {
		try {
			const models = await this.openai?.models.list();
			return models !== undefined;
		} catch (e) {
			return false;
		}
	};

	start = async (conversation: Conversation): Promise<Message | undefined> => {
		if (this.openai) {
			const response = await this.openai.chat.completions.create({
				model: "gpt-4o",
				messages: getMessages(conversation) as any,
				temperature: 0.7,
				max_tokens: 512,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0,
				stop: ["User:"],
			});

			console.log(response);

			if (response.choices) {
				const message: Message = {
					message:
						response.choices[0].message?.content ??
						"".trim().replace("You:", ""),
					sender: "Bot",
					direction: "incoming",
					position: "single",
				};
				return message;
			} else {
				console.log(response);
				return undefined;
			}
		} else {
			console.log("No OpenAI API key set");
			return undefined;
		}
	};

	reply = async (conversation: Conversation): Promise<Message | undefined> => {
		if (this.openai) {
			const response = await this.openai.chat.completions.create({
				model: "gpt-4o",
				messages: getMessages(conversation) as any,
				temperature: 0.7,
				max_tokens: 512,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0,
				stop: ["User:"],
			});

			console.log(response);

			if (response.choices) {
				const message: Message = {
					message:
						response.choices[0].message?.content ??
						""?.trim().replace("You:", ""),
					sender: "bot",
					direction: "incoming",
					position: "single",
				};

				return message;
			} else {
				console.log(response);
				return undefined;
			}
		} else {
			return undefined;
		}
	};
}

export default GptApi;
