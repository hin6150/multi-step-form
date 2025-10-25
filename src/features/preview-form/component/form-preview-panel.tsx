import { css, Theme } from '@emotion/react'
import { DeepPartial, useFormContext, useWatch } from 'react-hook-form'

import type { FormValues } from '@/lib/schema'
import { ReadingStatus } from '@/types/type'
import { BookMetaSection, PreviewField, QuotesSection, ReflectionSection } from './form-preview-sections'
import { useDelayedPreview } from '../hooks/use-delayed-preview'
import { formatRating, getReadablePeriod, toPreviewQuotes } from '@/features/preview-form/utils/preview-utils'

const previewWrapper = (theme: Theme) => css`
  display: none;

  @media (min-width: 1024px) {
    position: sticky;
    top: ${theme.spacing(4)};
    align-self: stretch;
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(3)};
    width: min(360px, 100%);
    height: calc(100vh - ${theme.spacing(8)});
  }
`

const previewCard = (theme: Theme) => css`
  flex: 1 1 auto;
  border-radius: ${theme.radius.xl}px;
  background: ${theme.color.surface};
  border: 1px solid ${theme.color.border};
  padding: ${theme.spacing(5)} ${theme.spacing(4)};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(4)};
  min-height: 520px;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

const bookStatus = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(4)};

  dt {
    font-size: 12px;
    font-weight: 600;
    color: ${theme.color.muted};
    text-transform: uppercase;
  }

  dd {
    font-size: 14px;
    color: ${theme.color.text};
    margin: 0;
  }
`

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
  const { data: previewValues, isPending } = useDelayedPreview<DeepPartial<FormValues>>(watchedValues, 500)

  const quotes = toPreviewQuotes(previewValues?.quotes)
  const rating = formatRating(previewValues?.rating)
  const periodText = getReadablePeriod(previewValues)
  const shouldShowPeriod = Boolean(previewValues?.status && previewValues.status !== ReadingStatus.WANT)

  return (
    <aside css={previewWrapper}>
      <section css={previewCard}>
        <BookMetaSection values={previewValues} isLoading={isPending} />

        <dl css={bookStatus}>
          <PreviewField label="출판일" value={previewValues?.publishedAt} isLoading={isPending} />
          <PreviewField label="전체 페이지 수" value={previewValues?.totalPages} isLoading={isPending} />
          <PreviewField
            label="상태"
            value={previewValues?.status ? statusLabel[previewValues.status] : undefined}
            isLoading={isPending}
          />
          <PreviewField label="기간" value={periodText} isVisible={shouldShowPeriod} isLoading={isPending} />
          <PreviewField label="별점" value={rating} isLoading={isPending} skeletonWidth="40%" />
          <PreviewField
            label="추천"
            value={previewValues?.isRecommended ? recommendationLabel[previewValues.isRecommended] : undefined}
            isLoading={isPending}
            skeletonWidth="50%"
          />
          <PreviewField
            label="공개"
            value={previewValues?.visibility ? visibilityLabel[previewValues.visibility] : undefined}
            isLoading={isPending}
            skeletonWidth="40%"
          />
        </dl>

        <ReflectionSection reflection={previewValues?.reflection} isLoading={isPending} />

        <QuotesSection quotes={quotes} isLoading={isPending} />
      </section>
    </aside>
  )
}
