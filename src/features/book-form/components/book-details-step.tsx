import { FormValues } from '@/lib/schema'
import { ReadingStatus } from '@/types/type'
import { FormInput } from '@/components/inputs/form-input'
import { RhfSegmented } from '@/components/inputs/rhf-segmented'

import { useReadingStatusRules } from '../hooks/use-reading-status-rules'
import { statusOptions } from '../constant/constant'
import { RhfDateInput } from '@/components/inputs/rhf-date-input'
import { sectionStyle, titleStyle } from '@/styles/form-styles'
import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

export default function BookDetailStep() {
  const { isStartedAtDisabled, isEndedAtDisabled, endedMin, startedMax } = useReadingStatusRules()

  const { control, setValue, clearErrors } = useFormContext<FormValues>()
  const status = useWatch({ control, name: 'status' })

  useEffect(() => {
    switch (status) {
      case ReadingStatus.WANT:
        setValue('startedAt', undefined, { shouldValidate: false, shouldDirty: true })
        setValue('endedAt', undefined, { shouldValidate: false, shouldDirty: true })
        break
      case ReadingStatus.READING:
      case ReadingStatus.HOLD:
        setValue('endedAt', undefined, { shouldValidate: false, shouldDirty: true })
        break
    }

    clearErrors(['startedAt', 'endedAt'])
  }, [status, setValue, clearErrors])

  return (
    <section css={sectionStyle}>
      <h2 css={titleStyle}>1단계: 도서 기본 정보 및 상태</h2>

      <FormInput<FormValues> name="bookTitle" label="도서 제목" placeholder="예) 클린 코드" />
      <FormInput<FormValues> name="author" label="저자" placeholder="예) 로버트 C. 마틴" />
      <FormInput<FormValues> name="publisher" label="출판사" placeholder="예) 인사이트" />

      <RhfDateInput<FormValues> name="publishedAt" label="출판일" max={new Date().toISOString().split('T')[0]} />

      <RhfSegmented<FormValues, ReadingStatus> name="status" label="독서 상태" options={statusOptions} />

      <RhfDateInput<FormValues> name="startedAt" label="독서 시작일" disabled={isStartedAtDisabled} max={startedMax} />
      <RhfDateInput<FormValues> name="endedAt" label="독서 종료일" disabled={isEndedAtDisabled} min={endedMin} />
    </section>
  )
}
