import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { ChatProviderComponent } from "./ChatProvider";
import { HomeComponent } from "./Home";

import { ChakraProvider } from "@chakra-ui/react";
import { GptApiContext } from "../contexts/GptApiContext";
import GptApi from "../gpt/GptApi";
import { strings } from "../res/strings";
import { useAppLanguage } from "../hooks/store/get/useAppLanguage";
import { getCode } from "../classes/Language";
import { useMemo } from "react";

const App = () => {
	const api = new GptApi(),
		appLanguage = useAppLanguage();

	useMemo(() => strings.setLanguage(getCode(appLanguage)), [appLanguage]);

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
