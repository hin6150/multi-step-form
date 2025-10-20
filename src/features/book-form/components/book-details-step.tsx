import { FormValues } from '@/lib/schema'
import { ReadingStatus } from '@/types/type'
import { RhfFormInput } from '@/components/inputs/rhf-form-input'
import { RhfSegmented } from '@/components/inputs/rhf-segmented'

import { useReadingStatusRules } from '../hooks/use-reading-status-rules'
import { statusOptions } from '../constant/constant'
import { RhfDateInput } from '@/components/inputs/rhf-date-input'
import { sectionStyle, titleStyle } from '@/styles/form-styles'
import { useFormContext } from 'react-hook-form'

export default function BookDetailStep() {
  const { isStartedAtDisabled, isEndedAtDisabled, endedMin, startedMax } = useReadingStatusRules()

  const { setValue, clearErrors } = useFormContext<FormValues>()

  const handleStatusChange = (nextStatus: ReadingStatus) => {
    switch (nextStatus) {
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
  }

  return (
    <section css={sectionStyle}>
      <h2 css={titleStyle}>1단계: 도서 기본 정보 및 상태</h2>

      <RhfFormInput<FormValues> name="bookTitle" label="도서 제목" placeholder="예) 클린 코드" />
      <RhfFormInput<FormValues> name="author" label="저자" placeholder="예) 로버트 C. 마틴" />
      <RhfFormInput<FormValues> name="publisher" label="출판사" placeholder="예) 인사이트" />

      <RhfDateInput<FormValues> name="publishedAt" label="출판일" max={new Date().toISOString().split('T')[0]} />

      <RhfSegmented<FormValues, ReadingStatus>
        name="status"
        label="독서 상태"
        options={statusOptions}
        onChange={handleStatusChange}
      />

      <RhfDateInput<FormValues> name="startedAt" label="독서 시작일" disabled={isStartedAtDisabled} max={startedMax} />
      <RhfDateInput<FormValues> name="endedAt" label="독서 종료일" disabled={isEndedAtDisabled} min={endedMin} />
    </section>
  )
}
