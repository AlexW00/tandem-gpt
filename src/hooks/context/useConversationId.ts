import { useContext } from "react";
import { ConversationIdContext } from "../../contexts/ConversationIdContext";

export const useConversationId = () => {
	const conversationId = useContext(ConversationIdContext);
	return conversationId;
};
