import { useCallback } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { FormValues } from '@/lib/schema'
import { ReadingStatus } from '@/types/type'
import { sectionStyle, titleStyle } from '@/components/styles/form-styles'
import { FormInput } from '@/components/inputs/form-input'
import { FormSegmented } from '@/components/inputs/form-segmented'
import { FormDateInput } from '@/components/inputs/form-date-input'

export default function Step1() {
  const { control, setValue, clearErrors, trigger } = useFormContext<FormValues>()

  const status = useWatch({ name: 'status', control })
  const startedAt = useWatch({ name: 'startedAt', control }) as string | undefined
  const endedAt = useWatch({ name: 'endedAt', control }) as string | undefined

  const isStartedAtDisabled = status === ReadingStatus.WANT
  const isEndedAtDisabled = status !== ReadingStatus.DONE

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

  const statusOptions = [
    { label: '읽고 싶은 책', value: ReadingStatus.WANT },
    { label: '읽는 중', value: ReadingStatus.READING },
    { label: '읽음', value: ReadingStatus.DONE },
    { label: '보류 중', value: ReadingStatus.HOLD },
  ]

  const endedMin = status === ReadingStatus.DONE && startedAt ? startedAt : undefined
  const startedMax = status === ReadingStatus.DONE && endedAt ? endedAt : undefined

  return (
    <section css={sectionStyle}>
      <h2 css={titleStyle}>1단계: 도서 기본 정보 및 상태</h2>

      <FormInput<FormValues> name="bookTitle" label="도서 제목" placeholder="예) 클린 코드" />
      <FormInput<FormValues> name="author" label="저자" placeholder="예) 로버트 C. 마틴" />
      <FormInput<FormValues> name="publisher" label="출판사" placeholder="예) 인사이트" />
      <FormInput<FormValues> name="publishedAt" label="출판일" type="date" />

      <FormSegmented<FormValues, ReadingStatus>
        name="status"
        label="독서 상태"
        options={statusOptions}
        onChange={handleStatusChange}
      />

      <FormDateInput<FormValues> name="startedAt" label="독서 시작일" disabled={isStartedAtDisabled} max={startedMax} />
      <FormDateInput<FormValues> name="endedAt" label="독서 종료일" disabled={isEndedAtDisabled} min={endedMin} />
    </section>
  )
}
