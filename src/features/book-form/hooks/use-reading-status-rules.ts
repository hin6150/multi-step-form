import { useFormContext, useWatch } from 'react-hook-form'

import type { FormValues } from '@/lib/schema'
import { ReadingStatus } from '@/types/type'
import { maxDate } from '@/utils/util'

export function useReadingStatusRules() {
  const { control } = useFormContext<FormValues>()

  const status = useWatch({ name: 'status', control })
  const startedAt = useWatch({ name: 'startedAt', control }) as string | undefined
  const endedAt = useWatch({ name: 'endedAt', control }) as string | undefined
  const publishedAt = useWatch({ name: 'publishedAt', control }) as string | undefined

  const isStartedAtDisabled = status === ReadingStatus.WANT
  const isEndedAtDisabled = status !== ReadingStatus.DONE

  const minFromPublishedAt = publishedAt

  // startedAt의 최소값:
  //  - 출판 이후에 읽을 수 있습니다.
  const startedMin = minFromPublishedAt

  // endedAt 최소값:
  //  - 출판 이후에 읽을 수 있습니다.
  //  - DONE 상태이 startedAt이 있다면, 독서 시작일과 출판 중 더 늦은 날짜 이후여야 합니다.
  let dynamicEndedMin: string | undefined = minFromPublishedAt
  if (status === ReadingStatus.DONE && startedAt) dynamicEndedMin = maxDate(minFromPublishedAt, startedAt)
  const endedMin = dynamicEndedMin

  // startedAt 최대값:
  //  - DONE 상태이고 endedAt이 있다면, 독서 종료일 이전이여야 합니다.
  const startedMax = status === ReadingStatus.DONE && endedAt ? endedAt : undefined

  return {
    isStartedAtDisabled,
    isEndedAtDisabled,
    endedMin,
    startedMax,
    startedMin,
  }
}
