import { ButtonHTMLAttributes, ReactNode } from 'react'
import {
  iconLeft,
  iconRight,
  spinner,
  baseStyle,
  sizeStyle,
  variantStyle,
  disabledStyle,
} from '@/components/styles/button-styles'

export type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type Size = 'md' | 'lg'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  startIcon?: ReactNode
  endIcon?: ReactNode
  loading?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  startIcon,
  endIcon,
  loading,
  disabled,
  children,
  ...rest
}: Props) {
  const isDisabled = disabled || loading
  return (
    <button
      type="button"
      aria-busy={loading || undefined}
      disabled={isDisabled}
      css={(t) => [
        baseStyle(t, fullWidth),
        sizeStyle(t, size),
        variantStyle(t, variant),
        isDisabled && disabledStyle(t),
      ]}
      {...rest}
    >
      {loading && <span css={(t) => spinner(t)} aria-hidden />}
      {startIcon && <span css={iconLeft}>{startIcon}</span>}
      <span>{children}</span>
      {endIcon && <span css={iconRight}>{endIcon}</span>}
    </button>
  )
}
