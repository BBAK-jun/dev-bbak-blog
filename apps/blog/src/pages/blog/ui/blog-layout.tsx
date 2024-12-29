'use server'

import { ThemeProviders } from 'src/app/providers'
import siteMetadata from 'data/siteMetadata'
import { NextFontWithVariable } from 'next/dist/compiled/@next/font'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { SearchConfig, SearchProvider } from 'pliny/search'
import { SectionContainer } from 'shared/ui'
import { Footer, Header } from 'widgets/ui'

type Props = {
  children: React.ReactNode
  font: NextFontWithVariable
}

const BlogLayout = async ({ children, font }: Props) => {
  return (
    <html lang={siteMetadata.language} className={`${font.variable} scroll-smooth`} suppressHydrationWarning>
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="icon" type="image/svg+xml" href="/static/favicons/favicon.svg" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <body className="bg-white text-black antialiased dark:bg-gray-800 dark:text-white">
        <ThemeProviders>
          <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
          <SectionContainer>
            <div className="flex h-screen flex-col justify-between font-sans">
              <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
                <Header />
                <main className="mb-auto">{children}</main>
              </SearchProvider>
              <Footer />
            </div>
          </SectionContainer>
        </ThemeProviders>
      </body>
    </html>
  )
}

export default BlogLayout
