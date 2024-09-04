import { genPageMetadata } from 'src/app/seo'
import { BlockMapType, NotionRenderer } from 'react-notion'
import 'react-notion/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'

export const revalidate = 3600

export const metadata = genPageMetadata({ title: 'Resume' })

export default async function ResumePage() {
  const blockMap: BlockMapType = await fetch(
    `https://notion-api.splitbee.io/v1/page/${process.env.NOTION_RESUME_PAGE_ID}`
  ).then((res) => res.json())

  return <NotionRenderer blockMap={blockMap} />
}
