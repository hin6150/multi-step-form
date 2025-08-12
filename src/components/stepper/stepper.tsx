import { StepItem } from '@/types/type'
import {
  navStyle,
  progressTrack,
  progressBar,
  listStyle,
  itemStyle,
  stepButton,
  circle,
  label,
} from '@/components/styles/step-styles'

type Props = {
  steps: StepItem[]
  current: number
  onStepChange?: (index: number) => void
  allowFutureClick?: boolean
}

export function Stepper({ steps, current, onStepChange, allowFutureClick = false }: Props) {
  const percent = steps.length > 1 ? (current / (steps.length - 1)) * 100 : 0

  return (
    <nav aria-label="Progress" css={(t) => navStyle(t)}>
      <div aria-hidden css={(t) => progressTrack(t)}>
        <div css={(t) => progressBar(t, percent)} />
      </div>

      <div css={(t) => listStyle(t)}>
        {steps.map((s, i) => {
          const state: 'complete' | 'current' | 'upcoming' =
            i < current ? 'complete' : i === current ? 'current' : 'upcoming'
          const clickable = !!onStepChange && (allowFutureClick || i <= current)

          return (
            <div key={s.id} css={(t) => itemStyle(t)}>
              <button
                key={s.id}
                type="button"
                onClick={() => clickable && onStepChange?.(i)}
                disabled={!clickable}
                aria-current={state === 'current' ? 'step' : undefined}
                css={(t) => stepButton(t, state, !clickable)}
              >
                <span css={(t) => circle(t, state)} aria-hidden>
                  {i + 1}
                </span>
                <span css={(t) => label(t, state)}>{s.label}</span>
              </button>
            </div>
          )
        })}
      </div>
    </nav>
  )
}
