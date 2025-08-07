'use client'

import siteMetadata from 'data/siteMetadata'
import { Comments as CommentsComponent } from 'pliny/comments'

const Comments = ({ slug }: { slug: string }) => {
  console.log(siteMetadata.comments, slug)
  return siteMetadata.comments && <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
}

export default Comments
