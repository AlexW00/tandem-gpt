import { selectConversation } from "../../../store/get/selectConversation";
import { useAppModel } from "../../../store/store";

export const useIsTyping = (conversationId: string) => {
	const isTyping = useAppModel((store) => {
		const conversation = selectConversation(conversationId, store);
		if (conversation) return conversation.bot.isTyping;
		return false;
	});
	return isTyping;
};
