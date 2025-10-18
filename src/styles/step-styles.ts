import { css, Theme } from '@emotion/react'

export const headerStyle = (t: Theme) => css`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${t.spacing(2)};
  margin-bottom: ${t.spacing(2)};
`

export const titleStyle = (t: Theme) => css`
  font-size: 20px;
  font-weight: 800;
  margin: 0;
`

export const metaStyle = (t: Theme) => css`
  font-size: 13px;
  color: ${t.color.muted};
`

export const navStyle = (t: Theme) => css`
  width: 100%;
  padding: ${t.spacing(3)} 0 ${t.spacing(2)};
`

export const progressTrack = (t: Theme) => css`
  position: relative;
  height: 4px;
  border-radius: 9999px;
  background: ${t.color.border};
  margin-bottom: ${t.spacing(3)};
  overflow: hidden;
`

export const progressBar = (t: Theme, percent: number) => css`
  height: 100%;
  width: ${percent}%;
  background: ${t.color.focus};
  transition: width 200ms ease;
`

export const listStyle = (t: Theme) => css`
  display: grid;
  grid-template-columns: repeat(${/* dynamic columns */ ''} auto-fit, minmax(0, 1fr));
  grid-auto-flow: column;
  gap: ${t.spacing(2)};
  overflow-x: auto;
  padding-bottom: ${t.spacing(1)};
`

export const itemStyle = (t: Theme) => css`
  min-width: 0;
`

export const stepButton = (t: Theme, state: 'complete' | 'current' | 'upcoming', disabled: boolean) => css`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${t.spacing(2)};
  padding: ${t.spacing(2)} ${t.spacing(2)};
  border-radius: ${t.radius.md}px;
  border: 1px solid ${state === 'current' ? t.color.focus : t.color.border};
  background: ${state === 'current' ? t.color.segActiveBg : t.color.surface};
  cursor: ${disabled ? 'default' : 'pointer'};
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    ${!disabled && state !== 'current' ? `background: ${t.color.inputHover};` : ''}
  }
`

export const circle = (t: Theme, state: 'complete' | 'current' | 'upcoming') => css`
  width: 28px;
  height: 28px;
  border-radius: 9999px;
  display: inline-grid;
  place-items: center;
  font-weight: 700;
  font-size: 13px;
  border: 2px solid ${state === 'upcoming' ? t.color.border : t.color.focus};
  background: ${state === 'complete' ? t.color.focus : '#fff'};
  color: ${state === 'complete' ? '#fff' : t.color.text};
  box-shadow: ${state === 'current' ? `${t.shadow.xs} ${t.color.focusRing}` : 'none'};
  flex: 0 0 auto;
`

export const label = (t: Theme, state: 'complete' | 'current' | 'upcoming') => css`
  font-size: 14px;
  line-height: 1.3;
  color: ${state === 'upcoming' ? t.color.muted : t.color.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const optional = (t: Theme) => css`
  font-style: normal;
  margin-left: ${t.spacing(1)};
  color: ${t.color.muted};
  font-weight: 500;
  font-size: 12px;
`
