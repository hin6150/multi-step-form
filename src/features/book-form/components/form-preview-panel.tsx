import { useEffect, useMemo, useState } from 'react'
import { css, Theme } from '@emotion/react'
import { useFormContext, useWatch } from 'react-hook-form'

import type { FormValues } from '@/lib/schema'
import { ReadingStatus } from '@/types/type'

const previewWrapper = (theme: Theme) => css`
  position: sticky;
  top: ${theme.spacing(4)};
  align-self: stretch;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(3)};
  width: min(360px, 100%);
  height: calc(100vh - ${theme.spacing(8)});
  max-height: calc(100vh - ${theme.spacing(8)});
  overflow: hidden;
`

const previewCard = (theme: Theme) => css`
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

const previewHeading = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(0.75)};

  h2 {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: ${theme.color.text};
  }

  p {
    font-size: 14px;
    color: ${theme.color.muted};
  }
`

const bookMeta = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1)};
  padding: ${theme.spacing(3)};
  border-radius: ${theme.radius.md}px;
  background: ${theme.color.surface};

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: ${theme.color.text};
    margin: 0;
  }

  span {
    font-size: 13px;
    color: ${theme.color.muted};
  }
`

const bookStatus = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1)};

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

const quotesList = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(2)};

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

const emptyState = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing(6)};
  border-radius: ${theme.radius.md}px;
  border: 1px dashed ${theme.color.border};
  color: ${theme.color.muted};
  font-size: 14px;
  text-align: center;
  line-height: 1.5;
`

const reflectionBox = (theme: Theme) => css`
  border-radius: ${theme.radius.md}px;
  background: ${theme.color.surface};
  padding: ${theme.spacing(3)};
  font-size: 14px;
  line-height: 1.6;
  color: ${theme.color.text};
  white-space: pre-wrap;
`

const sectionTitle = (theme: Theme) => css`
  font-size: 13px;
  font-weight: 700;
  color: ${theme.color.muted};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: ${theme.spacing(1)};
`

function formatStatusLabel(status: ReadingStatus) {
  switch (status) {
    case ReadingStatus.WANT:
      return '읽고 싶은 책'
    case ReadingStatus.READING:
      return '읽는 중'
    case ReadingStatus.HOLD:
      return '보류 중'
    case ReadingStatus.DONE:
      return '완독'
    default:
      return status
  }
}

function formatVisibility(value: FormValues['visibility']) {
  if (value === 'PUBLIC') return '전체 공개'
  if (value === 'PRIVATE') return '나만 보기'
  return value
}

function formatRecommendation(value: FormValues['isRecommended']) {
  if (value === 'RECOMMEND') return '추천해요'
  if (value === 'NOT_RECOMMEND') return '추천하지 않아요'
  return '선택하지 않았어요'
}

function getRatingLabel(rating?: number) {
  if (!rating) return '별점을 선택해주세요.'
  return `${rating.toFixed(1).replace('.0', '')}점`
}

export function FormPreviewPanel() {
  const { control } = useFormContext<FormValues>()
  const watchedValues = useWatch<FormValues>({ control })

  const [previewValues, setPreviewValues] = useState<FormValues | null>(null)
  const [isDesktop, setIsDesktop] = useState(() => (typeof window === 'undefined' ? false : window.innerWidth >= 1024))

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setPreviewValues(watchedValues as any), 500)

    return () => {
      clearTimeout(timer)
    }
  }, [watchedValues])

  const formattedQuotes = useMemo(() => {
    if (!previewValues?.quotes?.length) return []

    return previewValues.quotes.filter((quote) => quote.content.trim().length > 0)
  }, [previewValues])

  if (!isDesktop) {
    return null
  }

  return (
    <aside css={previewWrapper}>
      <section css={previewCard}>
        <header css={previewHeading}>
          <h2>앱 화면 미리보기</h2>
          <p>입력한 도서 정보가 0.5초 후 반영됩니다.</p>
        </header>

        {previewValues ? (
          <>
            <div css={bookMeta}>
              <h3>{previewValues.bookTitle || '도서 제목을 입력해주세요.'}</h3>
              <span>{previewValues.author || '저자를 입력하면 여기에 표시됩니다.'}</span>
              <span>{previewValues.publisher || '출판사 정보는 선택 사항이에요.'}</span>
            </div>

            <dl css={bookStatus}>
              <div>
                <dt>상태</dt>
                <dd>{formatStatusLabel(previewValues.status)}</dd>
              </div>
              <div>
                <dt>진행 기간</dt>
                <dd>
                  {previewValues.startedAt
                    ? `${previewValues.startedAt} ${previewValues.endedAt ? `~ ${previewValues.endedAt}` : ''}`
                    : '시작일을 입력하면 여기에 표시됩니다.'}
                </dd>
              </div>
              <div>
                <dt>별점</dt>
                <dd>{getRatingLabel(previewValues.rating)}</dd>
              </div>
              <div>
                <dt>추천</dt>
                <dd>{formatRecommendation(previewValues.isRecommended)}</dd>
              </div>
              <div>
                <dt>공개 범위</dt>
                <dd>{formatVisibility(previewValues.visibility)}</dd>
              </div>
            </dl>

            {previewValues.reflection?.trim() ? (
              <section css={reflectionBox}>{previewValues.reflection}</section>
            ) : (
              <section css={emptyState}>독후감을 작성하면 간단 요약이 여기에 나타납니다.</section>
            )}

            <section>
              <h4 css={sectionTitle}>인용구</h4>
              {formattedQuotes.length ? (
                <ul css={quotesList}>
                  {formattedQuotes.map((quote, index) => (
                    <li key={`${quote.content}-${index}`}>
                      <blockquote>{quote.content}</blockquote>
                      {quote.page ? <cite>{quote.page}쪽에서 발췌</cite> : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <div css={emptyState}>마음에 드는 문장을 추가하면 미리보기가 채워집니다.</div>
              )}
            </section>
          </>
        ) : (
          <div css={emptyState}>입력한 도서 정보를 잠시 후에 미리보기로 확인할 수 있어요.</div>
        )}
      </section>
    </aside>
  )
}
