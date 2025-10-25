import { css } from '@emotion/react'

type SkeletonProps = {
  height?: number
  width?: string | number
}

export function Skeleton({ height = 14, width = '100%' }: SkeletonProps) {
  return (
    <span
      css={(t) => css`
        display: inline-block;
        width: ${width};
        height: ${height}px;
        border-radius: ${t.radius.sm}px;
        background: ${t.color.border};
      `}
    />
  )
}
