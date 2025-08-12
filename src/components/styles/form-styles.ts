import { css } from '@emotion/react'

export const sectionStyle = css`
  width: 100%;
  padding: 20px 16px 28px;
  margin: 0 auto;
  background: #fff;
`

export const titleStyle = css`
  font-size: 18px;
  font-weight: 700;
  margin: 4px 0 16px;
  letter-spacing: -0.2px;
`

export const fieldStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 14px;
`

export const labelStyle = css`
  font-size: 14px;
  color: #333;
`

export const inputStyle = css`
  appearance: none;
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #e6e6ea;
  border-radius: 12px;
  background: #f9fafb;
  font-size: 16px;
  line-height: 22px;
  outline: none;
  transition:
    box-shadow 0.15s ease,
    border-color 0.15s ease,
    background 0.15s ease;

  &:hover {
    background: #f5f6f7;
  }
  &:focus {
    border-color: #5b8def;
    box-shadow: 0 0 0 3px rgba(91, 141, 239, 0.2);
    background: #fff;
  }
  &::placeholder {
    color: #a4a7ae;
  }
`

export const inputErrorStyle = css`
  border-color: #ff5a5a;
  box-shadow: 0 0 0 3px rgba(255, 90, 90, 0.15);
  background: #fff;
`

export const disabledStyle = css`
  opacity: 0.7;
  background: #f1f3f5;
  cursor: not-allowed;
`

export const errorText = css`
  font-size: 12px;
  color: #e5484d;
  margin-top: -2px;
`

export const segGroup = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
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
export const segButton = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px 10px;
  border-radius: 12px;
  border: 1px solid #e6e6ea;
  background: #fff;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  transition:
    background 0.15s,
    border-color 0.15s,
    box-shadow 0.15s;
  &:hover {
    background: #f7f8fa;
  }
`
export const segActive = css`
  border-color: #5b8def;
  box-shadow: 0 0 0 3px rgba(91, 141, 239, 0.18);
  background: #eef4ff;
`
