import { FormValues } from '@/lib/schema'
import { useCallback } from 'react'
import { useFormContext, useFieldArray, useWatch } from 'react-hook-form'

export default function useQuoteSelection() {
  const { control } = useFormContext<FormValues>()
  const { fields, append, remove } = useFieldArray<FormValues, 'quotes'>({ control, name: 'quotes' })
  const totalPages = useWatch({ control, name: 'totalPages' })

  const quoteCount = fields.length

  const appendEmptyQuote = useCallback(() => append({ content: '', page: undefined }), [append])
  const removeQuoteHandler = useCallback((index: number) => () => remove(index), [remove])

  return {
    fields,
    totalPages,
    quoteCount,
    appendEmptyQuote,
    removeQuoteHandler,
  }
}
