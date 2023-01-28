import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

export const AddConversationButtonComponent = ({
	onClick,
}: {
	onClick: () => void;
}) => (
	<Button
		leftIcon={<AddIcon color={"blackAlpha.600"} />}
		onClick={onClick}
		marginBottom="0.5rem"
		marginLeft="1rem"
		marginRight="1rem"
	></Button>
);
