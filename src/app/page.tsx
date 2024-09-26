'use server'

import { getPosts } from 'actions/get-posts'

import Posts from 'components/Posts'

export default async function Page() {
  const { data: posts } = await getPosts()

  return <Posts initialPosts={posts} />
}
