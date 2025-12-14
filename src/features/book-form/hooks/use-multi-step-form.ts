import { useCallback, useEffect, useMemo, useState } from 'react'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

export type FormStep<TValues, TComponentId extends string> = {
  id: number
  label: string
  componentId: TComponentId
  fields?: Path<TValues>[]
  schema?: z.ZodSchema<unknown>
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
  const { trigger, getValues, setError, clearErrors, setFocus } = methods

  const focusField = useCallback(
    (field?: Path<TValues> | string) => {
      if (!field) return
      const focusTarget = String(field) as Path<TValues>
      const focusExecutor =
        typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function'
          ? window.requestAnimationFrame.bind(window)
          : (cb: FrameRequestCallback) => {
              setTimeout(() => cb(Date.now()), 0)
            }

      focusExecutor(() => {
        try {
          setFocus(focusTarget, { shouldSelect: true })
        } catch (error) {
          console.warn('Failed to focus field', focusTarget, error)
        }
      })
    },
    [setFocus]
  )

  const toFocusablePath = useCallback(
    (field?: Path<TValues> | string) => {
      if (!field) return undefined
      const fieldName = String(field)

      if (fieldName === 'quotes') {
        const quotes = getValues('quotes' as Path<TValues>)
        if (Array.isArray(quotes) && quotes.length > 0) {
          const firstQuote = quotes[0]
          if (firstQuote && typeof firstQuote === 'object') {
            if ('content' in firstQuote) {
              return 'quotes.0.content'
            }
          }
        }
      }

      return fieldName
    },
    [getValues]
  )

  const scrollToTop = useCallback(() => {
    if (typeof window === 'undefined') return
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const fields = steps[currentIndex]?.fields
    if (!fields || fields.length === 0) return

    const focusable = toFocusablePath(fields[0])
    focusField(focusable)
  }, [currentIndex, focusField, steps, toFocusablePath])

  const clearStepErrors = useCallback(
    (index: number) => {
      const fields = steps[index]?.fields
      if (!fields || fields.length === 0) return
      clearErrors(fields)
    },
    [clearErrors, steps]
  )

  const validateStep = useCallback(
    async (index: number) => {
      const currentStep = steps[index]

      if (!currentStep) {
        console.warn(`Validation skipped: Step at index ${index} is undefined.`)
        return true
      }

      const fields = currentStep?.fields ?? []
      const schema = currentStep?.schema

      if (schema) {
        const values = getValues()
        const result = await schema.safeParseAsync(values)

        if (fields) fields.forEach((field) => clearErrors(field))
        if (!result.success) {
          const issues = result.error.issues
          const fieldToMessage: Record<string, string> = {}
          let firstIssuePath: string | undefined
          issues.forEach((issue) => {
            const key = issue.path.join('.')
            if (!firstIssuePath && key) {
              firstIssuePath = key
            }
            if (key && !fieldToMessage[key]) {
              fieldToMessage[key] = issue.message
            }
          })
          Object.entries(fieldToMessage).forEach(([fieldName, message]) => {
            const name = fieldName as Path<TValues>
            if (message) setError(name, { type: 'manual', message })
          })
          if (firstIssuePath) {
            const focusable = toFocusablePath(firstIssuePath)
            focusField(focusable)
          }
          return false
        }
        return true
      }

      if (fields.length > 0) {
        const isValid = await trigger(fields, { shouldFocus: true })
        if (!isValid) {
          const firstField = toFocusablePath(fields[0])
          focusField(firstField)
        }
        return isValid
      }
      const isValid = await trigger(undefined, { shouldFocus: true })
      if (!isValid) {
        const focusable = toFocusablePath(steps[index]?.fields?.[0])
        focusField(focusable)
      }
      return isValid
    },
    [clearErrors, focusField, getValues, steps, toFocusablePath, trigger, setError]
  )

  const goNext = useCallback(async () => {
    if (currentIndex >= totalSteps - 1) return
    const ok = await validateStep(currentIndex)
    if (!ok) return
    clearStepErrors(currentIndex)
    setCurrentIndex((prev) => {
      const nextIndex = Math.min(prev + 1, totalSteps - 1)
      if (nextIndex !== prev) {
        scrollToTop()
      }
      return nextIndex
    })
  }, [clearStepErrors, currentIndex, totalSteps, validateStep, scrollToTop])

  const goPrev = useCallback(() => {
    if (currentIndex <= 0) return
    clearStepErrors(currentIndex)
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
    scrollToTop()
  }, [clearStepErrors, currentIndex, scrollToTop])

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

      clearStepErrors(currentIndex)
      setCurrentIndex((prev) => {
        if (prev === next) return prev
        scrollToTop()
        return next
      })
    },
    [allowFutureClick, clearStepErrors, currentIndex, scrollToTop, totalSteps, validateStep]
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
