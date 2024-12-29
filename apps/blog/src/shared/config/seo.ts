import siteMetadata from 'data/siteMetadata'
import { Metadata } from 'next'

interface PageSEOProps {
  title: string
  description?: string
  image?: string
  alternates?: {
    canonical: string
    types: {
      'application/rss+xml': string
    }
  }
}

export function genPageMetadata({ title, description, ...rest }: PageSEOProps): Metadata {
  return {
    title,
    openGraph: {
      title: `${title} | ${siteMetadata.title}`,
      description: description || siteMetadata.description,
      url: './',
      siteName: siteMetadata.title,
      images: `/og?title=${title}&date=${new Date().toISOString()}&category=home`,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: `${title} | ${siteMetadata.title}`,
      card: 'summary_large_image',
      images: `/og?title=${title}&date=${new Date().toISOString()}&category=home`,
    },
    ...rest,
  }
}
