import { MainContainer } from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { ChatProviderComponent } from "./ChatProvider";
import { ChatComponent } from "./Chat";
import { HomeComponent } from "./Home";

const App = () => (
	<div style={{ position: "relative", height: "100%" }}>
		<ChatProviderComponent>
			<HomeComponent />
		</ChatProviderComponent>
	</div>
);

export default App;
