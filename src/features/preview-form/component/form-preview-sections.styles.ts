import { css, Theme } from '@emotion/react'

export const bookMeta = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1)};
  border-radius: ${theme.radius.md}px;
  background: ${theme.color.surface};

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: ${theme.color.text};
    margin: 0;
  }

  span {
    font-size: 13px;
    color: ${theme.color.muted};
  }
`

export const reflectionBox = (theme: Theme) => css`
  border-radius: ${theme.radius.md}px;
  background: ${theme.color.surface};
  font-size: 14px;
  line-height: 1.6;
  color: ${theme.color.text};
  white-space: pre-wrap;
  display: grid;
  gap: ${theme.spacing(1)};
`

export const sectionTitle = (theme: Theme) => css`
  font-size: 13px;
  font-weight: 700;
  color: ${theme.color.muted};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: ${theme.spacing(1)};
`

export const quotesList = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(2)};
  padding: 0;

  li {
    list-style: none;
    border-left: 2px solid ${theme.color.border};
    padding-left: ${theme.spacing(2)};
    display: grid;
    gap: ${theme.spacing(1)};
  }

  blockquote {
    font-size: 14px;
    line-height: 1.6;
    color: ${theme.color.text};
    margin: 0;
  }

  cite {
    font-size: 12px;
    color: ${theme.color.muted};
  }
`

export const placeholderList = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(2)};
`

export const previewWrapper = (theme: Theme) => css`
  display: none;

  @media (min-width: 1024px) {
    position: sticky;
    top: ${theme.spacing(4)};
    align-self: stretch;
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(3)};
    width: min(360px, 100%);
    height: calc(100vh - ${theme.spacing(8)});
  }
`

export const previewCard = (theme: Theme) => css`
  flex: 1 1 auto;
  border-radius: ${theme.radius.xl}px;
  background: ${theme.color.surface};
  border: 1px solid ${theme.color.border};
  padding: ${theme.spacing(5)} ${theme.spacing(4)};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(4)};
  min-height: 520px;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const bookStatus = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(4)};

  dt {
    font-size: 12px;
    font-weight: 600;
    color: ${theme.color.muted};
    text-transform: uppercase;
  }

  dd {
    font-size: 14px;
    color: ${theme.color.text};
    margin: 0;
  }
`
