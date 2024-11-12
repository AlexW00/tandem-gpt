import { createAvatar } from "@dicebear/core";
import { personas } from "@dicebear/collection";

function toBase64(str: string) {
	return btoa(unescape(encodeURIComponent(str)));
}

export const useNewAvatar = () => (seed: string) => {
	const avatar = createAvatar(personas, {
		seed,
	});

	const svg = avatar.toString();
	console.log(svg);
	return "data:image/svg+xml;base64," + toBase64(svg);
};
