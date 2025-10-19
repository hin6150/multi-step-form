import { FieldValues, Path, RegisterOptions, useFormContext, useWatch } from 'react-hook-form'
import { fieldStyle, labelStyle, inputStyle, inputErrorStyle, errorText, textCounter } from '@/styles/form-styles'

type Props<T extends FieldValues> = {
  name: Path<T>
  label: string
  placeholder?: string
  rows?: number
  maxLength?: number
  registerOptions?: RegisterOptions<T, Path<T>>
  showLength?: boolean
}

function getErrorMessage(obj: any, path: string): string | undefined {
  return path.split('.').reduce<any>((acc, key) => acc?.[key], obj)?.message
}

export function FormTextArea<T extends FieldValues>({
  name,
  label,
  placeholder,
  rows = 6,
  maxLength,
  registerOptions,
  showLength = false,
}: Props<T>) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<T>()

  const msg = getErrorMessage(errors, name as string)
  const value = useWatch({ control, name }) as string | undefined
  const currentLength = value?.length ?? 0

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
        css={[inputStyle, msg && inputErrorStyle]}
        {...register(name, registerOptions)}
      />
      {showLength && (
        <p css={textCounter}>
          {currentLength}
          {maxLength ? ` / ${maxLength}` : '자'}
        </p>
      )}
      {msg && <p css={errorText}>{msg}</p>}
    </div>
  )
}
