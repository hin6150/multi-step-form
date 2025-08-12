import { css } from '@emotion/react'

export const globalStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  :root {
    --primary: #3182f7;
    --background: #f9fafb;
    --foreground: #111827;
    --border: #e5e7eb;
    --danger: #ff003c;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --background: #111827;
      --foreground: #f9fafb;
      --border: #374151;
    }
  }

  html,
  body {
    height: 100%;
    font-size: 16px;
    line-height: 1.5;
    color: var(--foreground);
    background: var(--background);
    font-family: Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    max-width: 100vw;
    overflow-x: hidden;
  }

  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 100%;
    font-weight: normal;
    margin: 0;
    padding: 0;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }
`
