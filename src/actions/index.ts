import { getHeaderBanners } from '~actions/banners'
import { getCoursePage } from '~actions/coursePage'
import { getResults } from '~actions/results'
import { getCaptchaConfig } from '~actions/config'

export const server = {
  getHeaderBanners,
  getCoursePage,
  getResults,
  getCaptchaConfig,
}
