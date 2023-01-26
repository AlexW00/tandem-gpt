import { AppModel } from "../AppModel";

export const selectConversation = (id: String, store: AppModel) =>
	store.conversations.find((c) => c.id === id);
