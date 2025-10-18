// components/inputs/RhfDateInput.tsx (파일명 변경)
import { fieldStyle, labelStyle, inputStyle, inputErrorStyle, errorText } from '@/styles/form-styles'
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

export function RhfDateInput<T extends FieldValues>(props: Props<T>) {
  const { name, label, disabled, min, max, deps, registerOptions } = props

  const {
    register,
    formState: { errors },
  } = useFormContext<T>()
  const msg = name.split('.').reduce<any>((acc, k) => acc?.[k], errors)?.message

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
        css={[inputStyle, msg && inputErrorStyle]}
        {...register(name, { ...registerOptions, deps })}
      />
      {msg && <p css={errorText}>{msg}</p>}
    </div>
  )
}
