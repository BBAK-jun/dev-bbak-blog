import 'react-notion/src/styles.css'

import { BlockMapType, NotionRenderer } from 'react-notion'
import { genPageMetadata } from 'src/app/seo'

export const revalidate = 3600

export const metadata = genPageMetadata({ title: 'Resume' })

export default async function ResumePage() {
  const blockMap: BlockMapType = await fetch(
    `https://notion-api.splitbee.io/v1/page/${process.env.NEXT_PUBLIC_NOTION_RESUME}`,
  ).then((res) => res.json())

  return <NotionRenderer blockMap={blockMap} />
}
