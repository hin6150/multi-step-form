import { useAtom } from 'jotai'
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form'

import { currentStepAtom } from '@/store/form'
import { ReadingStatus, StepItem } from '@/types/type'
import { formSchema, FormValues } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { StepHeader } from '@/components/stepper/step-header'
import { Stepper } from '@/components/stepper/stepper'
import { useCallback } from 'react'
import { Button } from '@/components/common/button'
import { footerBar } from '@/styles/form-styles'

import BookDetailsStep from './components/book-details-step'
import BookReviewStep from './components/book-review-step'
import QuoteSelectionStep from './components/quote-selection-step'
import ReadingReflectionStep from './components/reading-reflection-step'
import VisibilitySettingsStep from './components/visibility-settings-step'

const steps: StepItem[] = [
  { id: 0, label: '도서 기본 정보', component: BookDetailsStep },
  { id: 1, label: '도서 후기', component: BookReviewStep },
  { id: 2, label: '독후감', component: ReadingReflectionStep },
  { id: 3, label: '인용구', component: QuoteSelectionStep },
  { id: 4, label: '공개 여부', component: VisibilitySettingsStep },
]

const fieldsByStep: Partial<Record<number, (keyof FormValues)[]>> = {
  0: ['bookTitle', 'author', 'publisher', 'publishedAt', 'status', 'startedAt', 'endedAt'], // BookDetailsStep
  // 1: step2Fields,
  // 2: step3Fields,
  // ...
}

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useAtom(currentStepAtom)

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      status: ReadingStatus.WANT,
    },
  })

  const { handleSubmit, trigger, getFieldState, formState, setFocus } = methods

  const handleNext = async () => {
    const fields = fieldsByStep[currentStep]
    const ok = fields?.length
      ? await trigger(fields, { shouldFocus: true })
      : await trigger(undefined, { shouldFocus: true })

    if (!ok) return

    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleStepChange = useCallback(
    async (next: number) => {
      if (next === currentStep) return
      const movingForward = next > currentStep
      if (movingForward) {
        const fields = fieldsByStep[currentStep]
        const ok = fields?.length
          ? await trigger(fields, { shouldFocus: true })
          : await trigger(undefined, { shouldFocus: true })

        if (!ok) return
      }
      setCurrentStep(next)
    },
    [currentStep, trigger]
  )

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data)
    alert('폼 데이터가 콘솔에 기록되었습니다.')
  }

  const CurrentComponent = steps.find((step) => step.id === currentStep)?.component

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StepHeader title="도서 정보 입력" current={currentStep} total={steps.length} />
        <Stepper steps={steps} current={currentStep} onStepChange={handleStepChange} />

        <main>{CurrentComponent && <CurrentComponent />}</main>

        <footer css={(t) => footerBar(t)}>
          {currentStep > 0 && (
            <Button variant="ghost" onClick={handlePrev} fullWidth>
              이전
            </Button>
          )}

          {currentStep < steps.length - 1 && (
            <Button variant="primary" onClick={handleNext} fullWidth>
              다음
            </Button>
          )}

          {currentStep === steps.length - 1 && (
            <Button variant="primary" type="submit" fullWidth>
              제출
            </Button>
          )}
        </footer>
      </form>
    </FormProvider>
  )
}
