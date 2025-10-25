import { css, Theme } from '@emotion/react'
import { ReactNode } from 'react'

import type { DeepPartial } from 'react-hook-form'

import type { FormValues } from '@/lib/schema'
import { Skeleton } from '@/components/common/skeleton'
import type { PreviewQuote } from '@/features/preview-form/utils/preview-utils'
import { hasMeaningfulValue } from '@/features/preview-form/utils/preview-utils'

const bookMeta = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1)};
  border-radius: ${theme.radius.md}px;
  background: ${theme.color.surface};

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: ${theme.color.text};
    margin: 0;
  }

  span {
    font-size: 13px;
    color: ${theme.color.muted};
  }
`

const reflectionBox = (theme: Theme) => css`
  border-radius: ${theme.radius.md}px;
  background: ${theme.color.surface};
  font-size: 14px;
  line-height: 1.6;
  color: ${theme.color.text};
  white-space: pre-wrap;
  display: grid;
  gap: ${theme.spacing(1)};
`

const sectionTitle = (theme: Theme) => css`
  font-size: 13px;
  font-weight: 700;
  color: ${theme.color.muted};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: ${theme.spacing(1)};
`

const quotesList = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(2)};
  padding: 0;

  li {
    list-style: none;
    border-left: 2px solid ${theme.color.border};
    padding-left: ${theme.spacing(2)};
    display: grid;
    gap: ${theme.spacing(1)};
  }

  blockquote {
    font-size: 14px;
    line-height: 1.6;
    color: ${theme.color.text};
    margin: 0;
  }

  cite {
    font-size: 12px;
    color: ${theme.color.muted};
  }
`

const placeholderList = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(2)};
`

export function BookMetaSection({ values, isLoading }: { values?: DeepPartial<FormValues>; isLoading: boolean }) {
  return (
    <div css={bookMeta}>
      <h3>{renderText(values?.bookTitle, isLoading, { width: '70%', height: 18 })}</h3>
      <span>{renderText(values?.author, isLoading, { width: '50%' })}</span>
      <span>{renderText(values?.publisher, isLoading, { width: '40%' })}</span>
    </div>
  )
}

export function PreviewField({
  label,
  value,
  isVisible = true,
  isLoading,
  skeletonWidth = '60%',
}: {
  label: string
  value?: ReactNode
  isVisible?: boolean
  isLoading: boolean
  skeletonWidth?: number | string
}) {
  if (!isVisible) return null
  const hasContent = hasMeaningfulValue(value)

  return (
    <div>
      <dt>{label}</dt>
      <dd>{isLoading || !hasContent ? <Skeleton width={skeletonWidth} /> : value}</dd>
    </div>
  )
}

export function ReflectionSection({ reflection, isLoading }: { reflection?: string; isLoading: boolean }) {
  const trimmedReflection = reflection?.trim()

  return (
    <section css={reflectionBox}>
      <h4 css={sectionTitle}>독후감</h4>
      {isLoading || !trimmedReflection ? (
        <>
          <Skeleton />
          <Skeleton width="80%" />
          <Skeleton width="65%" />
        </>
      ) : (
        trimmedReflection
      )}
    </section>
  )
}

export function QuotesSection({ quotes, isLoading }: { quotes: PreviewQuote[]; isLoading: boolean }) {
  const shouldShowPlaceholder = isLoading || quotes.length === 0

  return (
    <section>
      <h4 css={sectionTitle}>인용구</h4>
      {shouldShowPlaceholder ? (
        <div css={placeholderList}>
          <Skeleton height={48} />
          <Skeleton height={48} width="85%" />
        </div>
      ) : (
        <ul css={quotesList}>
          {quotes.map((quote, index) => (
            <li key={`${quote.content}-${index}`}>
              <blockquote>{quote.content}</blockquote>
              {quote.page ? (
                <cite>
                  {(() => {
                    const n = Number(quote.page)
                    return Number.isFinite(n) ? new Intl.NumberFormat('ko-KR').format(n) : quote.page
                  })()}
                  쪽
                </cite>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function renderText(
  content: string | undefined,
  isLoading: boolean,
  skeletonProps: { width?: number | string; height?: number }
) {
  if (isLoading || !content?.trim()) {
    return <Skeleton {...skeletonProps} />
  }
  return content
}
