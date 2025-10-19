import { Button } from '@/components/common/button'
import { FormInput } from '@/components/inputs/form-input'
import { FormTextArea } from '@/components/inputs/form-textarea'
import { FormValues } from '@/lib/schema'
import { quoteCardStyle, quoteHeaderStyle } from '@/styles/form-styles'

type Props = {
  index: number
  totalPages: number | undefined
  showPageInput?: boolean
  canRemove: boolean
  onRemove: () => void
}

type QuoteContentPath = `quotes.${number}.content`
type QuotePagePath = `quotes.${number}.page`

export function QuoteItem({ index, totalPages, showPageInput, canRemove, onRemove }: Props) {
  const contentName: QuoteContentPath = `quotes.${index}.content`
  const pageName: QuotePagePath = `quotes.${index}.page`

  return (
    <div css={quoteCardStyle}>
      <div css={quoteHeaderStyle}>
        <h3>{`인용구 ${index + 1}`}</h3>
        <Button variant="ghost" size="md" disabled={!canRemove} onClick={onRemove}>
          삭제
        </Button>
      </div>

      <FormTextArea<FormValues> name={contentName} label="인용구 내용" rows={4} maxLength={500} showLength />

      {showPageInput && (
        <FormInput<FormValues>
          name={pageName}
          label="인용구 페이지 번호"
          type="number"
          placeholder={totalPages ? `1 ~ ${totalPages - 1}` : '예) 120'}
          registerOptions={{
            setValueAs: (value) => {
              if (value === '' || value === null || value === undefined) return undefined
              const parsed = Number(value)
              return Number.isNaN(parsed) ? undefined : parsed
            },
          }}
        />
      )}
    </div>
  )
}
