import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

export const AddConversationButtonComponent = ({
	onClick,
}: {
	onClick: () => void;
}) => (
	<Button onClick={onClick} flexGrow={40}>
		<AddIcon color={"blackAlpha.600"} />
	</Button>
);
