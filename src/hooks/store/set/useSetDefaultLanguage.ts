import { Language } from "../../../classes/Language";
import { useAppModel } from "../../../store/store";

export const useSetDefaultLanguage = () => {
	const setter = (language: Language) => {
		useAppModel.setState((state) => {
			state.preferences.defaultLanguage = language;
		});
	};
	return setter;
};
