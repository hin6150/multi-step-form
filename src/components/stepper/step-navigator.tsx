import { useCallback } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import type { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form'

import { StepProgress } from '@/components/stepper/step-progress'
import { StepFooter } from '@/components/stepper/step-footer'
import { SwitchCases } from '@/components/common/switch-cases'

import { FormStep, useStepController } from '@/features/book-form/hooks/use-multi-step-form'
import { stepFormLayout } from '@/styles/form-styles'
import { stepMainArea } from '@/styles/step-styles'

type StepNavigatorProps<TValues extends FieldValues, TComponentId extends string> = {
  title: string
  steps: FormStep<TValues, TComponentId>[]
  cases: Record<TComponentId, ReactNode>
  methods: UseFormReturn<TValues>
  onSubmit: SubmitHandler<TValues>
  allowFutureClick?: boolean
}

export function StepNavigator<TValues extends FieldValues, TComponentId extends string>({
  title,
  steps,
  cases,
  methods,
  onSubmit,
}: StepNavigatorProps<TValues, TComponentId>) {
  const { handleSubmit } = methods
  const { step, state, meta, actions } = useStepController({ steps, methods })
  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key !== 'Enter') {
      return
    }

    const target = event.target as HTMLElement
    if (!target || target.tagName === 'TEXTAREA') {
      return
    }

    const form = event.currentTarget
    const focusableElements = Array.from(
      form.querySelectorAll<HTMLElement>('input, select, textarea, button, [tabindex]')
    ).filter((element) => {
      if (element.hasAttribute('disabled')) return false
      if (element.getAttribute('aria-hidden') === 'true') return false
      if (element.tabIndex < 0) return false
      if (element.tagName === 'INPUT') {
        const input = element as HTMLInputElement
        if (input.type === 'hidden' || input.type === 'button' || input.type === 'submit') {
          return false
        }
      }
      return true
    })

    const currentIndex = focusableElements.findIndex((element) => element === target)
    if (currentIndex === -1) {
      return
    }

    const nextElement = focusableElements.slice(currentIndex + 1).find((element) => {
      if (element.tagName === 'BUTTON') return false
      if (element.tagName === 'INPUT') {
        const input = element as HTMLInputElement
        if (input.type === 'radio') return false
      }
      return true
    })

    if (nextElement) {
      event.preventDefault()
      nextElement.focus()
    }
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown} css={stepFormLayout}>
      <StepProgress title={title} steps={meta.navigation} state={state} actions={actions} />

      <main css={stepMainArea}>
        <SwitchCases value={step?.componentId} cases={cases} />
      </main>

      <StepFooter state={state} actions={actions} />
    </form>
  )
}
