import { genPageMetadata } from 'app/seo'
import { BlockMapType, NotionRenderer } from 'react-notion'
import 'react-notion/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'
import siteMetadata from '@/data/siteMetadata'

export const metadata = genPageMetadata({ title: 'Resume' })

export default async function ResumePage() {
  const blockMap: BlockMapType = await fetch(
    `https://notion-api.splitbee.io/v1/page/${process.env.NEXT_PUBLIC_NOTION_RESUME}`
  ).then((res) => res.json())

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Resume
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          {siteMetadata.description}
        </p>
      </div>
      <div className="container py-12">
        <NotionRenderer blockMap={blockMap} />
      </div>
    </div>
  )
}
