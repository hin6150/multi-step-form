import { useMemo, useState } from 'react'
import type { MouseEvent } from 'react'
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
import { clamp } from '@/utils/util'

type Props<T extends FieldValues> = {
  name: Path<T>
  label: string
  min?: number
  max?: number
  step?: number
  getDescription?: (value: number) => string | undefined
}

type UseRatingProps = {
  value: unknown
  onChange: (value: number) => void
  onBlur: () => void
  min: number
  max: number
  step: number
}

const STAR_COUNT = 5

function useRating({ value, onChange, onBlur, min, max, step }: UseRatingProps) {
  const [preview, setPreview] = useState<number | null>(null)
  const segmentsPerStar = useMemo(() => Math.max(1, Math.round(1 / step)), [step])
  const currentValue = typeof value === 'number' ? clamp(value, min, max) : null

  const computeValue = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const ratio = clamp((event.clientX - rect.left) / rect.width, 0, 0.999)
    const segment = Math.min(segmentsPerStar - 1, Math.floor(ratio * segmentsPerStar))
    const base = min - step
    const nextValue = base + index + step * segment
    return clamp(parseFloat(nextValue.toFixed(2)), min, max)
  }

  const setDisplayValue = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    const next = computeValue(event, index)
    onChange(next)
    onBlur()
    setPreview(null)
  }

  const setPreviewValue = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    setPreview(computeValue(event, index))
  }

  const setPreviewNull = () => {
    setPreview(null)
  }

  const displayValue = preview ?? currentValue ?? 0

  return {
    displayValue,
    setDisplayValue,
    setPreviewValue,
    setPreviewNull,
  }
}

function iconType(value: number, starValue: number, step: number) {
  if (value >= starValue) return 'full'
  if (step < 1 && value >= starValue - step) return 'half'
  return 'empty'
}

export function RhfRatingStars<T extends FieldValues>(props: Props<T>) {
  const { name, label, min = 1, max = 5, step = 0.5, getDescription } = props
  const { control } = useFormContext<T>()
  const {
    field,
    fieldState: { error },
  } = useController({ name, control })

  const { displayValue, setDisplayValue, setPreviewValue, setPreviewNull } = useRating({
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
                {type === 'full' && <Star size={36} strokeWidth={1.5} fill="currentColor" />}
                {type === 'half' && <StarHalf size={36} strokeWidth={1.5} fill="currentColor" />}
                {type === 'empty' && <Star size={36} strokeWidth={1.5} fill="none" />}
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
