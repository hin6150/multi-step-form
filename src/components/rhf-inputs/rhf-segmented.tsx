import { useId } from 'react'
import { FieldValues, Path, useFormContext, useWatch } from 'react-hook-form'
import {
  errorText,
  fieldStyle,
  labelStyle,
  segGroup,
  segItem,
  visuallyHidden,
  segButton,
  segActive,
} from '@/styles/form-styles'
import { getErrorMessage } from '@/utils/util'

type Option = { label: string; value: string }
type Props<T extends FieldValues, V extends string> = {
  name: Path<T>
  label: string
  options: Option[]
  onChange?: (value: V) => void
}

export function RHFSegmented<T extends FieldValues, V extends string>(props: Props<T, V>) {
  const { name, label, options, onChange } = props
  const labelId = useId()
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<T>()

  const current = useWatch({ control, name })
  const errorMessage = getErrorMessage(errors, name)

  return (
    <div css={fieldStyle}>
      <p css={labelStyle} id={labelId}>
        {label}
      </p>
      <div css={segGroup} role="radiogroup" aria-labelledby={labelId}>
        {options.map((opt) => (
          <label key={String(opt.value)} css={segItem}>
            <input
              type="radio"
              value={String(opt.value)}
              {...register(name, { onChange: (e) => onChange?.(e.target.value) })}
              css={visuallyHidden}
            />
            <span css={[segButton, current === opt.value && segActive]}>{opt.label}</span>
          </label>
        ))}
      </div>
      {errorMessage && <p css={errorText}>{errorMessage}</p>}
    </div>
  )
}
