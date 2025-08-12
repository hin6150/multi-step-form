import { css, Theme } from '@emotion/react'
import { Size, Variant } from '../common/button'

export const baseStyle = (t: Theme, fullWidth: boolean) => css`
  display: inline-flex;
  flex: ${fullWidth ? '1' : 'unset'};
  align-items: center;
  justify-content: center;
  gap: ${t.spacing(2)};
  border-radius: ${t.radius.md}px;
  border: 1px solid transparent;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  font-weight: 700;
  line-height: 1;
  transition:
    background 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  /* 모바일 터치 타깃 */
  min-height: 44px; /* iOS 가이드 */
  padding-inline: ${t.spacing(4)};

  &:focus-visible {
    outline: none;
    box-shadow: ${t.shadow.xs} ${t.color.focusRing};
    border-color: ${t.color.focus};
  }
`

export const sizeStyle = (t: Theme, s: Size) => {
  const map = {
    md: css`
      font-size: 14px;
      padding-block: ${t.spacing(2.5)};
    `,
    lg: css`
      font-size: 16px;
      padding-block: ${t.spacing(3)};
    `,
  }
  return map[s]
}

export const variantStyle = (t: Theme, v: Variant) => {
  switch (v) {
    case 'primary':
      return css`
        background: ${t.color.focus};
        color: #fff;
        &:hover {
          filter: brightness(0.98);
        }
        &:active {
          filter: brightness(0.95);
        }
      `
    case 'secondary':
      return css`
        background: ${t.color.segActiveBg};
        border-color: ${t.color.focus};
        color: ${t.color.text};
        &:hover {
          background: #fff;
        }
      `
    case 'ghost':
      return css`
        background: ${t.color.surface};
        border-color: ${t.color.border};
        color: ${t.color.text};
        &:hover {
          background: ${t.color.inputHover};
        }
      `
    case 'danger':
      return css`
        background: ${t.color.danger};
        color: #fff;
        &:hover {
          filter: brightness(0.98);
        }
        &:active {
          filter: brightness(0.95);
        }
      `
  }
}

export const disabledStyle = (t: Theme) => css`
  cursor: not-allowed;
  background: ${t.color.disabledBg} !important;
  border-color: ${t.color.disabledBorder} !important;
  color: ${t.color.disabledText} !important;
  box-shadow: none !important;
`

export const iconLeft = css`
  display: inline-grid;
  place-items: center;
  margin-right: 2px;
`
export const iconRight = css`
  display: inline-grid;
  place-items: center;
  margin-left: 2px;
`

export const spinner = (t: Theme) => css`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.55);
  border-top-color: rgba(255, 255, 255, 1);
  margin-right: ${t.spacing(1)};
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`
