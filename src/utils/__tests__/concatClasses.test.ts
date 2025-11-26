import { describe, expect, it } from "vitest";
import { concatClasses } from "../concatClasses";

describe("concatClasses", () => {
	it("should concatenate string classes", () => {
		const result = concatClasses(["class1", "class2", "class3"]);
		expect(result).toBe("class1 class2 class3");
	});

	it("should filter out undefined values", () => {
		const result = concatClasses(["class1", undefined, "class2", undefined, "class3"]);
		expect(result).toBe("class1 class2 class3");
	});

	it("should handle empty array", () => {
		const result = concatClasses([]);
		expect(result).toBe("");
	});

	it("should handle array with only falsy values", () => {
		const result = concatClasses([undefined, undefined, ""]);
		expect(result).toBe("");
	});

	it("should handle whitespace in class names", () => {
		const result = concatClasses(["class1  ", "  class2", "class3"]);
		// concatClasses preserves whitespace within individual class strings
		expect(result).toBe("class1     class2 class3");
	});
});
