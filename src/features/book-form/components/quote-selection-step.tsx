import { useEffect } from 'react'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'

import { Button } from '@/components/common/button'
import { FormInput } from '@/components/inputs/form-input'
import { FormTextArea } from '@/components/inputs/form-textarea'
import { FormValues } from '@/lib/schema'
import {
  sectionStyle,
  titleStyle,
  quoteListStyle,
  quoteCardStyle,
  quoteHeaderStyle,
  quoteActionsStyle,
} from '@/styles/form-styles'

type QuoteContentPath = `quotes.${number}.content`
type QuotePagePath = `quotes.${number}.page`

export default function QuoteSelectionStep() {
  const { control, clearErrors } = useFormContext<FormValues>()
  const { fields, append, remove } = useFieldArray<FormValues, 'quotes'>({ control, name: 'quotes' })
  const totalPages = useWatch({ control, name: 'totalPages' }) as number | undefined
  const quoteCount = fields.length
  const requiresPage = quoteCount >= 2

  useEffect(() => {
    if (!requiresPage && quoteCount > 0) {
      const targets = Array.from({ length: quoteCount }, (_, index) => `quotes.${index}.page` as QuotePagePath)
      clearErrors(targets)
    }
  }, [clearErrors, quoteCount, requiresPage])

  return (
    <section css={sectionStyle}>
      <h2 css={titleStyle}>4단계: 인용구 선택</h2>

      <div css={quoteListStyle}>
        {fields.map((field, index) => (
          <div key={field.id} css={quoteCardStyle}>
            <div css={quoteHeaderStyle}>
              <h3>{`인용구 ${index + 1}`}</h3>
              <Button variant="ghost" size="md" disabled={quoteCount === 1} onClick={() => remove(index)}>
                삭제
              </Button>
            </div>

            <FormTextArea<FormValues>
              name={`quotes.${index}.content` as QuoteContentPath}
              label="인용구 내용"
              rows={4}
              maxLength={500}
              showLength
            />

            {requiresPage && (
              <FormInput<FormValues>
                name={`quotes.${index}.page` as QuotePagePath}
                label="인용구 페이지 번호"
                type="number"
                placeholder={totalPages ? `1 ~ ${totalPages - 1}` : '예) 120'}
                registerOptions={{
                  valueAsNumber: true,
                  setValueAs: (value) => {
                    if (value === '' || value === null || value === undefined) return undefined
                    const parsed = Number(value)
                    return Number.isNaN(parsed) ? undefined : parsed
                  },
                }}
              />
            )}
          </div>
        ))}
      </div>

      <div css={quoteActionsStyle}>
        <Button variant="secondary" onClick={() => append({ content: '', page: undefined })}>
          인용구 추가
        </Button>
      </div>
    </section>
  )
}
