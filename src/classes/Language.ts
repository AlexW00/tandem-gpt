export enum Language {
	en = "English",
	de = "German",
	jp = "Japanese",
	kr = "Korean",
}

export const getFlag = (language: Language) => {
	switch (language) {
		case Language.en:
			return "🇬🇧";
		case Language.de:
			return "🇩🇪";
		case Language.jp:
			return "🇯🇵";
		case Language.kr:
			return "🇰🇷";
	}
};
