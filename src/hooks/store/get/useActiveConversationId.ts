import { useAppModel } from "../../../store/store";

export const useActiveConversationId = () => {
	const activeConversationId = useAppModel(
		(state) => state.activeConversationId
	);
	return activeConversationId;
};
