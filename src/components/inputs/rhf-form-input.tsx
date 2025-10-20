import { FieldValues, Path, RegisterOptions, useFormContext } from 'react-hook-form'
import { fieldStyle, labelStyle, inputStyle, inputErrorStyle, errorText } from '@/styles/form-styles'
import { getErrorMessage } from '@/utils/util'

type Props<T extends FieldValues> = {
  name: Path<T>
  label: string
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
  disabled?: boolean
  registerOptions?: RegisterOptions<T, Path<T>>
}

export function RhfFormInput<T extends FieldValues>(props: Props<T>) {
  const { name, label, type = 'text', placeholder, disabled, registerOptions } = props
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
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        css={[inputStyle, errorMessage && inputErrorStyle]}
        {...register(name, registerOptions)}
      />
      {errorMessage && <p css={errorText}>{errorMessage}</p>}
    </div>
  )
}
