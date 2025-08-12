export type AppTheme = {
  color: {
    text: string
    muted: string
    bg: string
    surface: string
    border: string
    inputBg: string
    inputHover: string
    focus: string
    focusRing: string
    danger: string
    dangerRing: string
    segActiveBg: string
    disabledBg: string
    disabledBorder: string
    disabledText: string
    disabledPlaceholder: string
  }
  radius: { sm: number; md: number; xl: number }
  spacing: (n: number) => string
  shadow: { xs: string }
  typography: { body: string; heading: string }
}

export const appTheme: AppTheme = {
  color: {
    text: '#1a1a1a',
    muted: '#6b7280',
    bg: '#eeeeeeff',
    surface: '#ffffff',
    border: '#e6e6ea',
    inputBg: '#ffffff',
    inputHover: '#f5f6f7',
    focus: '#5b8def',
    focusRing: 'rgba(91, 141, 239, 0.20)',
    danger: '#e5484d',
    dangerRing: 'rgba(255, 90, 90, 0.15)',
    segActiveBg: '#eef4ff',
    disabledBg: '#edededff',
    disabledBorder: '#d3d8df',
    disabledText: '#9aa3ad',
    disabledPlaceholder: '#b6bdc6',
  },
  radius: { sm: 8, md: 12, xl: 16 },
  spacing: (n) => `${n * 4}px`,
  shadow: { xs: '0 0 0 3px' }, // 포커스 링에 사용
  typography: {
    body: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif`,
    heading: `inherit`,
  },
}

import '@emotion/react'
declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}
