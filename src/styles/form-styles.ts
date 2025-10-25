import { css, Theme } from '@emotion/react'

export const sectionStyle = (theme: Theme) => css`
  width: 100%;
`

export const stepFormLayout = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  padding: 1rem 2rem;
  background-color: white;
`

export const formScreenLayout = (t: Theme) => css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: ${t.spacing(4)};

  > * {
    min-height: 0;
  }

  > form {
    flex: 1 1 auto;
  }

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(320px, 360px);
    gap: ${t.spacing(6)};
    align-items: stretch;
    height: 100vh;
  }
`

export const titleStyle = (theme: Theme) => css`
  font-size: 24px;
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
  font-size: 16px;
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
  font-size: 14px;
  color: ${theme.color.danger};
  margin-top: -2px;
`

export const textCounter = (theme: Theme) => css`
  font-size: 13px;
  color: ${theme.color.muted};
  margin-top: -${theme.spacing(1)};
  align-self: flex-end;
`

export const segGroup = (theme: Theme) => css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing(2)};

  @media (min-width: 560px) {
    display: flex;
  }
`

export const segItem = css`
  display: block;
  flex: 1;
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
export const ratingGroup = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing(1.5)};
`

export const ratingStars = (theme: Theme) => css`
  display: flex;

  button {
    background: none;
    border: 0;
    padding: 0 4px;
    cursor: pointer;
    color: ${theme.color.border};
    display: inline-flex;
    transition: color 0.15s ease;

    &:first-of-type {
      padding-left: 0;
    }
    &:last-of-type {
      padding-right: 0;
    }
  }

  button:hover {
    color: ${theme.color.focus};
  }

  button:focus-visible {
    outline: 2px solid ${theme.color.focus};
    border-radius: ${theme.radius.sm}px;
    outline-offset: 2px;
  }

  button[data-filled='true'] {
    color: ${theme.color.focus};
  }

  button[data-error='true'] {
    color: ${theme.color.danger};
  }
`

export const ratingMessage = (theme: Theme) => css`
  font-size: 13px;
  font-weight: 500;
  color: ${theme.color.muted};
`

export const ratingMessageActive = (theme: Theme) => css`
  color: ${theme.color.focus};
`

export const ratingError = (theme: Theme) => css`
  color: ${theme.color.danger};
`

export const quoteListStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(4)};
`

export const quoteCardStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(3)};
  padding: ${theme.spacing(4)};
  border: 1px solid ${theme.color.border};
  border-radius: ${theme.radius.md}px;
  background: #fff;
`

export const quoteHeaderStyle = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const quoteActionsStyle = (theme: Theme) => css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${theme.spacing(2)};
  margin-top: ${theme.spacing(3)};
  flex-wrap: wrap;
`
