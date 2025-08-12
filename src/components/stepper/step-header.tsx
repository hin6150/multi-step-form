import { titleStyle } from '@/components/styles/form-styles'
import { headerStyle, metaStyle } from '@/components/styles/step-styles'

type Props = {
  title: string
  current: number
  total: number
}

export function StepHeader({ title, current, total }: Props) {
  return (
    <header css={(t) => headerStyle(t)}>
      <h1 css={(t) => titleStyle(t)}>{title}</h1>
      <div css={(t) => metaStyle(t)}>{`Step ${current + 1} of ${total}`}</div>
    </header>
  )
}
