import { create } from "zustand";
import { AppModel, DefaultAppModel } from "./AppModel";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";
import { MessageModel } from "@chatscope/chat-ui-kit-react";

export interface AppState extends AppModel {
	addMessage: (conversationId: string, message: MessageModel) => void;
}

export const useAppModel = create(
	// persist(
	immer<AppState>((set) => ({
		...DefaultAppModel,
		addMessage: (conversationId: string, message: MessageModel) =>
			set((state) => {
				const conversation = state.conversations.find(
					(c) => c.id === conversationId
				);
				if (conversation) {
					conversation.messages.push(message);
				}
			}),
	}))
	// 	{
	// 		name: "default-storage", // unique name
	// 		storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
	// 	}
	// )
);
