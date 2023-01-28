import {
	useDisclosure,
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
import React from "react";
import { getFlag, Language } from "../classes/Language";
import { useAppLanguage } from "../hooks/store/get/useAppLanguage";
import { useDefaultLanguage } from "../hooks/store/get/useDefaultLanguage";
import { useAddConversation } from "../hooks/store/set/useAddConversation";
import { useNewAvatar } from "../hooks/util/useNewAvatar";
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

	const [prompt, setPrompt] = React.useState<string>("");
	const [language, setLanguage] = React.useState<Language>(defaultLanguage);

	const addConversation = useAddConversation(),
		createAvatar = useNewAvatar();

	const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setLanguage(e.target.value as Language);
	};

	const showEmptyPromptToast = () => {
		toast({
			title: "Prompt cannot be empty.",
			status: "error",
			duration: 3000,
			isClosable: true,
		});
	};

	const showAddedConversationToast = () => {
		toast({
			title: "Created new conversation.",
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
			id: Date.now().toString(),
			bot: {
				name: prompt,
				avatar: createAvatar(prompt),
				description: getFlag(language) + " " + language,
				prompt: prompt,
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
				<ModalHeader>Create Conversation</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<FormControl>
						<FormLabel>What did you learn?</FormLabel>
						<Input
							ref={initialRef}
							value={prompt}
							onChange={(e) => setPrompt(e.target.value)}
							placeholder="Homework, sausage, beans"
						/>
					</FormControl>

					<FormControl mt={4}>
						<FormLabel>Language</FormLabel>
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
					<Button onClick={onClose}>Cancel</Button>
					<Button onClick={handleSaveClicked}>Save</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
