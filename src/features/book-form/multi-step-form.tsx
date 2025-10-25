import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { ReadingStatus } from '@/types/type'
import { formSchema, FormValues, step1Schema, step2Schema, step3Schema, step4Schema, step5Schema } from '@/lib/schema'
import { StepNavigator } from '@/components/stepper/step-navigator'
import { formScreenLayout } from '@/styles/form-styles'

import BookDetailsStep from './components/book-details-step'
import BookReviewStep from './components/book-review-step'
import ReadingReflectionStep from './components/reading-reflection-step'
import QuoteSelectionStep from './components/quote-selection-step'
import VisibilitySettingsStep from './components/visibility-settings-step'
import type { FormStep } from './hooks/use-multi-step-form'
import { FormPreviewPanel } from '../preview-form/component/form-preview-panel'

const stepCases = {
  bookDetails: <BookDetailsStep />,
  bookReview: <BookReviewStep />,
  readingReflection: <ReadingReflectionStep />,
  quoteSelection: <QuoteSelectionStep />,
  visibilitySettings: <VisibilitySettingsStep />,
} as const

type StepId = keyof typeof stepCases

const steps: FormStep<FormValues, StepId>[] = [
  {
    id: 0,
    label: '도서 기본 정보',
    componentId: 'bookDetails',
    fields: ['bookTitle', 'author', 'publisher', 'publishedAt', 'status', 'startedAt', 'endedAt', 'totalPages'],
    schema: step1Schema,
  },
  {
    id: 1,
    label: '도서 후기',
    componentId: 'bookReview',
    fields: ['isRecommended', 'rating'],
    schema: step2Schema,
  },
  {
    id: 2,
    label: '독후감',
    componentId: 'readingReflection',
    fields: ['reflection'],
    schema: step3Schema,
  },
  {
    id: 3,
    label: '인용구',
    componentId: 'quoteSelection',
    fields: ['quotes'],
    schema: step4Schema,
  },
  {
    id: 4,
    label: '공개 여부',
    componentId: 'visibilitySettings',
    fields: ['visibility'],
    schema: step5Schema,
  },
]

export default function MultiStepForm() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      status: ReadingStatus.WANT,
      reflection: '',
      quotes: [{ content: '', page: undefined }],
      visibility: 'PUBLIC',
    },
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data)
    alert('폼 데이터가 콘솔에 기록되었습니다.')
  }

  return (
    <FormProvider {...methods}>
      <div css={formScreenLayout}>
        <StepNavigator title="도서 정보 입력" steps={steps} cases={stepCases} methods={methods} onSubmit={onSubmit} />
        <FormPreviewPanel />
      </div>
    </FormProvider>
  )
}
