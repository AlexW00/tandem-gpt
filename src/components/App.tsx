import { MainContainer } from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { Chat } from "./Chat";

const App = () => (
	<div style={{ position: "relative", height: "100%" }}>
		<MainContainer>
			<Chat />
		</MainContainer>
	</div>
);

export default App;
