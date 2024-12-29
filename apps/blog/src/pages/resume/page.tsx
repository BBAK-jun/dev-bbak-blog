import 'react-notion/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'

import { genPageMetadata } from 'app/seo'
import { BlockMapType, NotionRenderer } from 'react-notion'

export const revalidate = 3600

export const metadata = genPageMetadata({ title: 'Resume' })

export default async function ResumePage() {
  const blockMap: BlockMapType = await fetch(
    `https://notion-api.splitbee.io/v1/page/${process.env.NEXT_PUBLIC_NOTION_RESUME}`,
  ).then((res) => res.json())

  return <NotionRenderer blockMap={blockMap} />
}
