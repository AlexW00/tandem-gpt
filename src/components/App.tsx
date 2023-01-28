import { MainContainer } from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { ChatProviderComponent } from "./ChatProvider";
import { ChatComponent } from "./Chat";
import { HomeComponent } from "./Home";

import { ChakraProvider } from "@chakra-ui/react";

const App = () => (
	<ChakraProvider>
		<div style={{ position: "relative", height: "100%" }}>
			<ChatProviderComponent>
				<HomeComponent />
			</ChatProviderComponent>
		</div>
	</ChakraProvider>
);

export default App;
