import {
	MainContainer,
	ChatContainer,
	MessageList,
	Message,
	MessageInput,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

const App = () => (
	<div style={{ position: "relative", height: "100%" }}>
		<MainContainer>
			<ChatContainer>
				<MessageList>
					<Message
						model={{
							message: "Hello my friend",
							sentTime: "just now",
							sender: "Joe",
							direction: "outgoing",
							position: "single",
						}}
					/>
				</MessageList>
				<MessageInput attachButton={false} placeholder="Type message here" />
			</ChatContainer>
		</MainContainer>
	</div>
);

export default App;
