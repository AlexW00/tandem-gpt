import { Flex } from "@chakra-ui/react";
import {
	ConversationList,
	Conversation,
	Avatar,
	Sidebar,
} from "@chatscope/chat-ui-kit-react";
import { useState } from "react";
import { useConversations } from "../hooks/store/get/useConversations";
import { useSetActiveConversationId } from "../hooks/store/set/useSetActiveConversationId";
import { AddConversationModal } from "./AddConversationModal";
import { AddConversationButtonComponent } from "./atomic/AddConversationButton";
import { SettingsButtonComponent } from "./atomic/SettingsButton";

export const SidebarComponent = ({
	onClickSettingsButton,
}: {
	onClickSettingsButton: () => void;
}) => {
	const conversations = useConversations(),
		setActiveConversationId = useSetActiveConversationId();

	const [doShowAddConversationModal, setDoShowAddConversationModal] =
		useState(false);

	const handleAddConversationClicked = () => {
		setDoShowAddConversationModal(true);
	};

	const handleCloseAddConversationModal = () => {
		setDoShowAddConversationModal(false);
	};

	return (
		<>
			<AddConversationModal
				isOpen={doShowAddConversationModal}
				onClose={handleCloseAddConversationModal}
			/>
			<Sidebar position="left" scrollable={false}>
				<ConversationList>
					{conversations.map((c, i) => (
						<Conversation
							key={i}
							name={c.bot.name}
							info={c.messages[c.messages.length - 1]?.message ?? "typing..."}
							lastSenderName={
								c.messages[c.messages.length - 1]?.sender ?? "Bot"
							}
							onClick={() => setActiveConversationId(c.id)}
						>
							<Avatar name={c.bot.name} src={c.bot.avatar}></Avatar>
						</Conversation>
					))}
				</ConversationList>
				<Flex margin="0.4rem" gap="0.3rem">
					<AddConversationButtonComponent
						onClick={handleAddConversationClicked}
					/>
					<SettingsButtonComponent
						onClick={onClickSettingsButton}
					></SettingsButtonComponent>
				</Flex>
			</Sidebar>
		</>
	);
};
