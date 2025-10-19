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

type Option<V extends string | number> = { label: string; value: V }

type Props<T extends FieldValues, V extends string | number> = {
  name: Path<T>
  label: string
  options: Option<V>[]
  onChange?: (value: V) => void
}

export function RhfSegmented<T extends FieldValues, V extends string | number>({
  name,
  label,
  options,
  onChange,
}: Props<T, V>) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<T>()

  const current = useWatch({ control, name }) as unknown as V

  const errorMessage = (() => {
    const err = (errors as Record<string, any>)[name as string]
    return typeof err?.message === 'string' ? err.message : undefined
  })()

  return (
    <div css={fieldStyle}>
      <p css={labelStyle}>{label}</p>
      <div css={segGroup}>
        {options.map((opt) => (
          <label key={String(opt.value)} css={segItem}>
            <input
              type="radio"
              value={String(opt.value)}
              {...register(name, { onChange: (e) => onChange?.((e.target as HTMLInputElement).value as unknown as V) })}
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
