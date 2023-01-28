import { useAppModel } from "../../../store/store";

export const useDefaultLanguage = () => {
	const defaultLanguage = useAppModel(
		(store) => store.preferences.defaultLanguage
	);
	return defaultLanguage;
};
