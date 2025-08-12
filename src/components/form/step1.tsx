import { useFormContext } from 'react-hook-form'
import { FormValues, ReadingStatus } from '@/types/form'

export default function Step1() {
  const { register } = useFormContext<FormValues>()

  return (
    <section>
      <h2>1단계: 도서 기본 정보 및 상태</h2>

      <div>
        <label htmlFor="bookTitle">도서 제목</label>
        <input id="bookTitle" {...register('bookTitle')} />
      </div>

      <div>
        <label htmlFor="author">저자</label>
        <input id="author" {...register('author')} />
      </div>

      <div>
        <label htmlFor="publisher">출판사</label>
        <input id="publisher" {...register('publisher')} />
      </div>

      <div>
        <label htmlFor="publishedAt">출판일</label>
        <input type="date" id="publishedAt" {...register('publishedAt')} />
      </div>

      <div>
        <label htmlFor="totalPages">전체 페이지 수</label>
        <input type="number" id="totalPages" {...register('totalPages')} />
      </div>

      <div>
        <p>독서 상태</p>
        <label>
          <input type="radio" value={ReadingStatus.WANT} {...register('status')} />
          읽고 싶은 책
        </label>
        <label>
          <input type="radio" value={ReadingStatus.READING} {...register('status')} />
          읽는 중
        </label>
        <label>
          <input type="radio" value={ReadingStatus.DONE} {...register('status')} />
          읽음
        </label>
        <label>
          <input type="radio" value={ReadingStatus.HOLD} {...register('status')} />
          보류 중
        </label>
      </div>

      <div>
        <label htmlFor="startedAt">독서 시작일</label>
        <input type="date" id="startedAt" {...register('startedAt')} />
      </div>

      <div>
        <label htmlFor="endedAt">독서 종료일</label>
        <input type="date" id="endedAt" {...register('endedAt')} />
      </div>
    </section>
  )
}
