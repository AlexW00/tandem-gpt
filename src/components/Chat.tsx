import {
	ChatContainer,
	MessageList,
	Message,
	MessageInput,
	Avatar,
	ConversationHeader,
} from "@chatscope/chat-ui-kit-react";
import { useConversationId } from "../hooks/context/useConversationId";
import { useConversation } from "../hooks/store/get/useConversation";
import { useAppModel } from "../store/store";

export const ChatComponent = () => {
	const conversationId = useConversationId(),
		conversation = useConversation(conversationId)!;

	const { conversations, addMessage } = useAppModel();

	console.log(conversations);

	const handleSend = (message: string) => {
		console.log(message);
		addMessage(conversationId, {
			message: message,
			sender: "user",
			direction: "outgoing",
			position: "single",
		});
	};

	return (
		<ChatContainer>
			<ConversationHeader>
				<Avatar src={conversation.bot.avatar} name={conversation.bot.name} />
				<ConversationHeader.Content
					userName={conversation.bot.name}
					info={conversation.bot.description}
				/>
			</ConversationHeader>
			<MessageList>
				{conversation.messages.map((message, index) => (
					<Message model={message} key={index} />
				))}
			</MessageList>
			<MessageInput
				attachButton={false}
				placeholder="Type message here"
				onSend={handleSend}
			/>
		</ChatContainer>
	);
};
