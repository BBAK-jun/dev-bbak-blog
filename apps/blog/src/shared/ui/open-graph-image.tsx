import React from 'react'

type Props = {
  title: string
  date: string
  category: string
}

const blogTags = ['#FrontendDev', '#TechBlog']

const BlogOGImage = ({ title, date, category }: Props) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      padding: '40px',
      backgroundColor: '#ffffff',
      color: '#1a202c',
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
      }}
    >
      <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Frontend Engineer - 박준형</div>
      <div style={{ fontSize: '16px', color: '#718096' }}>dev-bbak.site</div>
    </div>

    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '16px',
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: '18px',
            color: '#4a5568',
          }}
        >
          {date} • {category}
        </div>
      </div>
    </div>

    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid #e2e8f0',
        paddingTop: '20px',
        color: '#718096',
        fontSize: '14px',
      }}
    >
      <div>{'{ "lang": "typescript", "framework": "react" }'}</div>
      <div>{blogTags.join(' ')}</div>
    </div>
  </div>
)

export default BlogOGImage
