import { createAvatar } from "@dicebear/core";
import { personas } from "@dicebear/collection";

export const useNewAvatar = () => (seed: string) => {
	const avatar = createAvatar(personas, {
		seed,
	});

	const svg = avatar.toString();
	return "data:image/svg+xml;base64," + btoa(svg);
};
