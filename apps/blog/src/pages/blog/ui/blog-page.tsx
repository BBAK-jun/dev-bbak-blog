'use server'

import { getPosts } from 'entities/api'
import { ListLayout } from 'widgets/ui'

type Props = {
  page: string
  limit: string
}

const BlogPage = async ({ page, limit }: Props) => {
  const pagination = {
    page: parseInt(page) || 1,
    limit: parseInt(limit) || 10,
  }
  const { data: posts, totalPages, currentPage } = await getPosts({ page: pagination.page, limit: pagination.limit })

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={posts}
      title="안녕하세요 프론트엔드 개발자 박준형입니다."
      pagination={{ totalPages, currentPage }}
      basePath="/"
    />
  )
}

export default BlogPage
