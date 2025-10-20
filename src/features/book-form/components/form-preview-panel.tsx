import { css, Theme } from '@emotion/react'
import { useFormContext, useWatch } from 'react-hook-form'

import type { FormValues } from '@/lib/schema'
import { ReadingStatus } from '@/types/type'
import { Skeleton } from '@/components/common/skeleton'

const previewWrapper = (theme: Theme) => css`
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

const bookMeta = (theme: Theme) => css`
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

const bookStatus = (theme: Theme) => css`
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

const reflectionBox = (theme: Theme) => css`
  border-radius: ${theme.radius.md}px;
  background: ${theme.color.surface};
  font-size: 14px;
  line-height: 1.6;
  color: ${theme.color.text};
  white-space: pre-wrap;
  display: grid;
  gap: ${theme.spacing(1)};
`

const sectionTitle = (theme: Theme) => css`
  font-size: 13px;
  font-weight: 700;
  color: ${theme.color.muted};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: ${theme.spacing(1)};
`

const quotesList = (theme: Theme) => css`
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

const placeholderList = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(2)};
`

const statusLabel: Record<ReadingStatus, string> = {
  [ReadingStatus.WANT]: '읽고 싶은 책',
  [ReadingStatus.READING]: '읽는 중',
  [ReadingStatus.HOLD]: '보류 중',
  [ReadingStatus.DONE]: '완독',
}

const recommendationLabel: Record<FormValues['isRecommended'], string> = {
  RECOMMEND: '추천해요',
  NOT_RECOMMEND: '추천하지 않아요',
}

const visibilityLabel: Record<FormValues['visibility'], string> = {
  PUBLIC: '전체 공개',
  PRIVATE: '나만 보기',
}

export function FormPreviewPanel() {
  const { control } = useFormContext<FormValues>()
  const values = useWatch<FormValues>({ control })
  const quotes = values?.quotes?.filter((quote: any) => quote.content.trim().length > 0) ?? []
  const rating = typeof values?.rating === 'number' ? values.rating.toFixed(1).replace('.0', '') : null

  return (
    <aside css={previewWrapper}>
      <section css={previewCard}>
        <div css={bookMeta}>
          <h3>{values?.bookTitle || <Skeleton height={18} width="70%" />}</h3>
          <span>{values?.author || <Skeleton width="50%" />}</span>
          <span>{values?.publisher || <Skeleton width="40%" />}</span>
        </div>

        <dl css={bookStatus}>
          <div>
            <dt>출판일</dt>
            <dd>{values?.publishedAt}</dd>
          </div>
          <div>
            <dt>전체 페이지 수</dt>
            <dd>{values?.totalPages}</dd>
          </div>
          <div>
            <dt>상태</dt>
            <dd>{values?.status ? statusLabel[values.status] : <Skeleton width="60%" />}</dd>
          </div>
          <div>
            <dt>기간</dt>
            <dd>
              {values?.startedAt ? (
                <>
                  {values.startedAt}
                  {values?.endedAt ? ` ~ ${values.endedAt}` : null}
                </>
              ) : (
                <Skeleton width="70%" />
              )}
            </dd>
          </div>
          <div>
            <dt>별점</dt>
            <dd>{rating || <Skeleton width="40%" />}</dd>
          </div>
          <div>
            <dt>추천</dt>
            <dd>{values?.isRecommended ? recommendationLabel[values.isRecommended] : <Skeleton width="50%" />}</dd>
          </div>
          <div>
            <dt>공개</dt>
            <dd>{values?.visibility ? visibilityLabel[values.visibility] : <Skeleton width="40%" />}</dd>
          </div>
        </dl>

        <section css={reflectionBox}>
          <h4 css={sectionTitle}>독후감</h4>
          {values?.reflection?.trim() ? (
            values.reflection
          ) : (
            <>
              <Skeleton />
              <Skeleton width="80%" />
              <Skeleton width="65%" />
            </>
          )}
        </section>

        <section>
          <h4 css={sectionTitle}>인용구</h4>
          {quotes.length ? (
            <ul css={quotesList}>
              {quotes.map((quote, index) => (
                <li key={`${quote.content}-${index}`}>
                  <blockquote>{quote.content}</blockquote>
                  {quote.page ? <cite>{quote.page}쪽</cite> : null}
                </li>
              ))}
            </ul>
          ) : (
            <div css={placeholderList}>
              <Skeleton height={48} />
              <Skeleton height={48} width="85%" />
            </div>
          )}
        </section>
      </section>
    </aside>
  )
}
