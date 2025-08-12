import { useAtom } from 'jotai'
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form'

import { currentStepAtom } from '@/store/form'
import { ReadingStatus, StepItem } from '@/types/type'
import { formSchema, FormValues } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'

import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'
import Step4 from './step4'
import Step5 from './step5'

import { StepHeader } from '@/components/stepper/step-header'
import { Stepper } from '@/components/stepper/stepper'
import { useCallback } from 'react'
import { Button } from '@/components/common/button'
import { footerBar } from '@/components/styles/form-styles'

const steps: StepItem[] = [
  { id: 0, label: '도서 기본 정보', component: Step1 },
  { id: 1, label: '도서 후기', component: Step2 },
  { id: 2, label: '독후감', component: Step3 },
  { id: 3, label: '인용구', component: Step4 },
  { id: 4, label: '공개 여부', component: Step5 },
]

const fieldsByStep: Partial<Record<number, (keyof FormValues)[]>> = {
  0: ['bookTitle', 'author', 'publisher', 'publishedAt', 'status', 'startedAt', 'endedAt'], // Step1
  // 1: step2Fields,
  // 2: step3Fields,
  // ...
}

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useAtom(currentStepAtom)

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      bookTitle: '',
      author: '',
      publisher: '',
      publishedAt: '',
      status: ReadingStatus.WANT,
      startedAt: undefined,
      endedAt: undefined,
    },
  })

  const { handleSubmit, trigger } = methods

  const handleNext = async () => {
    const fields = fieldsByStep[currentStep]
    const ok = fields ? await trigger(fields) : await trigger()
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
        const ok = fields ? await trigger(fields) : await trigger()
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
            <Button
              variant="primary"
              onClick={handleNext}
              fullWidth
              // loading={isValidating} // 필요 시 RHF 상태 연동
            >
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
