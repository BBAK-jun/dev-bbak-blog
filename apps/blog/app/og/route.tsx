export const runtime = 'edge'

import { ImageResponse } from 'next/og'
import { OpenGraphImage } from 'shared/ui'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title')
  const date = searchParams.get('date')
  const category = searchParams.get('category')

  if (!title || !date || !category) {
    return new Response('Missing title or date query parameter', { status: 400 })
  }

  return new ImageResponse(<OpenGraphImage title={title} date={date} category={category} />, {
    width: 1200,
    height: 630,
  })
}
