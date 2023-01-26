import { Setter } from "../../../classes/Setter";
import { Conversation } from "../../../store/AppModel";
import { useAppModel } from "../../../store/store";

export const useAddConversation = (): Setter<Conversation> => {
	const setter = (conversation: Conversation) => {
		useAppModel.setState((state) => {
			state.conversations.push(conversation);
		});
	};

	return setter;
};
