/* eslint-disable react-refresh/only-export-components */
import 'app/styles/prism.css'
import 'katex/dist/katex.css'

import { allAuthors, allBlogs, type Authors } from 'contentlayer/generated'
import siteMetadata from 'data/siteMetadata'
import { getPostDetail } from 'entities/api'
import { Metadata } from 'next'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'
import { MDXComponents, PageTitle } from 'shared/ui'
import { PostBanner, PostLayout, PostSimple } from 'widgets/ui'

const isProduction = process.env.NODE_ENV === 'production'
const defaultLayout = 'PostLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata | void> {
  const slug = decodeURI(params.slug.join('/'))
  const post = allBlogs.find((p) => p.slug === slug)
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  if (!post) return

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  const authors = authorDetails.map((author) => author.name)
  let imageList = [siteMetadata.socialBanner]
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images
  }

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: `/og?title=${post.title}&date=${publishedAt}&category=${slug.split('/')[0]}`,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  }
}

export const generateStaticParams = async () => {
  const paths = allBlogs.map((p) => ({ slug: p.slug.split('/') }))

  return paths
}

const Page = async ({ params }: { params: { slug: string[] } }) => {
  const slug = decodeURI(params.slug.join('/'))

  const { prevPost, nextPost, mainContent, post, authorDetails } = await getPostDetail(slug)
  const jsonLd = post.structuredData
  jsonLd['author'] = authorDetails.map((author) => {
    return {
      '@type': 'Person',
      name: author.name,
    }
  })

  const Layout = layouts[(post.layout as unknown as keyof typeof layouts) ?? defaultLayout]

  return (
    <>
      {isProduction && post && 'draft' in post && post.draft === true ? (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      ) : (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
          <Layout content={mainContent} authorDetails={authorDetails} next={nextPost} prev={prevPost}>
            <MDXLayoutRenderer
              code={post.body.code}
              components={MDXComponents.components}
              toc={post.toc}
              key={post._id}
            />
          </Layout>
        </>
      )}
    </>
  )
}

export default Page
