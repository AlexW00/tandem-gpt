import { MainContainer } from "@chatscope/chat-ui-kit-react";
import { ConversationIdContext } from "../contexts/ConversationIdContext";
import { useActiveConversationId } from "../hooks/store/get/useActiveConversationId";
import { ChatComponent } from "./Chat";
import { SidebarComponent } from "./Sidebar";

export const HomeComponent = () => {
	const activeConversationId = useActiveConversationId();

	return (
		<MainContainer responsive>
			<SidebarComponent />
			<ConversationIdContext.Provider value={activeConversationId}>
				{activeConversationId === "-1" ? <></> : <ChatComponent />}
			</ConversationIdContext.Provider>
		</MainContainer>
	);
};
