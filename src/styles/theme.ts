const theme = {
  colors: {
    danger: "#e11d48",
    border: "#e5e7eb",
    text: "#111827",
    muted: "#6b7280",
  },
  radius: "12px",
};
export default theme;

export type AppTheme = typeof theme;
declare module "@emotion/react" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Theme extends AppTheme {}
}