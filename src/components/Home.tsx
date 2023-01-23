import { MainContainer } from "@chatscope/chat-ui-kit-react";
import { ChatProviderComponent } from "./ChatProvider";
import { ChatComponent } from "./Chat";
import { SidebarComponent } from "./Sidebar";
import { useStore } from "zustand";
import { useAppModel } from "../store/store";

export const HomeComponent = () => {
	return (
		<MainContainer responsive>
			<SidebarComponent />
			<ChatComponent />
		</MainContainer>
	);
};
