import { css } from '@emotion/react'

const mainStyles = css`
  background-color: #fff;
  max-width: 1024px;
  height: 100dvh;
  margin: 0 auto;
`

export default function Home() {
  return (
    <main css={mainStyles}>
      <header>
        <h1>도서 정보 입력</h1>
        <div>스테퍼</div>
      </header>

      <section>
        <div>도서 제목</div>
        <div>저자</div>
        <div>출판사</div>
        <div>출판일</div>
      </section>

      <footer>
        <button>이전</button>
        <button>다음</button>
      </footer>
    </main>
  )
}
