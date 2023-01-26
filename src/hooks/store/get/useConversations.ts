import { useAppModel } from "../../../store/store";

export const useConversations = () => {
	const conversations = useAppModel((state) => state.conversations);
	return conversations;
};
