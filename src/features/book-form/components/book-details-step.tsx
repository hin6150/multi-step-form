import { RHFInput } from '@/components/rhf-inputs/rhf-input'
import { RHFCommaSeparatedInput } from '@/components/rhf-inputs/rhf-comma-separated-input'
import { RHFSegmented } from '@/components/rhf-inputs/rhf-segmented'
import { RHFDateInput } from '@/components/rhf-inputs/rhf-date-input'
import { FormValues } from '@/lib/schema'
import { sectionStyle, titleStyle } from '@/styles/form-styles'
import { ReadingStatus } from '@/types/type'

import { useReadingStatusRules } from '../hooks/use-reading-status-rules'
import { statusOptions } from '../constant/constant'
import { useFormContext } from 'react-hook-form'

const getTodayDateString = () => new Date().toISOString().split('T')[0]
const TODAY_DATE_STRING = getTodayDateString()

export default function BookDetailStep() {
  const { isStartedAtDisabled, isEndedAtDisabled, endedMin, startedMax, startedMin } = useReadingStatusRules()

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

      <RHFInput<FormValues> name="bookTitle" label="도서 제목" placeholder="예) 클린 코드" />
      <RHFInput<FormValues> name="author" label="저자" placeholder="예) 로버트 C. 마틴" />
      <RHFInput<FormValues> name="publisher" label="출판사" placeholder="예) 인사이트" />

      <RHFDateInput<FormValues> name="publishedAt" label="출판일" max={TODAY_DATE_STRING} />
      <RHFCommaSeparatedInput<FormValues>
        name="totalPages"
        label="도서 전체 페이지 수"
        placeholder="예) 352"
        max={30000}
      />

      <RHFSegmented<FormValues, ReadingStatus>
        name="status"
        label="독서 상태"
        options={statusOptions}
        onChange={handleStatusChange}
      />

      <RHFDateInput<FormValues>
        name="startedAt"
        label="독서 시작일"
        disabled={isStartedAtDisabled}
        max={startedMax ?? TODAY_DATE_STRING}
        min={startedMin}
      />

      <RHFDateInput<FormValues>
        name="endedAt"
        label="독서 종료일"
        disabled={isEndedAtDisabled}
        min={endedMin}
        max={TODAY_DATE_STRING}
      />
    </section>
  )
}
