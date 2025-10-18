import { useFormContext, useWatch } from 'react-hook-form'

import { FormSegmented } from '@/components/inputs/form-segmented'
import { FormValues, RecommendationValue } from '@/lib/schema'
import { ratingMessage, ratingMessageActive, sectionStyle, titleStyle } from '@/styles/form-styles'
import { RfhRatingStars } from '@/components/inputs/rfh-rating-starts'

const recommendationOptions: { label: string; value: RecommendationValue }[] = [
  { label: '추천해요', value: 'RECOMMEND' },
  { label: '추천하지 않아요', value: 'NOT_RECOMMEND' },
]

const recommendationCopy: Record<RecommendationValue, string> = {
  RECOMMEND: '적당히 추천할 만한 책이에요.',
  NOT_RECOMMEND: '이번에는 추천하지 않겠어요.',
}

function getRatingDescription(value: number) {
  if (value >= 4.5) return '최고예요'
  if (value >= 3.5) return '좋아요'
  if (value >= 2.5) return '보통이에요'
  if (value >= 1.5) return '조금 아쉬워요'
  if (value > 0) return '별로예요'
  return undefined
}

export default function BookReviewStep() {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormValues>()

  const isRecommended = useWatch({ control, name: 'isRecommended' })

  const recommendationError = errors.isRecommended?.message as string | undefined
  const recommendationMessage = isRecommended ? recommendationCopy[isRecommended] : '추천 여부를 선택해주세요.'

  return (
    <section css={sectionStyle}>
      <h2 css={titleStyle}>2단계: 도서 후기</h2>

      <FormSegmented<FormValues, RecommendationValue>
        name="isRecommended"
        label="이 책을 추천하시겠어요?"
        options={recommendationOptions}
        error={recommendationError}
      />
      <p css={[ratingMessage, isRecommended && ratingMessageActive]}>{recommendationMessage}</p>

      <RfhRatingStars<FormValues>
        name="rating"
        label="별점은 어떠셨나요?"
        min={0}
        max={5}
        step={0.5}
        getDescription={getRatingDescription}
      />
    </section>
  )
}
