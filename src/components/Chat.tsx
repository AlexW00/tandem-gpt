import { DeleteIcon } from "@chakra-ui/icons";
import {
	ChatContainer,
	MessageList,
	Message,
	MessageInput,
	Avatar,
	ConversationHeader,
	TypingIndicator,
	MessageModel,
} from "@chatscope/chat-ui-kit-react";
import { useConversationId } from "../hooks/context/useConversationId";
import { useGptApi } from "../hooks/context/useGptApi";
import { useConversation } from "../hooks/store/get/useConversation";
import { useIsTyping } from "../hooks/store/get/useIsTyping";
import { useAddMessage } from "../hooks/store/set/useAddMessage";
import { useSetTyping } from "../hooks/store/set/useSetTyping";
import { strings } from "../res/strings";
import { useAppModel } from "../store/store";
import { MessageContent } from "./MessageContent";

export const ChatComponent = ({
	onBackClicked,
	isSidebarVisible,
}: {
	onBackClicked: () => void;
	isSidebarVisible: boolean;
}) => {
	const conversationId = useConversationId(),
		isTyping = useIsTyping(conversationId),
		setTyping = useSetTyping(conversationId),
		conversation = useConversation(conversationId)!,
		addMessage = useAddMessage(conversationId);

	const api = useGptApi();

	const handleSend = (message: string) => {
		const cleanMsg = message.trim().replace(/<br>/gi, "");
		const msg = {
			message: cleanMsg,
			sender: "user",
			direction: "outgoing",
			position: "single",
		};

		api
			.reply({
				...conversation,
				// @ts-ignore
				messages: [...conversation.messages, msg],
			})
			.then((response) => {
				if (response) {
					addMessage(response);
					setTyping(false);
				}
			});

		addMessage(msg as MessageModel);
		setTyping(true);
	};

	const handleBackClicked = () => {
		onBackClicked();
	};

	return (
		<ChatContainer>
			<ConversationHeader>
				<ConversationHeader.Back
					onClick={handleBackClicked}
					// rotate 180 degrees if sidebar is visible
					style={{
						transform: isSidebarVisible ? "rotate(0deg)" : "rotate(180deg)",
					}}
				/>
				<Avatar src={conversation.bot.avatar} name={conversation.bot.name} />
				<ConversationHeader.Content
					userName={conversation.bot.name}
					info={conversation.bot.description}
				/>
			</ConversationHeader>
			<MessageList
				typingIndicator={
					isTyping ? <TypingIndicator content={strings.tips.typing} /> : null
				}
			>
				{conversation.messages.map((message, index) => (
					<Message model={message} key={index} >
						<Message.CustomContent>
							<MessageContent message={
								{
									...message,
									annotations: conversation.messages[index + 1]?.annotations,
								}
							} />
						</Message.CustomContent>
					</Message>
				))}
			</MessageList>
			<MessageInput
				attachButton={false}
				placeholder={strings.placeholders.type}
				onSend={handleSend}
			/>
		</ChatContainer>
	);
};
