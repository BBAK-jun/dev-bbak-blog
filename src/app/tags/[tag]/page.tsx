import { getPosts } from 'actions/get-posts'
import siteMetadata from 'data/siteMetadata'
import ListLayout from 'layouts/ListLayoutWithTags'
import { Metadata } from 'next'
import { genPageMetadata } from 'src/app/seo'
import tagData from 'src/app/tag-data.json'

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

export default async function TagPage({ params }: { params: { tag: string } }) {
  const filteredPosts = await getPosts({ tag: params.tag })

  const title = params.tag[0].toUpperCase() + params.tag.split(' ').join('-').slice(1)
  return <ListLayout initialPosts={filteredPosts.data} title={title} tag={params.tag} />
}
