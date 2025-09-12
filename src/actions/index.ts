import { getHeaderBanners } from "~actions/banners"
import { getCaptchaConfig } from "~actions/config"
import { getCoursePage } from "~actions/coursePage"
import { getResults } from "~actions/results"

export const server = {
	getHeaderBanners,
	getCoursePage,
	getResults,
	getCaptchaConfig,
}
