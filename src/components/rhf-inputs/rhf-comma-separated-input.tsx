import { fieldStyle, labelStyle, inputStyle, inputErrorStyle, errorText } from '@/styles/form-styles'
import { FieldValues, Path, useController, UseControllerProps } from 'react-hook-form'

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'name' | 'defaultValue' | 'value' | 'onChange' | 'onBlur'
>

type Props<T extends FieldValues> = InputProps & {
  name: Path<T>
  label: string
  rules?: UseControllerProps<T>['rules']
  max?: number
}

export function RHFCommaSeparatedInput<T extends FieldValues>({
  name,
  label,
  rules,
  max,
  placeholder,
  disabled,
  ...rest
}: Props<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, rules })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const numericString = rawValue.replace(/[^0-9]/g, '')

    if (numericString === '') {
      field.onChange(0)
      return
    }

    let numberValue = Number(numericString)

    if (max !== undefined && numberValue > max) {
      numberValue = max
    }

    field.onChange(numberValue)
  }

  const displayValue =
    field.value === null || field.value === undefined ? '' : (field.value as number).toLocaleString('en-US')

  return (
    <div css={fieldStyle}>
      <label htmlFor={name} css={labelStyle}>
        {label}
      </label>
      <input
        id={name}
        type="text"
        inputMode="numeric"
        placeholder={placeholder}
        disabled={disabled}
        css={[inputStyle, error && inputErrorStyle]}
        ref={field.ref}
        name={field.name}
        value={displayValue}
        onChange={handleChange}
        onBlur={field.onBlur}
        {...rest}
      />
      {error?.message && <p css={errorText}>{error.message}</p>}
    </div>
  )
}
