import { useCallback } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import type { FormValues } from '@/lib/schema'
import { ReadingStatus } from '@/types/type'

export function useReadingStatusRules() {
  const { control, setValue, clearErrors, trigger } = useFormContext<FormValues>()

  const status = useWatch({ name: 'status', control })
  const startedAt = useWatch({ name: 'startedAt', control }) as string | undefined
  const endedAt = useWatch({ name: 'endedAt', control }) as string | undefined

  const isStartedAtDisabled = status === ReadingStatus.WANT
  const isEndedAtDisabled = status !== ReadingStatus.DONE

  // 종료일은 시작일보다 빠를 수 없다 / 시작일은 종료일보다 늦을 수 없다
  const endedMin = status === ReadingStatus.DONE && startedAt ? startedAt : undefined
  const startedMax = status === ReadingStatus.DONE && endedAt ? endedAt : undefined

  const handleStatusChange = useCallback(
    (next: ReadingStatus) => {
      if (next === ReadingStatus.WANT) {
        setValue('startedAt', undefined, { shouldDirty: true })
        setValue('endedAt', undefined, { shouldDirty: true })
        clearErrors(['startedAt', 'endedAt'])
        trigger(['startedAt', 'endedAt'])
        return
      }
      if (next === ReadingStatus.READING || next === ReadingStatus.HOLD) {
        setValue('endedAt', undefined, { shouldDirty: true })
        clearErrors('endedAt')
        trigger('endedAt')
        return
      }
      if (next === ReadingStatus.DONE) {
        clearErrors(['startedAt', 'endedAt'])
      }
    },
    [setValue, clearErrors, trigger]
  )

  return {
    status,
    isStartedAtDisabled,
    isEndedAtDisabled,
    endedMin,
    startedMax,
    handleStatusChange,
  }
}
