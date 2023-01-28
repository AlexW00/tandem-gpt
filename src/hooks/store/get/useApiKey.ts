import { useAppModel } from "../../../store/store";

export const useApiKey = () => {
	const key = useAppModel((store) => store.preferences.apiKey);
	return key;
};
