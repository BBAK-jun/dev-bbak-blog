'use client'

import { ThemeProvider } from 'next-themes'
import React from 'react'

import siteMetadata from '../../data/siteMetadata'

export const ThemeProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme} enableSystem>
      {children}
    </ThemeProvider>
  )
}
