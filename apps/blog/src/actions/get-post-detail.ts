'use server'

import { Authors, allAuthors, allBlogs } from 'contentlayer/generated'
import { coreContent } from 'pliny/utils/contentlayer'

export const getPostDetail = async (slug: string) => {
  const sortedBlogs = allBlogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const postIndex = sortedBlogs.findIndex((p) => p.slug === slug)

  const post = sortedBlogs.find((p) => p.slug === slug)!
  const authorList = post?.authors || ['default']

  return {
    prevPost: coreContent(sortedBlogs[postIndex + 1]),
    nextPost: coreContent(sortedBlogs[postIndex - 1]),
    post,
    mainContent: coreContent(post),
    authorDetails: authorList.map((author) => {
      const authorResults = allAuthors.find((p) => p.slug === author)
      return coreContent(authorResults as Authors)
    }),
  }
}
