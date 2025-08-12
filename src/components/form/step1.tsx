import { FormValues } from '@/lib/schema'
import { ReadingStatus } from '@/types/form'
import { useFormContext, useWatch } from 'react-hook-form'
import { sectionStyle, titleStyle } from '@/components/styles/form-styles'
import { FormInput } from '@/components/inputs/form-input'
import { FormSegmented } from '@/components/inputs/form-segmented'

export default function Step1() {
  const { control } = useFormContext<FormValues>()
  const status = useWatch({ name: 'status', control })

  const isStartedAtDisabled = status === ReadingStatus.WANT
  const isEndedAtDisabled = status !== ReadingStatus.DONE

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
        options={[
          { label: '읽고 싶은 책', value: ReadingStatus.WANT },
          { label: '읽는 중', value: ReadingStatus.READING },
          { label: '읽음', value: ReadingStatus.DONE },
          { label: '보류 중', value: ReadingStatus.HOLD },
        ]}
      />

      <FormInput<FormValues> name="startedAt" label="독서 시작일" type="date" disabled={isStartedAtDisabled} />
      <FormInput<FormValues> name="endedAt" label="독서 종료일" type="date" disabled={isEndedAtDisabled} />
    </section>
  )
}
