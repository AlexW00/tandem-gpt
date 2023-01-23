import {
	Search,
	ConversationList,
	Conversation,
	Avatar,
	Sidebar,
} from "@chatscope/chat-ui-kit-react";

const state = {
	conversations: [
		{
			name: "Hausaufgaben",
			lastSenderName: "Hausaufgaben",
			info: "Yes i can do it for you",
		},

		{
			name: "Brot",
			lastSenderName: "Brot",
			info: "xy",
		},
	],
};

export const SidebarComponent = () => {
	return (
		<Sidebar position="left" scrollable={false}>
			{/* <Search placeholder="Search..." /> */}

			<ConversationList>
				{state.conversations.map((c, i) => (
					<Conversation
						key={i}
						name={c.name}
						info={c.info}
						lastSenderName={c.lastSenderName}
					>
						<Avatar name={c.name}></Avatar>
					</Conversation>
				))}
			</ConversationList>
		</Sidebar>
	);
};
