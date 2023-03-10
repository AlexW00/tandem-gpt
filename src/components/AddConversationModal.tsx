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
} from "@chakra-ui/react";
import { Button } from "@chatscope/chat-ui-kit-react";
import React, { useEffect } from "react";
import { useMemo } from "react";
import { getCode, getFlag, Language } from "../classes/Language";
import { useGptApi } from "../hooks/context/useGptApi";
import { useAppLanguage } from "../hooks/store/get/useAppLanguage";
import { useDefaultLanguage } from "../hooks/store/get/useDefaultLanguage";
import { useAddConversation } from "../hooks/store/set/useAddConversation";
import { useAddMessage } from "../hooks/store/set/useAddMessage";
import { useSetTyping } from "../hooks/store/set/useSetTyping";
import { useNewAvatar } from "../hooks/util/useNewAvatar";
import { strings } from "../res/strings";
import { Conversation } from "../store/AppModel";

export const AddConversationModal = ({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
}) => {
	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);

	const toast = useToast();

	const appLanguage = useAppLanguage(),
		defaultLanguage = useDefaultLanguage();

	const api = useGptApi();

	const [prompt, setPrompt] = React.useState<string>("");
	const [language, setLanguage] = React.useState<Language>(defaultLanguage);

	const examplePlaceholder = useMemo(
		() => strings.getString("placeholders.prompt", getCode(language)),
		[language]
	);

	useEffect(() => {
		setLanguage(defaultLanguage);
	}, [defaultLanguage]);

	const ts = Date.now().toString();

	const addConversation = useAddConversation(),
		addMessage = useAddMessage(ts),
		createAvatar = useNewAvatar(),
		setTyping = useSetTyping(ts);

	const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setLanguage(e.target.value as Language);
	};

	const showEmptyPromptToast = () => {
		toast({
			title: strings.errors.mustFillOutAllFields,
			status: "error",
			duration: 3000,
			isClosable: true,
		});
	};

	const showAddedConversationToast = () => {
		toast({
			title: strings.success.createdNewConversation,
			status: "success",
			duration: 3000,
			isClosable: true,
		});
	};

	const resetForm = () => {
		setPrompt("");
		setLanguage(defaultLanguage);
	};

	const handleSaveClicked = () => {
		if (prompt === "") {
			showEmptyPromptToast();
			return;
		}

		const conversation: Conversation = {
			id: ts,
			bot: {
				name: prompt,
				avatar: createAvatar(prompt),
				description: getFlag(language),
				prompt: prompt,
				isTyping: true,
				studyInfo: {
					speaks: language,
					learns: appLanguage,
				},
			},
			messages: [],
		};

		addConversation(conversation);
		showAddedConversationToast();
		resetForm();
		onClose();

		console.log("making request to gpt api");

		api.start(conversation).then((message) => {
			console.log("got response from gpt api");
			if (message) {
				addMessage(message);
				setTyping(false);
			}
		});
	};

	return (
		<Modal
			initialFocusRef={initialRef}
			finalFocusRef={finalRef}
			isOpen={isOpen}
			onClose={onClose}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{strings.titles.createConversation}</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<FormControl>
						<FormLabel>{strings.titles.prompt}</FormLabel>
						<Input
							ref={initialRef}
							value={prompt}
							onChange={(e) => setPrompt(e.target.value)}
							placeholder={examplePlaceholder}
						/>
					</FormControl>

					<FormControl mt={4}>
						<FormLabel>{strings.titles.language}</FormLabel>
						<Select onChange={handleFormChange} value={language}>
							{Object.values(Language).map((lang) => (
								<option key={lang} value={lang}>
									{getFlag(lang) + " " + lang}
								</option>
							))}
						</Select>
					</FormControl>
				</ModalBody>

				<ModalFooter>
					<Button onClick={onClose}>{strings.buttons.cancel}</Button>
					<Button onClick={handleSaveClicked}>{strings.buttons.save}</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
