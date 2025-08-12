import { css, Theme } from '@emotion/react'

export const sectionStyle = (theme: Theme) => css`
  width: 100%;
  padding: ${theme.spacing(5)} ${theme.spacing(4)} ${theme.spacing(7)};
  margin: 0 auto;
  background: ${theme.color.surface};
`

export const titleStyle = (theme: Theme) => css`
  font-size: 18px;
  font-weight: 700;
  margin: ${theme.spacing(1)} 0 ${theme.spacing(4)};
  letter-spacing: -0.2px;
`

export const fieldStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(2)};
  margin-bottom: ${theme.spacing(3.5)};
`

export const labelStyle = (theme: Theme) => css`
  font-size: 14px;
  color: ${theme.color.text};
  opacity: 0.9;
`

export const inputStyle = (theme: Theme) => css`
  appearance: none;
  width: 100%;
  padding: ${theme.spacing(3.5)} ${theme.spacing(4)};
  border: 1px solid ${theme.color.border};
  border-radius: ${theme.radius.md}px;
  background: ${theme.color.inputBg};
  font-size: 16px;
  line-height: 22px;
  outline: none;
  transition:
    box-shadow 0.15s ease,
    border-color 0.15s ease,
    background 0.15s ease;

  &:hover {
    background: ${theme.color.inputHover};
  }
  &:focus {
    border-color: ${theme.color.focus};
    box-shadow: ${theme.shadow.xs} ${theme.color.focusRing};
    background: #fff;
  }
  &::placeholder {
    color: ${theme.color.muted};
  }
  &:disabled {
    background: ${theme.color.disabledBg};
    border-color: ${theme.color.disabledBorder};
    color: ${theme.color.disabledText};
    cursor: not-allowed;
    box-shadow: none;
  }
  &:disabled::placeholder {
    color: ${theme.color.disabledPlaceholder};
  }
`

export const inputErrorStyle = (theme: Theme) => css`
  border-color: ${theme.color.danger};
  box-shadow: ${theme.shadow.xs} ${theme.color.dangerRing};
  background: #fff;
`

export const errorText = (theme: Theme) => css`
  font-size: 12px;
  color: ${theme.color.danger};
  margin-top: -2px;
`

export const segGroup = (theme: Theme) => css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing(2)};
  @media (min-width: 560px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

export const segItem = css`
  display: block;
`
export const visuallyHidden = css`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
`

export const segButton = (theme: Theme) => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: ${theme.spacing(3)} ${theme.spacing(2.5)};
  border-radius: ${theme.radius.md}px;
  border: 1px solid ${theme.color.border};
  background: #fff;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  transition:
    background 0.15s,
    border-color 0.15s,
    box-shadow 0.15s;
  &:hover {
    background: ${theme.color.inputHover};
  }
`

export const segActive = (theme: Theme) => css`
  border-color: ${theme.color.focus};
  box-shadow: ${theme.shadow.xs} ${theme.color.focusRing};
  background: ${theme.color.segActiveBg};
`
