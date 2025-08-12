const theme = {
  colors: {
    primary: '#3182F7',
    background: '#FFFFFF',
    foreground: '#111827',
    border: '#E5E7EB',
    danger: '#FF003C',
    muted: '#6B7280',
  },
  radius: '12px',
}
export default theme

export type AppTheme = typeof theme
declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Theme extends AppTheme {}
}
