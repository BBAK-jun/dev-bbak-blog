import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'

const DEV_POSTS = allBlogs.filter((post) => post.tags.includes('DEV'))

export default async function Page() {
  const sortedPosts = sortPosts(DEV_POSTS)
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} />
}
