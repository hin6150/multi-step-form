import { useMemo, useState, MouseEvent } from 'react'

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
  const currentValue = typeof value === 'number' ? value : min

  const computeValue = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const ratio = clamp((event.clientX - rect.left) / rect.width, 0, 0.999)
    const segment = Math.min(segmentsPerStar - 1, Math.floor(ratio * segmentsPerStar))
    const nextValue = min + index + step * (segment + 1)
    return clamp(parseFloat(nextValue.toFixed(2)), min, max)
  }

  const handleStarClick = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    const next = computeValue(event, index)
    onChange(next === currentValue ? min : next)
    onBlur()
    setPreview(null)
  }

  const handleStarMouseMove = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    setPreview(computeValue(event, index))
  }

  const handleGroupMouseLeave = () => {
    setPreview(null)
  }

  const displayValue = clamp(preview ?? currentValue, min, max)

  return {
    displayValue,
    handleStarClick,
    handleStarMouseMove,
    handleGroupMouseLeave,
  }
}
