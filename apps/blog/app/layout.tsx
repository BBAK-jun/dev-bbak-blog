import 'app/styles/prism.css'
import 'app/styles/tailwind.css'
import 'pliny/search/algolia.css'

import siteMetadata from 'data/siteMetadata'
import { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { BlogLayout } from 'pages/blog/ui'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: `/og?title=${siteMetadata.title}&date=${new Date().toISOString()}&category=home`,
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <BlogLayout font={spaceGrotesk}>{children}</BlogLayout>
}

export default RootLayout
