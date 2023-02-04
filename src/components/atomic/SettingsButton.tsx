import { AddIcon, SettingsIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

export const SettingsButtonComponent = ({
	onClick,
}: {
	onClick: () => void;
}) => (
	<Button
		leftIcon={<SettingsIcon color={"blackAlpha.600"} />}
		onClick={onClick}
		flexGrow={1}
	></Button>
);
