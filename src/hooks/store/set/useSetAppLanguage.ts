import { Language } from "../../../classes/Language";
import { useAppModel } from "../../../store/store";

export const useSetAppLanguage = () => {
	const setter = (language: Language) => {
		useAppModel.setState((state) => {
			state.preferences.appLanguage = language;
		});
	};
	return setter;
};
