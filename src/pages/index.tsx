import MultiStepForm from '@/components/form/multi-step-form'
import { css } from '@emotion/react'

const mainStyles = css`
  max-width: 1024px;
  height: 100dvh;
  margin: 0 auto;
  padding: 2rem;
`

export default function Home() {
  return (
    <main css={mainStyles}>
      <MultiStepForm />
    </main>
  )
}
