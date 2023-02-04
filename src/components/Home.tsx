import { MainContainer } from "@chatscope/chat-ui-kit-react";
import { useState } from "react";
import { ConversationIdContext } from "../contexts/ConversationIdContext";
import { useGptApi } from "../hooks/context/useGptApi";
import { useActiveConversationId } from "../hooks/store/get/useActiveConversationId";
import { useApiKey } from "../hooks/store/get/useApiKey";
import { ChatComponent } from "./Chat";
import { SettingsModalComponent } from "./SettingsModal";
import { SidebarComponent } from "./Sidebar";

export const HomeComponent = () => {
	const activeConversationId = useActiveConversationId();
	const gpt = useGptApi();
	const apiKey = useApiKey();

	const [doShowSettingsModal, setShowSettingsModal] = useState(!gpt.hasKey());
	const onCloseSettingsModal = () => {
		setShowSettingsModal(false);
	};

	const [doAllowCloseSettingsModal] = useState(apiKey !== undefined);

	return (
		<MainContainer responsive>
			{!doAllowCloseSettingsModal && (
				<SettingsModalComponent
					isOpen={doShowSettingsModal}
					onClose={onCloseSettingsModal}
					doAllowClose={doAllowCloseSettingsModal}
				/>
			)}
			<SidebarComponent />
			<ConversationIdContext.Provider value={activeConversationId}>
				{activeConversationId === "-1" ? <></> : <ChatComponent />}
			</ConversationIdContext.Provider>
		</MainContainer>
	);
};
