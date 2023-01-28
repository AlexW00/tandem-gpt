import { useAppModel } from "../../../store/store";

export const usePreferences = () => {
	const preferences = useAppModel((store) => store.preferences);
	return preferences;
};
