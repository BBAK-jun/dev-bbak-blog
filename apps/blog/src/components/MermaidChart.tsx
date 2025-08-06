'use client'

import mermaid from 'mermaid'
import React, { useEffect, useRef } from 'react'

const MermaidChart = ({ chart }: { chart: string }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      mermaid.initialize({ startOnLoad: true })
      mermaid.contentLoaded()
    }
  }, [chart])

  return (
    <div ref={ref} className="mermaid">
      {chart}
    </div>
  )
}

export default MermaidChart
