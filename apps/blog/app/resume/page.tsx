import 'react-notion/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'

import { BlockMapType, NotionRenderer } from 'react-notion'
import { genPageMetadata } from 'shared/config'

export const revalidate = 3600

export const metadata = genPageMetadata({ title: 'Resume' })

const ResumePage = async () => {
  const response = await fetch(`https://notion-api.splitbee.io/v1/page/${process.env.NEXT_PUBLIC_NOTION_RESUME}`)

  const blockMap = (await response.json()) as BlockMapType

  return <NotionRenderer blockMap={blockMap} />
}

export default ResumePage
