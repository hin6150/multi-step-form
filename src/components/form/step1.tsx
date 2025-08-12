import { FormValues } from '@/lib/schema'
import { ReadingStatus } from '@/types/type'
import { sectionStyle, titleStyle } from '@/components/styles/form-styles'
import { FormInput } from '@/components/inputs/form-input'
import { FormSegmented } from '@/components/inputs/form-segmented'
import { FormDateInput } from '@/components/inputs/form-date-input'
import { useReadingStatusRules } from '../hooks/use-reading-status-rules'

export default function Step1() {
  const { isStartedAtDisabled, isEndedAtDisabled, endedMin, startedMax, handleStatusChange } = useReadingStatusRules()

  const statusOptions = [
    { label: '읽고 싶은 책', value: ReadingStatus.WANT },
    { label: '읽는 중', value: ReadingStatus.READING },
    { label: '읽음', value: ReadingStatus.DONE },
    { label: '보류 중', value: ReadingStatus.HOLD },
  ]

  return (
    <section css={sectionStyle}>
      <h2 css={titleStyle}>1단계: 도서 기본 정보 및 상태</h2>

      <FormInput<FormValues> name="bookTitle" label="도서 제목" placeholder="예) 클린 코드" />
      <FormInput<FormValues> name="author" label="저자" placeholder="예) 로버트 C. 마틴" />
      <FormInput<FormValues> name="publisher" label="출판사" placeholder="예) 인사이트" />
      <FormDateInput<FormValues>
        name="publishedAt"
        label="출판일"
        affects={['startedAt']}
        max={new Date().toISOString().split('T')[0]}
      />

      <FormSegmented<FormValues, ReadingStatus>
        name="status"
        label="독서 상태"
        options={statusOptions}
        onChange={handleStatusChange}
      />

      <FormDateInput<FormValues>
        name="startedAt"
        label="독서 시작일"
        disabled={isStartedAtDisabled}
        max={startedMax}
        deps={['publishedAt']}
        affects={['endedAt']}
      />

      <FormDateInput<FormValues>
        name="endedAt"
        label="독서 종료일"
        disabled={isEndedAtDisabled}
        min={endedMin}
        deps={['startedAt']}
      />
    </section>
  )
}
