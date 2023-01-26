import { selectConversation } from "../../../store/get/selectConversation";
import { useAppModel } from "../../../store/store";

export const useConversation = (id: String) => {
	const store = useAppModel((state) => selectConversation(id, state));
	return store;
};
