export const replaceAllSpecialChars = (text: string, by: string): string => {
	if (!text) {
		return text;
	}

	return text.replace(/[ `~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, by);
};

export const removeAllSpecialChars = (text?: string): string => {
	if (text == null) {
		return "";
	}
	return replaceAllSpecialChars(text, "");
};

export const toKebabCase = (input = ""): string => {
	return input.toLocaleLowerCase().replace(/ /g, "-");
};

export const enumToStringArray = (enums: { [s: number]: string }, sort = true) => {
	let result = Object.values(enums).filter((value) => typeof value === "string");
	if (sort) {
		result = result.sort((one, two) =>
			one === "Other" || two === "Other" ? 1 : one > two ? 1 : -1,
		);
	}
	return result;
};

export const enumToKeyValueArray = (
	enums: {
		[s: number]: string;
	},
	filter?: Array<{
		[s: number]: string;
	}>,
): Array<{ label: string; value: string }> => {
	let values = Object.values(enums).filter((value) => typeof value === "string");
	if (filter) {
		values = values.filter((item) => !filter.includes(item));
	}
	return values.map((v) => {
		return { label: v, value: v };
	});
};

export const enumToValuesArray = (enums: { [s: number]: string }): Array<string> => {
	return enumToKeyValueArray(enums).map((e) => e.value);
};

export const toRef = (str?: string | number | boolean) => {
	if (str != null) {
		return String(removeAllSpecialChars(str.toString())).toLocaleLowerCase();
	} else {
		return "";
	}
};

export function isNullOrEmpty(str: string | null | undefined): boolean {
	return str == null || str.trim() === "";
}
