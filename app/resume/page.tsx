import { genPageMetadata } from 'app/seo'
import { BlockMapType, NotionRenderer } from 'react-notion'
import 'react-notion/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'

export const metadata = genPageMetadata({ title: 'Resume' })

export default async function ResumePage() {
  const blockMap: BlockMapType = await fetch(
    'https://notion-api.splitbee.io/v1/page/PARK-JUN-HYEONG-1663efd1ad7e454388e504ed4e0c2a8a'
  ).then((res) => res.json())

  return <NotionRenderer blockMap={blockMap} />
}
