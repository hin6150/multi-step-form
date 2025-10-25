import { ReactNode } from 'react'

import type { DeepPartial } from 'react-hook-form'

import type { FormValues } from '@/lib/schema'
import { Skeleton } from '@/components/common/skeleton'
import type { PreviewQuote } from '@/features/preview-form/utils/preview-utils'
import { formatNumberWithLocale, hasMeaningfulValue } from '@/features/preview-form/utils/preview-utils'
import { bookMeta, placeholderList, quotesList, reflectionBox, sectionTitle } from './form-preview-sections.styles'

export function BookMetaSection({ values }: { values?: DeepPartial<FormValues> }) {
  return (
    <div css={bookMeta}>
      <h3>{renderText(values?.bookTitle, { width: '70%', height: 18 })}</h3>
      <span>{renderText(values?.author, { width: '50%' })}</span>
      <span>{renderText(values?.publisher, { width: '40%' })}</span>
    </div>
  )
}

export function PreviewField({
  label,
  value,
  isVisible = true,
  skeletonWidth = '60%',
}: {
  label: string
  value?: ReactNode
  isVisible?: boolean
  skeletonWidth?: number | string
}) {
  if (!isVisible) return null
  const hasContent = hasMeaningfulValue(value)

  return (
    <div>
      <dt>{label}</dt>
      <dd>{hasContent ? value : <Skeleton width={skeletonWidth} />}</dd>
    </div>
  )
}

export function ReflectionSection({ reflection }: { reflection?: string }) {
  const trimmedReflection = reflection?.trim()

  return (
    <section css={reflectionBox}>
      <h4 css={sectionTitle}>독후감</h4>
      {!trimmedReflection ? (
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

export function QuotesSection({ quotes }: { quotes: PreviewQuote[] }) {
  const shouldShowPlaceholder = quotes.length === 0

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
          {quotes.map((quote, index) => {
            const formattedPage = formatNumberWithLocale(quote.page)

            return (
              <li key={`${quote.content}-${index}`}>
                <blockquote>{quote.content}</blockquote>
                {formattedPage ? <cite>{formattedPage}쪽</cite> : null}
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

function renderText(content: string | undefined, skeletonProps: { width?: number | string; height?: number }) {
  if (!content?.trim()) {
    return <Skeleton {...skeletonProps} />
  }
  return content
}
