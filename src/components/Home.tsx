import { MainContainer } from "@chatscope/chat-ui-kit-react";
import { useCallback, useEffect, useMemo, useState } from "react";
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

	const [sidebarVisible, setSidebarVisible] = useState(false);
	const [sidebarStyle, setSidebarStyle] = useState({});
	const [chatContainerStyle, setChatContainerStyle] = useState({});
	const [conversationContentStyle, setConversationContentStyle] = useState({});
	const [conversationAvatarStyle, setConversationAvatarStyle] = useState({});

	const handleConversationClick = useCallback(() => {
		if (sidebarVisible) {
			setSidebarVisible(false);
		}
	}, [sidebarVisible, setSidebarVisible]);

	useEffect(() => {
		if (sidebarVisible) {
			setSidebarStyle({
				display: "flex",
			});
			// setConversationContentStyle({
			// 	display: "flex",
			// });
			// setConversationAvatarStyle({
			// 	marginRight: "1em",
			// });
			// setChatContainerStyle({
			// 	display: "none",
			// });
		} else {
			setSidebarStyle({});
			setConversationContentStyle({});
			setConversationAvatarStyle({});
			setChatContainerStyle({});
		}
	}, [
		sidebarVisible,
		setSidebarVisible,
		setConversationContentStyle,
		setConversationAvatarStyle,
		setSidebarStyle,
		setChatContainerStyle,
	]);

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

	const onChatBackClicked = () => setSidebarVisible(!sidebarVisible);

	return (
		<MainContainer responsive>
			<SettingsModalComponent
				isOpen={doShowSettingsModal}
				onClose={onCloseSettingsModal}
				doAllowClose={doAllowCloseSettingsModal}
			/>

			<SidebarComponent
				onClickSettingsButton={() => setShowSettingsModal(!doShowSettingsModal)}
				style={sidebarStyle}
			/>
			<ConversationIdContext.Provider value={activeConversationId}>
				{activeConversationId === "-1" ? (
					<></>
				) : (
					<ChatComponent
						onBackClicked={onChatBackClicked}
						isSidebarVisible={sidebarVisible}
					/>
				)}
			</ConversationIdContext.Provider>
		</MainContainer>
	);
};
