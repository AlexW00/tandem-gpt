export enum Language {
	en = "English",
	de = "German",
	jp = "Japanese",
}

export const getFlag = (language: Language) => {
	switch (language) {
		case Language.en:
			return "🇬🇧";
		case Language.de:
			return "🇩🇪";
		case Language.jp:
			return "🇯🇵";
	}
};
