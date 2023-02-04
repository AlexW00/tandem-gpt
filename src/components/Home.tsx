import { MainContainer } from "@chatscope/chat-ui-kit-react";
import { useEffect, useMemo, useState } from "react";
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

	useEffect(() => {
		if (apiKey !== undefined) {
			gpt.setKey(apiKey);
		}
	}, [apiKey, gpt]);

	const doAllowCloseSettingsModal = useMemo(
		() => apiKey !== undefined,
		[apiKey]
	);

	const [doShowSettingsModal, setShowSettingsModal] = useState(
		!doAllowCloseSettingsModal
	);
	const onCloseSettingsModal = () => {
		setShowSettingsModal(false);
	};

	return (
		<MainContainer responsive>
			<SettingsModalComponent
				isOpen={doShowSettingsModal}
				onClose={onCloseSettingsModal}
				doAllowClose={doAllowCloseSettingsModal}
			/>

			<SidebarComponent
				onClickSettingsButton={() => setShowSettingsModal(!doShowSettingsModal)}
			/>
			<ConversationIdContext.Provider value={activeConversationId}>
				{activeConversationId === "-1" ? <></> : <ChatComponent />}
			</ConversationIdContext.Provider>
		</MainContainer>
	);
};
