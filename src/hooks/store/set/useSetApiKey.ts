import { useAppModel } from "../../../store/store";

export const useSetApiKey = () => {
	const setter = (apiKey: string) => {
		useAppModel.setState((state) => {
			state.preferences.apiKey = apiKey;
		});
	};
	return setter;
};
