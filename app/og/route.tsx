import { ImageResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const fontData = await fetch(
      new URL('../../public/static/fonts/BlackHanSans-Regular.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer())
    const { searchParams } = new URL(request.url)

    const hasTitle = searchParams.has('title')
    const hasDescription = searchParams.has('description')
    const title = hasTitle ? searchParams.get('title')?.slice(0, 100) : 'Dev-bbak'
    const description = hasDescription
      ? searchParams.get('description')?.slice(0, 100)
      : '안녕하세요 프론트엔드 개발자 박준형입니다.'

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            height: '100%',
            width: '100%',
            fontSize: 100,
            fontFamily: '"BlackHanSans"',
            paddingTop: '100px',
            paddingLeft: '50px',
          }}
        >
          👋, 🌎
          <p style={{ color: 'black', fontSize: 48 }}>{title}</p>
          <p style={{ color: 'black', fontSize: 32 }}>{description}</p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        emoji: 'twemoji',
        fonts: [
          {
            name: 'BlackHanSans',
            data: fontData,
            style: 'normal',
          },
        ],
      }
    )
  } catch (error) {
    return new Response(`Failed to generate the Image`, { status: 500 })
  }
}
