'use server'

import { allBlogs } from 'contentlayer/generated'

type Options = {
  tag?: string
  page?: number
  limit?: number
}

export const getPosts = async (options?: Options) => {
  const page = options?.page || 1
  const limit = options?.limit || 10
  const tag = options?.tag

  let sortedBlogs = allBlogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (tag) {
    sortedBlogs = sortedBlogs.filter((post) => {
      if (!post.tags) return false

      const tags = post.tags.map((t) => t.toLowerCase())

      return tags.includes(tag)
    })
  }

  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const paginatedBlogs = sortedBlogs.slice(startIndex, endIndex)

  // 다음 페이지가 있는지 확인
  const hasMore = endIndex < sortedBlogs.length

  return {
    totalCount: sortedBlogs.length,
    totalPages: Math.ceil(allBlogs.length / limit),
    currentPage: page,
    hasMore: hasMore,
    data: paginatedBlogs,
  }
}
