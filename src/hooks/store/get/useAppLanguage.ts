import { useAppModel } from "../../../store/store";

export const useAppLanguage = () => {
	const language = useAppModel((store) => store.preferences.appLanguage);
	return language;
};
