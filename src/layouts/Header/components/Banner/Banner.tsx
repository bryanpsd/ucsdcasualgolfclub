import type { Options } from '@contentful/rich-text-react-renderer'
import { BLOCKS, type Document, INLINES } from '@contentful/rich-text-types'
import { Link } from '~components/Link'
import { TextBlockSection } from '~components/TextBlockSection'
import { Typography } from '~components/Typography'
import type { TypeBannerProps } from '~types/contentful/TypeBanner'

import * as styles from './Banner.css'

export type BannerProps = {
  banner: TypeBannerProps[]
  currentPath: string
}

const bannerOptions: Options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) => (
      <Typography color="inverse" variant="bodyMd" align="center">
        {children}
      </Typography>
    ),
    [INLINES.HYPERLINK]: (node, children) => {
      return (
        <Link className={styles.bannerLink} href={node.data.uri}>
          {children}
        </Link>
      )
    },
  },
}

export const Banner = ({ banner, currentPath }: BannerProps) => {
  const globalBanner = banner.find((item) => item.global)
  const pageBanner = banner.find((item) => item.pages?.includes(currentPath))
  const currentBanner = pageBanner || globalBanner

  return (
    currentBanner && (
      <section className={styles.bannerWrapper}>
        <TextBlockSection text={currentBanner.body as Document} options={bannerOptions} />
      </section>
    )
  )
}
