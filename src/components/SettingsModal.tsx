import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	FormControl,
	FormLabel,
	Input,
	ModalFooter,
	Select,
	useToast,
	Button,
	Spinner,
	Flex,
	FormHelperText,
	FormErrorMessage,
	Link,
} from "@chakra-ui/react";
import React from "react";
import { getFlag, Language } from "../classes/Language";
import { useGptApi } from "../hooks/context/useGptApi";
import { useApiKey } from "../hooks/store/get/useApiKey";
import { useAppLanguage } from "../hooks/store/get/useAppLanguage";
import { useDefaultLanguage } from "../hooks/store/get/useDefaultLanguage";
import { useSetApiKey } from "../hooks/store/set/useSetApiKey";
import { useSetAppLanguage } from "../hooks/store/set/useSetAppLanguage";
import { useSetDefaultLanguage } from "../hooks/store/set/useSetDefaultLanguage";

export const SettingsModalComponent = ({
	isOpen,
	onClose,
	doAllowClose,
}: {
	isOpen: boolean;
	onClose: () => void;
	doAllowClose: boolean;
}) => {
	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);

	const toast = useToast();

	const appLanguage = useAppLanguage(),
		setAppLanguage = useSetAppLanguage(),
		defaultLanguage = useDefaultLanguage(),
		setDefaultLanguage = useSetDefaultLanguage();

	const api = useGptApi(),
		apiKey = useApiKey(),
		setApiKey = useSetApiKey();

	const [apiKeyInput, setApiKeyInput] = React.useState<string>(apiKey ?? "");
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [doShowApiKeyError, setDoShowApiKeyError] = React.useState<boolean>(
		api.hasKey()
	);

	const handleDefaultLanguageChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		setDefaultLanguage(e.target.value as Language);
	};

	const handleAppLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setAppLanguage(e.target.value as Language);
	};

	const showSettingsSavedToast = () => {
		toast({
			title: "Settings saved.",
			status: "success",
			duration: 3000,
			isClosable: true,
		});
	};

	const showMustFillOutToast = () => {
		toast({
			title: "You must fill out all fields.",
			status: "error",
			duration: 3000,
			isClosable: true,
		});
	};

	const resetForm = () => {};

	const handleSaveClicked = () => {
		setIsLoading(true);
		api.setKey(apiKeyInput);
		api.isValidKey().then((isValid) => {
			if (isValid) {
				setIsLoading(false);
				setApiKey(apiKeyInput);
				showSettingsSavedToast();
				onClose();
			} else {
				setIsLoading(false);
				setDoShowApiKeyError(true);
				api.setKey(apiKey ?? "");
			}
		});
	};

	const handleClose = () => {
		if (doAllowClose) onClose();
		else showMustFillOutToast();
	};

	return (
		<Modal
			initialFocusRef={initialRef}
			finalFocusRef={finalRef}
			isOpen={isOpen}
			onClose={handleClose}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Settings</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<FormControl isInvalid={doShowApiKeyError}>
						<FormLabel>OpenAI Api Key</FormLabel>

						<Flex alignItems="center">
							<Input
								ref={initialRef}
								value={apiKeyInput}
								onChange={(e) => setApiKeyInput(e.target.value)}
								placeholder="sk-..."
								type="password"
							/>
							{isLoading && <Spinner size="lg" color="blue.500" />}
						</Flex>

						{!doShowApiKeyError ? (
							<FormHelperText>
								You can find your OpenAI API key{" "}
								<Link
									color={"blue.500"}
									href="https://platform.openai.com/account/api-keys"
									isExternal
								>
									here <ExternalLinkIcon mx="2px" />
								</Link>
							</FormHelperText>
						) : (
							<FormErrorMessage>Invalid API key.</FormErrorMessage>
						)}
					</FormControl>

					<FormControl mt={4}>
						<FormLabel>App language</FormLabel>

						<Select onChange={handleDefaultLanguageChange} value={appLanguage}>
							{Object.values(Language).map((lang) => (
								<option key={lang} value={lang}>
									{getFlag(lang) + " " + lang}
								</option>
							))}
						</Select>
					</FormControl>

					<FormControl mt={4}>
						<FormLabel>Default chat language</FormLabel>

						<Select onChange={handleAppLanguageChange} value={defaultLanguage}>
							{Object.values(Language).map((lang) => (
								<option key={lang} value={lang}>
									{getFlag(lang) + " " + lang}
								</option>
							))}
						</Select>
					</FormControl>
				</ModalBody>

				<ModalFooter>
					{doAllowClose ?? <Button onClick={handleClose}>Cancel</Button>}
					<Button onClick={handleSaveClicked}>Save</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
