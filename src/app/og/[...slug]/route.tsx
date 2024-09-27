export const runtime = 'edge'

import { getPostDetail } from 'actions/get-post-detail'
import { ImageResponse } from 'next/og'

export async function GET(_req: Request, { params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'))
  const { post } = await getPostDetail(slug)

  return new ImageResponse(
    (
      <div tw="flex p-10 h-full w-full bg-white flex-col" style={font('Inter 300')}>
        <header tw="flex text-[36px] w-full">
          <div tw="font-bold" style={font('Inter 600')}>
            Frontend Engineer - 박준형
          </div>
          <div tw="grow" />
          <div tw="text-[28px]">dev-bbak.site</div>
        </header>

        <main tw="flex grow pb-3 flex-col items-center justify-center">
          <div tw="flex">
            <div
              tw="bg-gray-100 p-8 text-7xl font-medium rounded-md text-center"
              style={font('Inter 500')}
            >
              {post.title}
            </div>
          </div>

          <div tw="mt-5 flex text-3xl text-gray-500" style={font('Roboto Mono 400')}>
            {post.date}
          </div>
        </main>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}

// lil helper for more succinct styles
function font(fontFamily: string) {
  return { fontFamily }
}
