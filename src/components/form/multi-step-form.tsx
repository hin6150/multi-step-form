import { useAtom } from 'jotai'
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form'

import { currentStepAtom } from '@/store/form'
import { ReadingStatus } from '@/types/form'
import { formSchema, FormValues } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'

import Step1 from './step1'

// 스키마에서 이미 FormValues 를 infer 했으므로 중복 정의 제거

const steps = [
  { id: 1, component: Step1 },
  // { id: 2, component: Step2 },
  // { id: 3, component: Step3 },
  // { id: 4, component: Step4 },
  // { id: 5, component: Step5 },
]

const step1Fields: (keyof FormValues)[] = [
  'bookTitle',
  'author',
  'publisher',
  'publishedAt',
  'status',
  'startedAt',
  'endedAt',
]

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
    let isValid = false
    if (currentStep === 1) {
      isValid = await trigger(step1Fields)
    }
    // TODO: 각 단계별 유효성 검사 필드 추가
    // if (currentStep === 2) {
    //   isValid = await trigger(step2Fields);
    // }

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length))
    }
  }

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const onSubmit: SubmitHandler<FormValues> = (data) => {
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
