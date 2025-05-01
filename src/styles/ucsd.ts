import type { FlatMut } from '../types'

const constUCSD = {
  typography: {
    fontFamily: 'Roboto, serif',
    color: '#000000',
    variants: {
      headline: {
        fontSize: '3.6rem',
        lineHeight: '4.4rem',
        fontWeight: 400,
      },
      displayTitle: {
        fontSize: '3.2rem',
        lineHeight: '4.0rem',
        fontWeight: 400,
      },
      pageTitle: {
        fontSize: '2.4rem',
        lineHeight: '3.0rem',
        fontWeight: 400,
      },
      mediumTitle: {
        fontSize: '2.4rem',
        lineHeight: '2.8rem',
        fontWeight: 500,
      },
      title: {
        fontSize: '2.4rem',
        lineHeight: '2.4rem',
        fontWeight: 400,
      },
      heroTitle: {
        fontSize: '2.0rem',
        lineHeight: '2.4rem',
        fontWeight: 400,
      },
      sectionTitle: {
        fontSize: '1.6rem',
        lineHeight: '2.0rem',
        fontWeight: 400,
      },
      largeBody: {
        fontSize: '1.6rem',
        lineHeight: '2.0rem',
        fontWeight: 400,
      },
      body: {
        fontSize: '1.4rem',
        lineHeight: '1.8rem',
        fontWeight: 400,
      },
      smallBody: {
        fontSize: '1.2rem',
        lineHeight: '1.6rem',
        fontWeight: 400,
      },
      disclaimer: {
        fontSize: '1.1rem',
        lineHeight: '1.4rem',
        fontWeight: 400,
      },
      navigation: {
        fontSize: '1.3125rem',
        lineHeight: '1.6rem',
        fontWeight: 400,
      },
      smallNavigation: {
        fontSize: '1.1rem',
        lineHeight: '1.4rem',
        fontWeight: 400,
      },
      micro: {
        fontSize: '1.0rem',
        lineHeight: '1.2rem',
        fontWeight: 400,
      },
      caption: {
        fontSize: '0.9rem',
        lineHeight: '1.6rem',
        fontWeight: 400,
      },
    },
  },
} as const

export const ucsd = constUCSD as FlatMut<typeof constUCSD>
