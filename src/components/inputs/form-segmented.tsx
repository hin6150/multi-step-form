import { FieldValues, Path, useFormContext, useWatch } from 'react-hook-form'
import {
  fieldStyle,
  labelStyle,
  segGroup,
  segItem,
  visuallyHidden,
  segButton,
  segActive,
} from '@/components/styles/form-styles'

type Option<V extends string | number> = { label: string; value: V }

type Props<T extends FieldValues, V extends string | number> = {
  name: Path<T>
  label: string
  options: Option<V>[]
  onChange?: (value: V) => void
}

export function FormSegmented<T extends FieldValues, V extends string | number>({
  name,
  label,
  options,
  onChange,
}: Props<T, V>) {
  const { register, control } = useFormContext<T>()
  const current = useWatch({ control, name }) as unknown as V

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
    </div>
  )
}
