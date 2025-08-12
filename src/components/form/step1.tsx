import { FormValues } from '@/lib/schema'
import { ReadingStatus } from '@/types/form'
import { useFormContext, useWatch } from 'react-hook-form'

export default function Step1() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>()
  const status = useWatch({ name: 'status' })

  // 독서 상태에 따른 날짜 필드 활성화/비활성화 로직
  const isStartedAtDisabled = status === ReadingStatus.WANT
  const isEndedAtDisabled = status !== ReadingStatus.DONE

  return (
    <section>
      <h2>1단계: 도서 기본 정보 및 상태</h2>
      {errors.status && <p style={{ color: 'red' }}>{errors.status.message}</p>}

      <div>
        <label htmlFor="bookTitle">도서 제목</label>
        <input id="bookTitle" {...register('bookTitle')} />
        {errors.bookTitle && <p style={{ color: 'red' }}>{errors.bookTitle.message}</p>}
      </div>

      <div>
        <label htmlFor="author">저자</label>
        <input id="author" {...register('author')} />
        {errors.author && <p style={{ color: 'red' }}>{errors.author.message}</p>}
      </div>

      <div>
        <label htmlFor="publisher">출판사</label>
        <input id="publisher" {...register('publisher')} />
        {errors.publisher && <p style={{ color: 'red' }}>{errors.publisher.message}</p>}
      </div>

      <div>
        <label htmlFor="publishedAt">출판일</label>
        <input type="date" id="publishedAt" {...register('publishedAt')} />
        {errors.publishedAt && <p style={{ color: 'red' }}>{errors.publishedAt.message}</p>}
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
        <input type="date" id="startedAt" {...register('startedAt')} disabled={isStartedAtDisabled} />
        {errors.startedAt && <p style={{ color: 'red' }}>{errors.startedAt.message}</p>}
      </div>

      <div>
        <label htmlFor="endedAt">독서 종료일</label>
        <input type="date" id="endedAt" {...register('endedAt')} disabled={isEndedAtDisabled} />
        {errors.endedAt && <p style={{ color: 'red' }}>{errors.endedAt.message}</p>}
      </div>
    </section>
  )
}
