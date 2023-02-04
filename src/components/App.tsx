import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { ChatProviderComponent } from "./ChatProvider";
import { HomeComponent } from "./Home";

import { ChakraProvider } from "@chakra-ui/react";
import { GptApiContext } from "../contexts/GptApiContext";
import GptApi from "../gpt/GptApi";

const App = () => {
	const api = new GptApi();

	return (
		<ChakraProvider>
			<div style={{ position: "relative", height: "100%" }}>
				<ChatProviderComponent>
					<GptApiContext.Provider value={api}>
						<HomeComponent />
					</GptApiContext.Provider>
				</ChatProviderComponent>
			</div>
		</ChakraProvider>
	);
};

export default App;
