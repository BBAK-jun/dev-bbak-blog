'use client'

import type { Blog } from 'contentlayer/generated'
import siteMetadata from 'data/siteMetadata'
import { getPosts } from 'entities/api'
import Tag from 'entities/ui/tag'
import { slug } from 'github-slugger'
import { usePathname } from 'next/navigation'
import { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'
import { useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Link } from 'shared/ui'
import tagData from 'tag-data'

interface ListLayoutProps {
  initialPosts: Blog[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  tag?: string
}

const ListLayoutWithTags = ({ initialPosts, title, initialDisplayPosts = [], tag }: ListLayoutProps) => {
  const [posts, setPosts] = useState(initialPosts)
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [hasMore, setHasMore] = useState(true)
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  const { ref, inView } = useInView()

  const loadMorePosts = useCallback(async () => {
    const morePosts = await getPosts({ page, limit, tag })

    setPosts([...posts, ...morePosts.data])
    setPage(morePosts.currentPage + 1)
    setHasMore(morePosts.hasMore)
  }, [limit, page, posts, tag])

  useEffect(() => {
    if (inView) {
      loadMorePosts()
    }
  }, [inView, loadMorePosts])

  return (
    <div>
      <div className="pb-6 pt-6">
        <h1 className="sm:hidden text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {title}
        </h1>
      </div>
      <div className="flex sm:space-x-24">
        <div className="hidden max-h-screen h-full sm:flex flex-wrap bg-gray-50 dark:bg-gray-900/70 shadow-md pt-5 dark:shadow-gray-800/40 rounded min-w-[280px] max-w-[280px]">
          <div className="py-4 px-6">
            {pathname?.startsWith('/blog') ? (
              <h3 className="text-primary-500 font-bold uppercase">All Posts</h3>
            ) : (
              <Link
                href={`/blog`}
                className="font-bold uppercase text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500"
              >
                All Posts
              </Link>
            )}
            <ul>
              {sortedTags.map((t) => {
                return (
                  <li key={t} className="my-3">
                    {pathname?.split('/tags/')[1] === slug(t) ? (
                      <h3 className="inline py-2 px-3 uppercase text-sm font-bold text-primary-500">
                        {`${t} (${tagCounts[t]})`}
                      </h3>
                    ) : (
                      <Link
                        href={`/tags/${slug(t)}`}
                        className="py-2 px-3 uppercase text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500"
                        aria-label={`View posts tagged ${t}`}
                      >
                        {`${t} (${tagCounts[t]})`}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div>
          <ul>
            {displayPosts.map((post) => {
              const { path, date, title, summary, tags } = post
              return (
                <li key={path} className="py-5">
                  <article className="space-y-2 flex flex-col xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-3">
                      <div>
                        <h2 className="text-2xl font-bold leading-8 tracking-tight">
                          <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
                            {title}
                          </Link>
                        </h2>
                        <div className="flex flex-wrap">{tags?.map((tag) => <Tag key={tag} text={tag} />)}</div>
                      </div>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">{summary}</div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
          {hasMore && <div ref={ref}>Loading...</div>}
        </div>
      </div>
    </div>
  )
}

export default ListLayoutWithTags
