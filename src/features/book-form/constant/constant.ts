import type { RecommendationValue, VisibilityValue } from '@/lib/schema'
import { ReadingStatus } from '@/types/type'

type Option<T extends string> = { label: string; value: T }

function toLabelMap<T extends string>(options: Option<T>[]) {
  return options.reduce<Record<T, string>>((acc, option) => {
    acc[option.value] = option.label
    return acc
  }, {} as Record<T, string>)
}

export const statusOptions: Option<ReadingStatus>[] = [
  { label: '읽고 싶은 책', value: ReadingStatus.WANT },
  { label: '읽는 중', value: ReadingStatus.READING },
  { label: '읽음', value: ReadingStatus.DONE },
  { label: '보류 중', value: ReadingStatus.HOLD },
]

export const statusLabelMap = toLabelMap(statusOptions)

export const recommendationOptions: Option<RecommendationValue>[] = [
  { label: '추천해요', value: 'RECOMMEND' },
  { label: '추천하지 않아요', value: 'NOT_RECOMMEND' },
]

export const recommendationLabelMap = toLabelMap(recommendationOptions)

export const visibilityOptions: Option<VisibilityValue>[] = [
  { label: '전체 공개', value: 'PUBLIC' },
  { label: '비공개', value: 'PRIVATE' },
]

export const visibilityLabelMap = toLabelMap(visibilityOptions)
