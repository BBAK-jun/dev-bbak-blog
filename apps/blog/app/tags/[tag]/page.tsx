/* eslint-disable react-refresh/only-export-components */

'use server'

import siteMetadata from 'data/siteMetadata'
import { getPosts } from 'entities/api'
import { Metadata } from 'next'
import { genPageMetadata } from 'shared/config'
import tagData from 'tag-data'
import { ListLayoutWithTags } from 'widgets/ui'

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  const tag = params.tag
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  })
}

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const paths = tagKeys.map((tag) => ({
    tag: tag,
  }))
  return paths
}

const TagPage = async ({ params }: { params: { tag: string } }) => {
  const filteredPosts = await getPosts({ tag: params.tag })

  const title = params.tag[0].toUpperCase() + params.tag.split(' ').join('-').slice(1)
  return <ListLayoutWithTags initialPosts={filteredPosts.data} title={title} tag={params.tag} />
}

export default TagPage
