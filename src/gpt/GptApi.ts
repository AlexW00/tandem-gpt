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

	generateRatingSystemInstruction = (
		conversation: Conversation
	): OpenAiMessage => {
		let start = `Imagine you are my ${conversation.bot.studyInfo.speaks} tutor. I am ${conversation.bot.studyInfo.learns} and you are a ${conversation.bot.studyInfo.speaks} speaker. You teach me your language (${conversation.bot.studyInfo.speaks}) by rating my sentence.`;

		start =
			start + "\n" + generateConvoHeader(conversation) + "\n" + exampleConvo;

		start =
			start +
			"\n" +
			"Rate the last message of the conversation. Highlight different parts of the sentence:" +
			"\n" +
			"- 0: partially correct" +
			"\n" +
			"- 1: incorrect" +
			"\n" +
			"Furthermore, it contains information for each rating:" +
			"\n" +
			"- type: grammar, spelling, vocabulary, punctuation, capitalization, style, other (can be multiple)";
		"\n" +
			"You MUST NOT rate the entire sentence, only the parts that are INCORRECT or PARTIALLY CORRECT. START COUNTING FROM 0";
		"\n" +
			"THE MESSAGE OF YOUR CORRECTION MUST BE IN " +
			conversation.bot.studyInfo.speaks +
			"!";

		start =
			start +
			`{
  "sentence": "Next week I'm going start doing sports again, since I havent done it for so long!",
  "ratings": [
    {
      "text": "I'm going start",
      "highlight": "red",
      "type": ["grammar", "spelling"],
      "correction": "I'm going to start",
      "message": "Missing 'to' after 'going'."
	  "start": 8,
	  "end": 19
    },
    {
      "text": "since I havent",
      "highlight": "red",
      "type": ["spelling", "grammar"],
      "correction": "since I haven't",
      "message": "Contraction error; should be 'haven't'."
	  "start": 25,
	  "end": 37
	},
  ]
}
`;
		start =
			start +
			"\n" +
			"Reply ONLY in JSON format; DO ONLY REPLY WITH THE JSON OBJECT; DO NOT REPLY AS ME!";

		return {
			role: "system",
			content: start,
		};
	};

	getRatingMessages = (conversation: Conversation): OpenAiMessage[] => {
		const messages: OpenAiMessage[] = [];

		const systemInstruction =
			this.generateRatingSystemInstruction(conversation);
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

	extractJsonFromString = (str: string): string => {
		const jsonStart = str.indexOf("{");
		const jsonEnd = str.lastIndexOf("}") + 1;
		const json = str.substring(jsonStart, jsonEnd);

		return json;
	};

	rate = async (conversation: Conversation): Promise<any | undefined> => {
		if (this.openai) {
			// expect openai answer in json format
			const response = await this.openai.chat.completions.create({
				model: "gpt-4o",
				messages: this.getRatingMessages(conversation) as any,
				temperature: 0.7,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0,
				stop: ["User:"],
			});

			if (response.choices) {
				const message = response.choices[0].message?.content;
				console.log(message);

				if (message) {
					const json = this.extractJsonFromString(message);
					const rating = JSON.parse(json);

					return rating;
				}
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
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0,
				stop: ["User:"],
			});

			const rating = await this.rate(conversation);

			this.rate(conversation).then((response) => {
				"Rating response";
				console.log(response);
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

				return {
					...message,
					annotations: { rating: rating.ratings },
				};
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
