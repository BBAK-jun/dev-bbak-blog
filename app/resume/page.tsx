import { genPageMetadata } from 'app/seo'
import 'react-notion/src/styles.css'

import { NotionRenderer } from 'react-notion'

export const metadata = genPageMetadata({ title: 'Resume' })

export default async function ResumePage() {
  const blockMap = await fetch(
    'https://notion-api.splitbee.io/v1/page/PARK-JUN-HYEONG-1663efd1ad7e454388e504ed4e0c2a8a'
  ).then((res) => res.json())

  return <NotionRenderer blockMap={blockMap} />
}
