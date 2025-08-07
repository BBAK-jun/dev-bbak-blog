'use client'

import siteMetadata from 'data/siteMetadata'
import { Comments as CommentsComponent } from 'pliny/comments'

const Comments = ({ slug }: { slug: string }) => {
  return siteMetadata.comments && <CommentsComponent commentsConfig={siteMetadata.comments} slug={`blog/${slug}`} />
}

export default Comments
