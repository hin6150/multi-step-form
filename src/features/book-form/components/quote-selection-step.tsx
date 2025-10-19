import { Button } from '@/components/common/button'
import { sectionStyle, titleStyle, quoteListStyle, quoteActionsStyle } from '@/styles/form-styles'
import { QuoteItem } from '@/features/components/quote-item'
import useQuoteSelection from '../hooks/use-quote-selection'

export default function QuoteSelectionStep() {
  const { fields, totalPages, quoteCount, appendEmptyQuote, removeQuoteHandler } = useQuoteSelection()

  return (
    <section css={sectionStyle}>
      <h2 css={titleStyle}>4단계: 인용구 선택</h2>

      <div css={quoteListStyle}>
        {fields.map((field, index) => (
          <QuoteItem
            key={field.id}
            index={index}
            totalPages={totalPages}
            showPageInput={quoteCount >= 2}
            canRemove={quoteCount >= 2}
            onRemove={removeQuoteHandler(index)}
          />
        ))}
      </div>

      <div css={quoteActionsStyle}>
        <Button variant="secondary" onClick={appendEmptyQuote}>
          인용구 추가
        </Button>
      </div>
    </section>
  )
}
