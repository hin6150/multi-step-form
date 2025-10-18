import { useFormContext, useWatch } from 'react-hook-form'

import type { FormValues } from '@/lib/schema'
import { ReadingStatus } from '@/types/type'

export function useReadingStatusRules() {
  const { control } = useFormContext<FormValues>()

  const status = useWatch({ name: 'status', control })
  const startedAt = useWatch({ name: 'startedAt', control }) as string | undefined
  const endedAt = useWatch({ name: 'endedAt', control }) as string | undefined

  // UI 상태 계산 (disabled, min/max)
  const isStartedAtDisabled = status === ReadingStatus.WANT
  const isEndedAtDisabled = status !== ReadingStatus.DONE

  // 종료일 최소값: DONE 상태이고 시작일이 있으면 시작일
  const endedMin = status === ReadingStatus.DONE && startedAt ? startedAt : undefined
  // 시작일 최대값: DONE 상태이고 종료일이 있으면 종료일
  const startedMax = status === ReadingStatus.DONE && endedAt ? endedAt : undefined

  return {
    isStartedAtDisabled,
    isEndedAtDisabled,
    endedMin,
    startedMax,
  }
}
