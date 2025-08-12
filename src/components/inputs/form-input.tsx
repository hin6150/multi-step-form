import { FieldValues, Path, RegisterOptions, useFormContext } from 'react-hook-form'
import { fieldStyle, labelStyle, inputStyle, inputErrorStyle, errorText } from '@/components/styles/form-styles'

type Props<T extends FieldValues> = {
  name: Path<T>
  label: string
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
  disabled?: boolean
  registerOptions?: RegisterOptions<T, Path<T>>
}

function getErrorMessage(obj: any, path: string): string | undefined {
  return path.split('.').reduce<any>((acc, key) => acc?.[key], obj)?.message
}

export function FormInput<T extends FieldValues>({
  name,
  label,
  type = 'text',
  placeholder,
  disabled,
  registerOptions,
}: Props<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>()
  const msg = getErrorMessage(errors, name as string)

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
        css={[inputStyle, msg && inputErrorStyle]}
        {...register(name, registerOptions)}
      />
      {msg && <p css={errorText}>{msg}</p>}
    </div>
  )
}
