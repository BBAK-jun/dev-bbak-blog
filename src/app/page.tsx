'use server'

import { getPosts } from 'actions/get-posts'
import { allBlogs } from 'contentlayer/generated'

import ListLayout from 'layouts/ListLayout'

type Props = {
  searchParams: {
    page: string
    limit: string
  }
}

export default async function Page({ searchParams }: Props) {
  const pagination = {
    page: parseInt(searchParams.page) || 1,
    limit: parseInt(searchParams.limit) || 10,
  }
  const {
    data: posts,
    totalPages,
    currentPage,
  } = await getPosts({
    page: pagination.page,
    limit: pagination.limit,
  })

  return (
    <ListLayout
      posts={allBlogs}
      initialDisplayPosts={posts}
      title="안녕하세요 프론트엔드 개발자 박준형입니다."
      pagination={{ totalPages, currentPage }}
      basePath="/"
    />
  )
}
