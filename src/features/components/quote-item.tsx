import { Button } from '@/components/common/button'
import { RHFCommaSeparatedInput } from '@/components/rhf-inputs/rhf-comma-separated-input'
import { RHFTextArea } from '@/components/rhf-inputs/rhf-textarea'
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

      <RHFTextArea<FormValues> name={contentName} label="인용구 내용" rows={4} maxLength={500} showLength />

      {showPageInput && (
        <RHFCommaSeparatedInput<FormValues>
          name={pageName}
          label="인용구 페이지 번호"
          placeholder={totalPages ? `1 ~ ${totalPages}` : '예) 120'}
          max={totalPages ? totalPages : undefined}
        />
      )}
    </div>
  )
}
