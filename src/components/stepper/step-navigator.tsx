import type { ReactNode } from 'react'
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} css={stepFormLayout}>
      <StepProgress title={title} steps={meta.navigation} state={state} actions={actions} />

      <main css={stepMainArea}>
        <SwitchCases value={step?.componentId} cases={cases} />
      </main>

      <StepFooter state={state} actions={actions} />
    </form>
  )
}
