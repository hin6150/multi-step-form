import { fieldStyle, labelStyle, inputStyle, inputErrorStyle, errorText } from '@/styles/form-styles'
import { getErrorMessage } from '@/utils/util'
import { FieldValues, Path, RegisterOptions, useFormContext } from 'react-hook-form'

type Props<T extends FieldValues> = {
  name: Path<T>
  label: string
  disabled?: boolean
  min?: string
  max?: string
  deps?: Path<T>[]
  registerOptions?: RegisterOptions<T, Path<T>>
}

export function RHFDateInput<T extends FieldValues>(props: Props<T>) {
  const { name, label, disabled, min, max, deps, registerOptions } = props
  const {
    register,
    formState: { errors },
  } = useFormContext<T>()
  const errorMessage = getErrorMessage(errors, name)

  return (
    <div css={fieldStyle}>
      <label htmlFor={name} css={labelStyle}>
        {label}
      </label>
      <input
        id={name}
        type="date"
        min={min}
        max={max}
        disabled={disabled}
        css={[inputStyle, errorMessage && inputErrorStyle]}
        {...register(name, { ...registerOptions, deps })}
      />
      {errorMessage && <p css={errorText}>{errorMessage}</p>}
    </div>
  )
}
