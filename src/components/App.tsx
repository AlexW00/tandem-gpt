import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { ChatProviderComponent } from "./ChatProvider";
import { ChatComponent } from "./Chat";
import { HomeComponent } from "./Home";

import { ChakraProvider } from "@chakra-ui/react";
import { GptApiContext } from "../contexts/GptApiContext";
import GptApi from "../gpt/GptApi";
import { useApiKey } from "../hooks/store/get/useApiKey";
import { useSetApiKey } from "../hooks/store/set/useSetApiKey";

const App = () => {
	const api = new GptApi();

	const apiKey = useApiKey(),
		setApiKey = useSetApiKey();

	if (!apiKey) {
		const key = prompt("Please enter your API key");

		if (key) {
			setApiKey(key);
		}
	}

	api.setKey(apiKey!);

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
