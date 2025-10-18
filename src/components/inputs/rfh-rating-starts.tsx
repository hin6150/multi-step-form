import { FieldValues, Path, useFormContext, useController } from 'react-hook-form'
import { Star, StarHalf } from 'lucide-react'
import {
  errorText,
  fieldStyle,
  labelStyle,
  ratingError,
  ratingGroup,
  ratingMessage,
  ratingMessageActive,
  ratingStars,
} from '@/styles/form-styles'
import { useRatingLogic } from '@/features/book-form/hooks/use-rating-logic'

type Props<T extends FieldValues> = {
  name: Path<T>
  label: string
  min?: number
  max?: number
  step?: number
  getDescription?: (value: number) => string | undefined
}

const STAR_COUNT = 5

function iconType(value: number, index: number, min: number) {
  const starValue = min + index + 1
  if (value >= starValue) return 'full'
  if (value >= starValue - 0.5) return 'half'
  return 'empty'
}

export function RfhRatingStars<T extends FieldValues>({
  name,
  label,
  min = 0,
  max = 5,
  step = 0.5,
  getDescription,
}: Props<T>) {
  const { control } = useFormContext<T>()
  const { field, fieldState } = useController({
    name,
    control,
    defaultValue: min as any,
  })

  const { displayValue, handleStarClick, handleStarMouseMove, handleGroupMouseLeave } = useRatingLogic({
    value: field.value,
    onChange: field.onChange,
    onBlur: field.onBlur,
    min,
    max,
    step,
  })

  const description = getDescription?.(displayValue)
  const hasError = Boolean(fieldState.error)

  return (
    <div css={fieldStyle}>
      <p css={labelStyle}>{label}</p>
      <div css={ratingGroup}>
        <div css={ratingStars} onMouseLeave={handleGroupMouseLeave}>
          {Array.from({ length: STAR_COUNT }).map((_, index) => {
            const type = iconType(displayValue, index, min)
            const isFilled = displayValue >= min + index + step / 2

            return (
              <button
                key={index}
                type="button"
                data-filled={isFilled ? 'true' : undefined}
                data-error={hasError ? 'true' : undefined}
                aria-label={`${min + index + 1}점`}
                onClick={(event) => handleStarClick(event, index)}
                onMouseMove={(event) => handleStarMouseMove(event, index)}
              >
                {type === 'full' && <Star size={28} strokeWidth={1.5} fill="currentColor" />}
                {type === 'half' && <StarHalf size={28} strokeWidth={1.5} fill="currentColor" />}
                {type === 'empty' && <Star size={28} strokeWidth={1.5} fill="none" />}
              </button>
            )
          })}
        </div>
        <p css={[ratingMessage, description && ratingMessageActive, hasError && ratingError]}>
          {description ?? '별점을 선택해주세요.'}
        </p>
      </div>
      {fieldState.error && <p css={errorText}>{fieldState.error.message}</p>}
    </div>
  )
}
