import { Global, css, useTheme } from '@emotion/react'

export function GlobalStyles() {
  const theme = useTheme()
  return (
    <Global
      styles={css`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
        html,
        body,
        #__next,
        #root {
          height: 100%;
        }
        body {
          margin: 0;
          font-family: ${theme.typography.body};
          background: ${theme.color.bg};
          color: ${theme.color.text};
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        button {
          font: inherit;
        }
      `}
    />
  )
}
