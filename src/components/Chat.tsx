import {
	ChatContainer,
	MessageList,
	Message,
	MessageInput,
	Avatar,
	ConversationHeader,
} from "@chatscope/chat-ui-kit-react";
import { MessageDirection } from "@chatscope/use-chat";
import { useNewAvatar } from "../hooks/useNewAvatar";
import { useAppModel } from "../store/store";

const state = {
	word: "Ampel",
	messages: [
		{
			message: "Hello my friend",
			sentTime: "5 minutes ago",
			timestamp: Date.now() - 5000,
			direction: MessageDirection.Outgoing,
			position: "single",
		},
		{
			message: "Hello back",
			sentTime: "just now",
			timestamp: Date.now(),
			direction: MessageDirection.Incoming,
			position: "single",
		},
	],
};

export const ChatComponent = () => {
	const useAvatar = useNewAvatar(),
		avatar = useAvatar(state.word),
		lastMessageTime = state.messages[state.messages.length - 1].sentTime;

	const { conversations, addMessage } = useAppModel();

	console.log(conversations);

	const handleSend = (message: string) => {
		console.log(message);
		addMessage("1", {
			message: message,
			sender: "user",
			direction: "outgoing",
			position: "single",
		});
	};

	return (
		<ChatContainer>
			<ConversationHeader>
				<Avatar src={avatar} name={state.word} />
				<ConversationHeader.Content
					userName={state.word}
					info={lastMessageTime}
				/>
			</ConversationHeader>
			<MessageList>
				{conversations[0].messages.map((message, index) => (
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
