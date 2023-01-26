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
import { useAddMessage } from "../hooks/store/set/useAddMessage";
import { useAppModel } from "../store/store";

export const ChatComponent = () => {
	const conversationId = useConversationId(),
		conversation = useConversation(conversationId)!,
		addMessage = useAddMessage(conversationId);

	const handleSend = (message: string) => {
		console.log(message);
		addMessage({
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
