import { RhfSegmented } from '@/components/inputs/rhf-segmented'
import { FormValues, RecommendationValue } from '@/lib/schema'
import { sectionStyle, titleStyle } from '@/styles/form-styles'
import { RfhRatingStars } from '@/components/inputs/rhf-rating-stars'

const recommendationOptions: { label: string; value: RecommendationValue }[] = [
  { label: '추천해요', value: 'RECOMMEND' },
  { label: '추천하지 않아요', value: 'NOT_RECOMMEND' },
]

function getRatingDescription(value: number) {
  if (value >= 4.5) return '최고예요'
  if (value >= 3.5) return '좋아요'
  if (value >= 2.5) return '보통이에요'
  if (value >= 1.5) return '조금 아쉬워요'
  if (value === 1) return '별로예요'
  return undefined
}

export default function BookReviewStep() {
  return (
    <section css={sectionStyle}>
      <h2 css={titleStyle}>2단계: 도서 후기</h2>

      <RhfSegmented<FormValues, RecommendationValue>
        name="isRecommended"
        label="이 책을 추천하시겠어요?"
        options={recommendationOptions}
      />

      <RfhRatingStars<FormValues>
        name="rating"
        label="별점은 어떠셨나요?"
        min={1}
        max={5}
        step={0.5}
        getDescription={getRatingDescription}
      />
    </section>
  )
}
