import { selectConversation } from "../../../store/get/selectConversation";
import { selectMessage } from "../../../store/get/selectMessage";
import { useAppModel } from "../../../store/store";

export const useMessage = (index: number, conversationId: string) => {
	const message = useAppModel((store) => {
		const conversation = selectConversation(conversationId, store);
		if (conversation) return selectMessage(index, conversation);
		return undefined;
	});
	return message;
};
