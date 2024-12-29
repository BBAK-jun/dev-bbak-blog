'use client'

import siteMetadata from 'data/siteMetadata'
import { Comments as CommentsComponent } from 'pliny/comments'

type Props = {
  slug: string
}

const Comments = ({ slug }: Props) => {
  return siteMetadata.comments && <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
}

export default Comments
