import { AddIcon, SettingsIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

export const SettingsButtonComponent = ({
	onClick,
}: {
	onClick: () => void;
}) => (
	<Button onClick={onClick} flexGrow={1}>
		<SettingsIcon color={"blackAlpha.600"} />
	</Button>
);
