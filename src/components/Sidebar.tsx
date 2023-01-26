import {
	ConversationList,
	Conversation,
	Avatar,
	Sidebar,
} from "@chatscope/chat-ui-kit-react";
import { useConversations } from "../hooks/store/get/useConversations";
import { useSetActiveConversationId } from "../hooks/store/set/useSetActiveConversationId";

export const SidebarComponent = () => {
	const conversations = useConversations(),
		setActiveConversationId = useSetActiveConversationId();
	return (
		<Sidebar position="left" scrollable={false}>
			<ConversationList>
				{conversations.map((c, i) => (
					<Conversation
						key={i}
						name={c.bot.name}
						info={c.messages[c.messages.length - 1]?.message ?? ""}
						lastSenderName={c.messages[c.messages.length - 1]?.sender ?? ""}
						onClick={() => setActiveConversationId(c.id)}
					>
						<Avatar name={c.bot.name} src={c.bot.avatar}></Avatar>
					</Conversation>
				))}
			</ConversationList>
		</Sidebar>
	);
};
