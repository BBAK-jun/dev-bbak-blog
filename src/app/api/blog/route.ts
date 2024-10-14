import { NextRequest, NextResponse } from 'next/server'

import { getPosts } from 'actions/get-posts'

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)

  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '10', 10)

  const result = await getPosts({ page, limit })

  return NextResponse.json(result)
}
