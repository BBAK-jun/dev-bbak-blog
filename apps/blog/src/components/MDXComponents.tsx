import type { MDXComponents } from 'mdx/types'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import Pre from 'pliny/ui/Pre'
import TOCInline from 'pliny/ui/TOCInline'

import Image from './Image'
import CustomLink from './Link'
import YouTube from './Youtube'

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
