import { Setter } from "../../../classes/Setter";
import { Message } from "../../../store/AppModel";
import { selectConversation } from "../../../store/get/selectConversation";
import { useAppModel } from "../../../store/store";

export const useAddMessage = (conversationId: string): Setter<Message> => {
	const setter = (message: Message) =>
		useAppModel.setState((state) => {
			const conversation = selectConversation(conversationId, state);
			if (conversation) conversation.messages.push(message);
		});

	return setter;
};
