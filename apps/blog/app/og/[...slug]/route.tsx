export const runtime = 'edge'

import { ImageResponse } from 'next/og'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title')
  const date = searchParams.get('date')

  return new ImageResponse(
    (
      <div className="flex p-10 h-full w-full bg-white flex-col">
        <header className="flex text-[36px] w-full">
          <div className="font-bold">Frontend Engineer - 박준형</div>
          <div className="grow" />
          <div className="text-[28px]">dev-bbak.site</div>
        </header>

        <main className="flex grow pb-3 flex-col items-center justify-center">
          <div className="flex">
            <div className="bg-gray-100 p-8 text-7xl font-medium rounded-md text-center">{title}</div>
          </div>

          <div className="mt-5 flex text-3xl text-gray-500">{date}</div>
        </main>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
