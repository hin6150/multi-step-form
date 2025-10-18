import {
  navStyle,
  progressTrack,
  progressBar,
  listStyle,
  itemStyle,
  stepButton,
  circle,
  label,
  headerStyle,
  metaStyle,
} from '@/styles/step-styles'
import { titleStyle } from '@/styles/form-styles'

import type { StepActions, StepState } from '@/features/book-form/hooks/use-multi-step-form'

type StepProgressProps = {
  title: string
  steps: Array<{ id: number; label: string }>
  state: StepState
  actions: StepActions
  allowFutureClick?: boolean
}

export function StepProgress({ title, steps, state, actions, allowFutureClick = false }: StepProgressProps) {
  const percent = state.totalSteps > 1 ? (state.currentIndex / (state.totalSteps - 1)) * 100 : 0

  return (
    <nav aria-label="Progress" css={(t) => navStyle(t)}>
      <header css={(t) => headerStyle(t)}>
        <h1 css={(t) => titleStyle(t)}>{title}</h1>
        <div css={(t) => metaStyle(t)}>{`Step ${state.currentIndex + 1} of ${state.totalSteps}`}</div>
      </header>

      <div aria-hidden css={(t) => progressTrack(t)}>
        <div css={(t) => progressBar(t, percent)} />
      </div>

      <div css={(t) => listStyle(t)}>
        {steps.map((step, index) => {
          const status: 'complete' | 'current' | 'upcoming' =
            index < state.currentIndex ? 'complete' : index === state.currentIndex ? 'current' : 'upcoming'
          const clickable = allowFutureClick || index <= state.currentIndex

          return (
            <div key={step.id} css={(t) => itemStyle(t)}>
              <button
                type="button"
                onClick={() => {
                  if (!clickable) return
                  void actions.goTo(index)
                }}
                disabled={!clickable}
                aria-current={status === 'current' ? 'step' : undefined}
                css={(t) => stepButton(t, status, !clickable)}
              >
                <span css={(t) => circle(t, status)} aria-hidden>
                  {index + 1}
                </span>
                <span css={(t) => label(t, status)}>{step.label}</span>
              </button>
            </div>
          )
        })}
      </div>
    </nav>
  )
}
