import MultiStepForm from '@/features/book-form/multi-step-form'
import { css } from '@emotion/react'

const mainStyles = css`
  margin: 0 auto;
  max-width: 1200px;
`

export default function Home() {
  return (
    <main css={mainStyles}>
      <MultiStepForm />
    </main>
  )
}
