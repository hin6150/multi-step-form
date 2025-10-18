import { useCallback, useMemo, useState } from 'react'
import type { FieldValues, UseFormReturn } from 'react-hook-form'

export type FormStep<TValues, TComponentId extends string> = {
  id: number
  label: string
  componentId: TComponentId
  fields?: (keyof TValues)[]
}

type UseStepControllerOptions<TValues extends FieldValues, TComponentId extends string> = {
  steps: FormStep<TValues, TComponentId>[]
  methods: UseFormReturn<TValues>
  allowFutureClick?: boolean
}

export type StepState = {
  currentIndex: number
  totalSteps: number
  isFirst: boolean
  isLast: boolean
}

export type StepMeta = {
  navigation: Array<{ id: number; label: string }>
}

export type StepActions = {
  goNext: () => Promise<void> | void
  goPrev: () => void
  goTo: (index: number) => Promise<void> | void
}

export function useStepController<TValues extends FieldValues, TComponentId extends string>({
  steps,
  methods,
  allowFutureClick = false,
}: UseStepControllerOptions<TValues, TComponentId>) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const totalSteps = steps.length
  const { trigger } = methods

  const validateStep = useCallback(
    async (index: number) => {
      const fields = steps[index]?.fields
      if (fields && fields.length > 0) {
        return trigger(fields as any, { shouldFocus: true })
      }
      return trigger(undefined, { shouldFocus: true })
    },
    [steps, trigger]
  )

  const goNext = useCallback(async () => {
    if (currentIndex >= totalSteps - 1) return
    const ok = await validateStep(currentIndex)
    if (!ok) return
    setCurrentIndex((prev) => Math.min(prev + 1, totalSteps - 1))
  }, [currentIndex, totalSteps, validateStep])

  const goPrev = useCallback(() => {
    if (currentIndex <= 0) return
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }, [currentIndex])

  const goTo = useCallback(
    async (next: number) => {
      if (next === currentIndex) return
      if (next < 0 || next > totalSteps - 1) return

      const movingForward = next > currentIndex
      if (movingForward && !allowFutureClick && next > currentIndex + 1) {
        return
      }

      if (movingForward) {
        const ok = await validateStep(currentIndex)
        if (!ok) return
      }

      setCurrentIndex(next)
    },
    [allowFutureClick, currentIndex, totalSteps, validateStep]
  )

  const state: StepState = useMemo(
    () => ({
      currentIndex,
      totalSteps,
      isFirst: currentIndex === 0,
      isLast: currentIndex === totalSteps - 1,
    }),
    [currentIndex, totalSteps]
  )

  const meta: StepMeta = useMemo(
    () => ({
      navigation: steps.map(({ id, label }) => ({ id, label })),
    }),
    [steps]
  )

  const step = steps[currentIndex]

  return {
    step,
    state,
    meta,
    actions: {
      goNext,
      goPrev,
      goTo,
    },
  }
}
