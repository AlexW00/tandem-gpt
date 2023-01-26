import { Setter } from "../../../classes/Setter";
import { useAppModel } from "../../../store/store";

export const useSetActiveConversationId = (): Setter<string> => {
	const setter = (conversationId: string) => {
		useAppModel.setState((state) => {
			state.activeConversationId = conversationId;
		});
	};
	return setter;
};
