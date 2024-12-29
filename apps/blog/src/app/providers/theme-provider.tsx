'use client'

import siteMetadata from 'data/siteMetadata'
import { ThemeProvider } from 'next-themes'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export const ThemeProviders = ({ children }: Props) => {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme} enableSystem>
      {children}
    </ThemeProvider>
  )
}
