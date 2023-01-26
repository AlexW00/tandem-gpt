import { Conversation } from "../AppModel";

export const selectMessage = (index: number, conversation: Conversation) =>
	conversation.messages[index];
