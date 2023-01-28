import { useContext } from "react";
import { GptApiContext } from "../../contexts/GptApiContext";

export const useGptApi = () => {
	const api = useContext(GptApiContext);
	return api;
};
