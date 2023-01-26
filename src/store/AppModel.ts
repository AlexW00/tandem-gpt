import { MessageModel } from "@chatscope/chat-ui-kit-react";

export enum Language {
	en = "English",
	de = "Deutsch",
	jp = "Japanese",
}

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
}

export type Message = MessageModel;

export interface Conversation {
	id: string;
	bot: Bot;
	messages: MessageModel[];
}

export interface AppModel {
	conversations: Conversation[];
	activeConversationId: string;
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
				avatar: "https://i.pravatar.cc/150?img=1",
				description: "I am another bot",
				studyInfo: {
					speaks: Language.en,
					learns: Language.de,
				},
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
};
