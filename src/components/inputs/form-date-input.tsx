// components/form/FormDateInput.tsx
import { FieldValues, Path, RegisterOptions, useFormContext } from 'react-hook-form'
import { fieldStyle, labelStyle, inputStyle, inputErrorStyle, errorText } from '@/components/styles/form-styles'

type Props<T extends FieldValues> = {
  name: Path<T>
  label: string
  disabled?: boolean
  min?: string
  max?: string
  affects?: Path<T>[]
  deps?: Path<T>[]
  registerOptions?: RegisterOptions<T, Path<T>>
}

export function FormDateInput<T extends FieldValues>(props: Props<T>) {
  const { name, label, disabled, min, max, affects, deps, registerOptions } = props

  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext<T>()
  const msg = name.split('.').reduce<any>((acc, k) => acc?.[k], errors)?.message

  const { onChange, onBlur, ref, name: regName } = register(name, { ...registerOptions, deps })

  return (
    <div css={fieldStyle}>
      <label htmlFor={name} css={labelStyle}>
        {label}
      </label>
      <input
        id={name}
        name={regName}
        type="date"
        min={min}
        max={max}
        disabled={disabled}
        ref={ref}
        onBlur={onBlur}
        onChange={async (e) => {
          onChange(e)
          if (affects?.length) {
            await trigger(affects)
          }
        }}
        css={[inputStyle, msg && inputErrorStyle]}
      />
      {msg && <p css={errorText}>{msg}</p>}
    </div>
  )
}
