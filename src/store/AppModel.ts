import { MessageModel } from "@chatscope/chat-ui-kit-react";
import { Language } from "../classes/Language";

export type StudyInfo = {
	speaks: Language;
	learns: Language;
};

export interface Participant {
	name: string;
	avatar: string;
	studyInfo: StudyInfo;
}

export interface Bot extends Participant {
	description: string;
	prompt: string;
}

export type Message = MessageModel;

export interface Conversation {
	id: string;
	bot: Bot;
	messages: MessageModel[];
}

export interface Preferences {
	appLanguage: Language;
	defaultLanguage: Language;
}

export interface AppModel {
	conversations: Conversation[];
	activeConversationId: string;
	preferences: Preferences;
}

// Default

export const DefaultAppModel: AppModel = {
	conversations: [
		{
			id: "1",
			bot: {
				name: "Bot 1",
				avatar: "https://i.pravatar.cc/150?img=1",
				description: "I am a bot",
				studyInfo: {
					speaks: Language.en,
					learns: Language.de,
				},
				prompt: "Homework",
			},
			messages: [
				{
					message: "Hello",
					sender: "bot",
					direction: "incoming",
					position: "single",
				},
				{
					message: "Hi",
					sender: "user",
					direction: "outgoing",
					position: "single",
				},
			],
		},
		{
			id: "2",
			bot: {
				name: "Bot 2",
				avatar: "https://i.pravatar.cc/150?img=2",
				description: "I am another bot",
				studyInfo: {
					speaks: Language.en,
					learns: Language.de,
				},
				prompt: "Sausage",
			},
			messages: [
				{
					message: "Hellossss",
					sender: "bot",
					direction: "incoming",
					position: "single",
				},
			],
		},
	],
	activeConversationId: "1",
	preferences: {
		appLanguage: Language.en,
		defaultLanguage: Language.jp,
	},
};
