import { BlogPage } from 'pages/blog/ui'

type Props = {
  searchParams: {
    page: string
    limit: string
  }
}

const RootPage = ({ searchParams }: Props) => {
  return <BlogPage page={searchParams.page} limit={searchParams.limit} />
}

export default RootPage
