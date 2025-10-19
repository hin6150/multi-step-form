import { FormTextArea } from '@/components/inputs/form-textarea'
import { FormValues } from '@/lib/schema'
import { sectionStyle, titleStyle } from '@/styles/form-styles'

export default function ReadingReflectionStep() {
  return (
    <section css={sectionStyle}>
      <h2 css={titleStyle}>3단계: 독후감</h2>
      <FormTextArea<FormValues>
        name="reflection"
        label="독후감을 작성해주세요"
        placeholder="인상 깊었던 문장이나 읽고 느낀 점을 자유롭게 적어주세요."
        rows={8}
        maxLength={1000}
        showLength
      />
    </section>
  )
}
