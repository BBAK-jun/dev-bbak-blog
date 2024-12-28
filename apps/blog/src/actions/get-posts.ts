'use server'

import { allBlogs, Blog } from 'contentlayer/generated'

type Options = {
  tag?: string
  page?: number
  limit?: number
  infinite?: boolean
}

type PostMetaData = {
  totalCount: number
  totalPages: number
  currentPage: number
  hasMore: boolean
  data: Blog[]
}

export const getPosts = async (options?: Options): Promise<PostMetaData> => {
  const page = options?.page || 1
  const limit = options?.limit || 10
  const tag = options?.tag
  const infinite = options?.infinite

  let sortedBlogs = allBlogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (infinite) {
    return {
      totalCount: sortedBlogs.length,
      totalPages: 1,
      currentPage: 1,
      hasMore: false,
      data: sortedBlogs,
    }
  }

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
