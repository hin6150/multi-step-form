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

function iconType(value: number, starValue: number, step: number) {
  if (value >= starValue) return 'full'
  if (step < 1 && value >= starValue - step) return 'half'
  return 'empty'
}

export function RfhRatingStars<T extends FieldValues>({
  name,
  label,
  min = 1,
  max = 5,
  step = 0.5,
  getDescription,
}: Props<T>) {
  const { control } = useFormContext<T>()
  const {
    field,
    fieldState: { error },
  } = useController({ name, control })

  const { displayValue, setDisplayValue, setPreviewValue, setPreviewNull } = useRatingLogic({
    value: field.value,
    onChange: field.onChange,
    onBlur: field.onBlur,
    min,
    max,
    step,
  })

  const description = getDescription?.(displayValue)

  return (
    <div css={fieldStyle}>
      <p css={labelStyle}>{label}</p>
      <div css={ratingGroup}>
        <div css={ratingStars} onMouseLeave={setPreviewNull}>
          {Array.from({ length: STAR_COUNT }).map((_, index) => {
            const starValue = min + index
            const type = iconType(displayValue, starValue, step)
            const isFilled = type !== 'empty'

            return (
              <button
                key={index}
                type="button"
                data-filled={isFilled ? 'true' : undefined}
                data-error={error ? 'true' : undefined}
                aria-label={`${starValue}점`}
                onClick={(event) => setDisplayValue(event, index)}
                onMouseMove={(event) => setPreviewValue(event, index)}
              >
                {type === 'full' && <Star size={28} strokeWidth={1.5} fill="currentColor" />}
                {type === 'half' && <StarHalf size={28} strokeWidth={1.5} fill="currentColor" />}
                {type === 'empty' && <Star size={28} strokeWidth={1.5} fill="none" />}
              </button>
            )
          })}
        </div>
        <p css={[ratingMessage, description && ratingMessageActive, error && ratingError]}>{description}</p>
      </div>
      {error && <p css={errorText}>{error.message}</p>}
    </div>
  )
}
