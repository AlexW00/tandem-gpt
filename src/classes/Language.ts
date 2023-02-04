export enum Language {
	en = "English",
	de = "German",
	jp = "Japanese",
	kr = "Korean",
	it = "Italian",
	fr = "French",
	es = "Spanish",
	pt = "Portuguese",
	ru = "Russian",
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
		case Language.it:
			return "🇮🇹";
		case Language.fr:
			return "🇫🇷";
		case Language.es:
			return "🇪🇸";
		case Language.pt:
			return "🇵🇹";
		case Language.ru:
			return "🇷🇺";
	}
};

export const getCode = (language: Language) => {
	switch (language) {
		case Language.en:
			return "en";
		case Language.de:
			return "de";
		case Language.jp:
			return "jp";
		case Language.kr:
			return "kr";
		case Language.it:
			return "it";
		case Language.fr:
			return "fr";
		case Language.es:
			return "es";
		case Language.pt:
			return "pt";
		case Language.ru:
			return "ru";
	}
};
