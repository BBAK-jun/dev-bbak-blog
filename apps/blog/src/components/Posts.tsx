'use client'

import { getPosts } from 'actions/get-posts'
import { Blog } from 'contentlayer/generated'
import siteMetadata from 'data/siteMetadata'
import Link from 'next/link'
import { formatDate } from 'pliny/utils/formatDate'
import { useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import Tag from './Tag'

type PostsProps = {
  initialPosts: Blog[]
  tag?: string
}

export default function Posts({ initialPosts, tag }: PostsProps) {
  const [posts, setPosts] = useState(initialPosts)
  const [pagination, setPagination] = useState({ page: 2, limit: 10, hasMore: true })

  const { ref, inView } = useInView()

  const loadMorePosts = useCallback(async () => {
    const {
      data: loadedPosts,
      currentPage,
      hasMore,
    } = await getPosts({ page: pagination.page, limit: pagination.limit, tag })

    setPosts([...posts, ...loadedPosts])
    setPagination((prev) => ({
      ...prev,
      page: currentPage + 1,
      hasMore,
    }))
  }, [pagination.page, posts])

  useEffect(() => {
    if (inView) {
      loadMorePosts()
    }
  }, [inView, loadMorePosts])

  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {posts.map(({ slug, date, title, summary, tags, readingTime }) => (
        <li key={slug} className="py-12">
          <article>
            <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
              <dl>
                <dt className="sr-only">Published on</dt>
                <dd className="text-base font-medium leading-6 text-black-500 dark:text-white-400">
                  <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                </dd>
                <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                  0 views / {readingTime.text}
                </dd>
              </dl>
              <div className="space-y-5 xl:col-span-2">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold leading-8 tracking-tight">
                      <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                        {title}
                      </Link>
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                  <div className="prose max-w-none text-gray-500 dark:text-gray-400">{summary}</div>
                </div>
                <div className="text-base font-medium leading-6">
                  <Link
                    href={`/blog/${slug}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Read "${title}"`}
                  >
                    Read more &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </li>
      ))}

      {pagination.hasMore && <div ref={ref}>Loading...</div>}
    </ul>
  )
}
