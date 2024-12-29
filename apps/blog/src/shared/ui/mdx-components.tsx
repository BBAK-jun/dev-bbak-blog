/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { MDXComponents } from 'mdx/types'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import Pre from 'pliny/ui/Pre'
import TOCInline from 'pliny/ui/TOCInline'

import Image from './image'
import CustomLink from './link'
import YouTube from './youtube'

export const components: MDXComponents = {
  Image,
  TOCInline,
  // @ts-expect-error
  a: CustomLink,
  // @ts-expect-error
  pre: Pre,
  BlogNewsletterForm,
  YouTube,
}
