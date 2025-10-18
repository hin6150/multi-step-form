import { Button } from '@/components/common/button'
import { footerBar } from '@/styles/form-styles'

import type { StepActions, StepState } from '@/features/book-form/hooks/use-multi-step-form'

type StepFooterProps = {
  state: StepState
  actions: StepActions
  prevLabel?: string
  nextLabel?: string
  submitLabel?: string
}

export function StepFooter({
  state,
  actions,
  prevLabel = '이전',
  nextLabel = '다음',
  submitLabel = '제출',
}: StepFooterProps) {
  return (
    <footer css={(t) => footerBar(t)}>
      {!state.isFirst && (
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            void actions.goPrev()
          }}
          fullWidth
        >
          {prevLabel}
        </Button>
      )}

      {!state.isLast && (
        <Button
          type="button"
          variant="primary"
          onClick={() => {
            void actions.goNext()
          }}
          fullWidth
        >
          {nextLabel}
        </Button>
      )}

      {state.isLast && (
        <Button variant="primary" type="submit" fullWidth>
          {submitLabel}
        </Button>
      )}
    </footer>
  )
}
