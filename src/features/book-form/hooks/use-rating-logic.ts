import { useState, MouseEvent, useMemo } from 'react'

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

type UseRatingLogicProps = {
  value: unknown
  onChange: (value: number) => void
  onBlur: () => void
  min: number
  max: number
  step: number
}

export function useRatingLogic({ value, onChange, onBlur, min, max, step }: UseRatingLogicProps) {
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
    onChange(next === currentValue ? min : next)
    onBlur()
    setPreview(null)
  }

  const setPreviewValue = (_event: MouseEvent<HTMLButtonElement>, index: number) => {
    setPreview(computeValue(_event, index))
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
