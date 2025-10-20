import { FieldValues, Path, RegisterOptions, useFormContext, useWatch } from 'react-hook-form'
import { fieldStyle, labelStyle, inputStyle, inputErrorStyle, errorText, textCounter } from '@/styles/form-styles'
import { getErrorMessage } from '@/utils/util'

type Props<T extends FieldValues> = {
  name: Path<T>
  label: string
  placeholder?: string
  rows?: number
  maxLength?: number
  registerOptions?: RegisterOptions<T, Path<T>>
  showLength?: boolean
}

export function RHFTextArea<T extends FieldValues>(props: Props<T>) {
  const { name, label, placeholder, rows = 6, maxLength, registerOptions, showLength = false } = props
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<T>()

  const errorMessage = getErrorMessage(errors, name)
  const currentLength = useWatch({ control, name }).length

  return (
    <div css={fieldStyle}>
      <label htmlFor={name} css={labelStyle}>
        {label}
      </label>
      <textarea
        id={name}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        css={[inputStyle, errorMessage && inputErrorStyle]}
        {...register(name, registerOptions)}
      />
      {showLength && (
        <p css={textCounter}>
          {currentLength ?? 0}
          {maxLength ? ` / ${maxLength}` : '자'}
        </p>
      )}
      {errorMessage && <p css={errorText}>{errorMessage}</p>}
    </div>
  )
}
