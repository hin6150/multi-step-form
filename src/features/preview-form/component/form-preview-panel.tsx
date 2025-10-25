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
import { BookMetaSection, PreviewField, QuotesSection, ReflectionSection } from './form-preview-sections'
import { previewWrapper, previewCard, bookStatus } from './form-preview-sections.styles'

const statusLabel: Record<ReadingStatus, string> = {
  [ReadingStatus.WANT]: '읽고 싶은 책',
  [ReadingStatus.READING]: '읽는 중',
  [ReadingStatus.HOLD]: '보류 중',
  [ReadingStatus.DONE]: '완독',
}

const recommendationLabel: Record<FormValues['isRecommended'], string> = {
  RECOMMEND: '추천해요',
  NOT_RECOMMEND: '추천하지 않아요',
}

const visibilityLabel: Record<FormValues['visibility'], string> = {
  PUBLIC: '전체 공개',
  PRIVATE: '나만 보기',
}

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
          <PreviewField label="상태" value={previewValues?.status ? statusLabel[previewValues.status] : undefined} />
          <PreviewField label="기간" value={periodText} isVisible={shouldShowPeriod} />
          <PreviewField label="별점" value={rating} skeletonWidth="40%" />
          <PreviewField
            label="추천"
            value={previewValues?.isRecommended ? recommendationLabel[previewValues.isRecommended] : undefined}
            skeletonWidth="50%"
          />
          <PreviewField
            label="공개"
            value={previewValues?.visibility ? visibilityLabel[previewValues.visibility] : undefined}
            skeletonWidth="40%"
          />
          <ReflectionSection reflection={previewValues?.reflection} />
          <QuotesSection quotes={quotes} />
        </dl>
      </section>
    </aside>
  )
}
