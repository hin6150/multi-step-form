import { DeepPartial, useFormContext, useWatch } from 'react-hook-form'

import type { FormValues } from '@/lib/schema'
import { ReadingStatus } from '@/types/type'
import { useDelayedPreview } from '../hooks/use-delayed-preview'
import {
  formatNumberWithLocale,
  formatRating,
  getReadablePeriod,
  toPreviewQuotes,
} from '@/features/preview-form/utils/preview-utils'
import { recommendationLabelMap, statusLabelMap, visibilityLabelMap } from '@/features/book-form/constant/constant'
import { BookMetaSection, PreviewField, QuotesSection, ReflectionSection } from './form-preview-sections'
import { previewWrapper, previewCard, bookStatus } from './form-preview-sections.styles'

export function FormPreviewPanel() {
  const { control } = useFormContext<FormValues>()
  const watchedValues = useWatch<FormValues>({ control }) as DeepPartial<FormValues>
  const previewValues = useDelayedPreview<DeepPartial<FormValues>>(watchedValues, 500)

  const quotes = toPreviewQuotes(previewValues?.quotes)
  const rating = formatRating(previewValues?.rating)
  const periodText = getReadablePeriod(previewValues)
  const shouldShowPeriod = Boolean(previewValues?.status && previewValues.status !== ReadingStatus.WANT)
  const totalPages = formatNumberWithLocale(previewValues?.totalPages)

  return (
    <aside css={previewWrapper}>
      <section css={previewCard}>
        <BookMetaSection values={previewValues} />
        <dl css={bookStatus}>
          <PreviewField label="출판일" value={previewValues?.publishedAt} />
          <PreviewField label="전체 페이지 수" value={totalPages} />
          <PreviewField label="상태" value={previewValues?.status ? statusLabelMap[previewValues.status] : undefined} />
          <PreviewField label="기간" value={periodText} isVisible={shouldShowPeriod} />
          <PreviewField label="별점" value={rating} />
          <PreviewField
            label="추천"
            value={previewValues?.isRecommended ? recommendationLabelMap[previewValues.isRecommended] : undefined}
          />
          <PreviewField
            label="공개"
            value={previewValues?.visibility ? visibilityLabelMap[previewValues.visibility] : undefined}
          />
          <ReflectionSection reflection={previewValues?.reflection} />
          <QuotesSection quotes={quotes} />
        </dl>
      </section>
    </aside>
  )
}
