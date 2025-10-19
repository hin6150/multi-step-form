import { useCallback, useMemo, useState } from 'react'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

export type FormStep<TValues, TComponentId extends string> = {
  id: number
  label: string
  componentId: TComponentId
  fields?: (keyof TValues)[]
  schema?: z.ZodSchema<any>
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
  const { trigger, getValues, setError, clearErrors } = methods

  const validateStep = useCallback(
    async (index: number) => {
      const currentStep = steps[index]
      const fields = currentStep?.fields as Path<TValues>[] | undefined
      const schema = currentStep?.schema

      if (schema) {
        const values = getValues()
        const result = await schema.safeParseAsync(values)

        if (fields) fields.forEach((field) => clearErrors(field))
        if (!result.success) {
          const issues = result.error.issues
          const fieldToMessage: Record<string, string> = {}
          issues.forEach((issue) => {
            const key = issue.path.join('.')
            if (key && !fieldToMessage[key]) {
              fieldToMessage[key] = issue.message
            }
          })
          Object.entries(fieldToMessage).forEach(([fieldName, message]) => {
            const name = fieldName as Path<TValues>
            if (message) setError(name, { type: 'manual', message })
          })
          return false
        }
        return true
      }

      if (fields && fields.length > 0) return trigger(fields, { shouldFocus: true })
      return trigger(undefined, { shouldFocus: true })
    },
    [steps, trigger, getValues, setError, clearErrors]
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
