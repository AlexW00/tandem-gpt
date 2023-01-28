import {
	ChatContainer,
	MessageList,
	Message,
	MessageInput,
	Avatar,
	ConversationHeader,
	TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { useConversationId } from "../hooks/context/useConversationId";
import { useGptApi } from "../hooks/context/useGptApi";
import { useConversation } from "../hooks/store/get/useConversation";
import { useIsTyping } from "../hooks/store/get/useIsTyping";
import { useAddMessage } from "../hooks/store/set/useAddMessage";
import { useSetTyping } from "../hooks/store/set/useSetTyping";
import { useAppModel } from "../store/store";

export const ChatComponent = () => {
	const conversationId = useConversationId(),
		isTyping = useIsTyping(conversationId),
		setTyping = useSetTyping(conversationId),
		conversation = useConversation(conversationId)!,
		addMessage = useAddMessage(conversationId);

	const api = useGptApi();

	const handleSend = (message: string) => {
		const msg = {
			message: message,
			sender: "user",
			direction: "outgoing",
			position: "single",
		};

		api
			.reply({
				...conversation,
				messages: [...conversation.messages, msg],
			})
			.then((message) => {
				if (message) {
					addMessage(message);
					setTyping(false);
				}
			});

		addMessage(msg);
		setTyping(true);
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
			<MessageList
				typingIndicator={isTyping ? <TypingIndicator content="typing" /> : null}
			>
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
