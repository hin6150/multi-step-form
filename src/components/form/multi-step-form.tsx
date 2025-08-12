import { useAtom } from 'jotai'
import { FormProvider, useForm } from 'react-hook-form'
import { currentStepAtom } from '@/store/form'
import { FormValues } from '@/types/form'
import Step1 from './step1'

const steps = [
  { id: 1, component: Step1 },
  // { id: 2, component: Step2 },
  // { id: 3, component: Step3 },
  // { id: 4, component: Step4 },
  // { id: 5, component: Step5 },
]

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useAtom(currentStepAtom)

  const methods = useForm<FormValues>({
    mode: 'onBlur',
  })

  const { handleSubmit } = methods

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length))
  }

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const onSubmit = (data: FormValues) => {
    console.log(data)
    alert('폼 데이터가 콘솔에 기록되었습니다.')
  }

  const CurrentComponent = steps.find((step) => step.id === currentStep)?.component

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <header>
          <h1>도서 정보 입력</h1>
          <div>{`Step ${currentStep} of ${steps.length}`}</div>
        </header>

        <main>{CurrentComponent && <CurrentComponent />}</main>

        <footer>
          {currentStep > 1 && (
            <button type="button" onClick={handlePrev}>
              이전
            </button>
          )}
          {currentStep < steps.length && (
            <button type="button" onClick={handleNext}>
              다음
            </button>
          )}
          {currentStep === steps.length && <button type="submit">제출</button>}
        </footer>
      </form>
    </FormProvider>
  )
}
