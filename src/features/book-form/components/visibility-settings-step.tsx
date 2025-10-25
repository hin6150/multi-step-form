import { RHFSegmented } from '@/components/rhf-inputs/rhf-segmented'
import { FormValues, VisibilityValue } from '@/lib/schema'
import { sectionStyle, titleStyle } from '@/styles/form-styles'
import { visibilityOptions } from '../constant/constant'

export default function VisibilitySettingsStep() {
  return (
    <section css={sectionStyle}>
      <h2 css={titleStyle}>5단계: 공개 설정</h2>

      <RHFSegmented<FormValues, VisibilityValue>
        name="visibility"
        label="공개 여부를 선택해주세요"
        options={visibilityOptions}
      />
    </section>
  )
}
