import { FormValues } from '@/lib/schema'
import { useCallback, useEffect } from 'react'
import { useFormContext, useFieldArray, useWatch } from 'react-hook-form'

const MAX_QUOTES = 5

export default function useQuoteSelection() {
  const { control, getValues, setValue } = useFormContext<FormValues>()
  const { fields, append, remove } = useFieldArray<FormValues, 'quotes'>({ control, name: 'quotes' })
  const totalPages = useWatch({ control, name: 'totalPages' })

  const quoteCount = fields.length

  const isMaxReached = quoteCount >= MAX_QUOTES

  const appendEmptyQuote = useCallback(() => {
    if (isMaxReached) return
    append({ content: '', page: undefined })
  }, [append, isMaxReached])

  const removeQuoteHandler = useCallback((index: number) => () => remove(index), [remove])

  useEffect(() => {
    if (quoteCount === 1) {
      const currentPage = getValues('quotes.0.page')
      if (currentPage !== undefined) {
        setValue('quotes.0.page', undefined, { shouldDirty: true, shouldValidate: true })
      }
    }
  }, [getValues, quoteCount, setValue])

  return {
    fields,
    totalPages,
    quoteCount,
    appendEmptyQuote,
    removeQuoteHandler,
  }
}
