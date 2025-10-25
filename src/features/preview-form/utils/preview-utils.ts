import { ReactNode } from 'react'
import type { DeepPartial } from 'react-hook-form'

import type { FormValues } from '@/lib/schema'
import { ReadingStatus } from '@/types/type'

export type PreviewQuote = {
  content: string
  page?: number
}

export function toPreviewQuotes(quotes: DeepPartial<FormValues>['quotes']): PreviewQuote[] {
  if (!Array.isArray(quotes)) {
    return []
  }

  return quotes
    .filter((quote): quote is { content: string; page?: number } => typeof quote?.content === 'string')
    .map((quote) => ({
      content: quote.content.trim(),
      page: quote.page,
    }))
    .filter((quote) => quote.content.length > 0)
}

export function formatRating(rating: FormValues['rating'] | undefined) {
  if (typeof rating !== 'number' || Number.isNaN(rating)) {
    return undefined
  }

  return rating.toFixed(1).replace('.0', '')
}

export function getReadablePeriod(values?: DeepPartial<FormValues>) {
  if (!values?.status || values.status === ReadingStatus.WANT) {
    return undefined
  }

  const startedAt = values.startedAt?.trim()
  const endedAt = values.endedAt?.trim()

  if (!startedAt) {
    return undefined
  }

  if (values.status === ReadingStatus.DONE && endedAt) {
    return `${startedAt} ~ ${endedAt}`
  }

  return startedAt
}

export function hasMeaningfulValue(value: ReactNode) {
  if (value === null || value === undefined || value === false) {
    return false
  }

  if (typeof value === 'string') {
    return value.trim().length > 0
  }

  if (Array.isArray(value)) {
    return value.length > 0
  }

  return true
}
