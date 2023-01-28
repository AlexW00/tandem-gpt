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
	apiKey: string | undefined;
}

export interface AppModel {
	conversations: Conversation[];
	activeConversationId: string;
	preferences: Preferences;
}

// Default

export const DefaultAppModel: AppModel = {
	conversations: [],
	activeConversationId: "-1",
	preferences: {
		appLanguage: Language.en,
		defaultLanguage: Language.jp,
		apiKey: undefined,
	},
};
