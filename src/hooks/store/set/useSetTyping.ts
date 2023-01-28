import { selectConversation } from "../../../store/get/selectConversation";
import { useAppModel } from "../../../store/store";

export const useSetTyping = (conversationId: string) => {
	const setter = (isTyping: boolean) => {
		useAppModel.setState((state) => {
			const conversation = selectConversation(conversationId, state);
			if (conversation) conversation.bot.isTyping = isTyping;
		});
	};
	return setter;
};
