import { z } from 'zod'
import { ReadingStatus } from '@/types/type'

export const formSchema = z
  .object({
    bookTitle: z.string().min(1, '도서 제목을 입력해주세요.'),
    author: z.string().min(1, '저자를 입력해주세요.'),
    publisher: z.string().min(1, '출판사를 입력해주세요.'),
    publishedAt: z.string().min(1, '출판일을 선택해주세요.'), // 기본 유효성 검사 유지
    status: z.nativeEnum(ReadingStatus),
    startedAt: z.string().optional(),
    endedAt: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { startedAt, endedAt, publishedAt, status } = data

    // 시작일-종료일 순서 검사
    if (startedAt && endedAt && new Date(startedAt) > new Date(endedAt)) {
      ctx.addIssue({ code: 'custom', message: '독서 시작일은 종료일보다 이후일 수 없습니다.', path: ['startedAt'] }) // startedAt 또는 endedAt 둘 다 가능
      ctx.addIssue({ code: 'custom', message: '독서 종료일은 시작일보다 이전일 수 없습니다.', path: ['endedAt'] })
    }

    // 시작일-출판일 순서 검사
    if (startedAt && publishedAt && new Date(startedAt) < new Date(publishedAt)) {
      ctx.addIssue({ code: 'custom', message: '독서 시작일은 출판일보다 이전일 수 없습니다.', path: ['startedAt'] })
    }

    // 상태(status)에 따른 startedAt, endedAt 유효성 검사 및 필수 여부
    switch (status) {
      case ReadingStatus.WANT:
        // WANT 상태일 때는 startedAt, endedAt 값이 있으면 안됨 (optional 이지만 값이 있으면 에러)
        if (startedAt) {
          ctx.addIssue({ code: 'custom', message: '읽고 싶은 책은 시작일을 입력할 수 없어요.', path: ['startedAt'] })
        }
        if (endedAt) {
          ctx.addIssue({ code: 'custom', message: '읽고 싶은 책은 종료일을 입력할 수 없어요.', path: ['endedAt'] })
        }
        break
      case ReadingStatus.READING:
      case ReadingStatus.HOLD:
        // READING, HOLD 상태일 때는 startedAt이 필수, endedAt 값이 있으면 안됨
        if (!startedAt) {
          ctx.addIssue({ code: 'custom', message: '시작일을 입력해 주세요.', path: ['startedAt'] })
        }
        if (endedAt) {
          ctx.addIssue({ code: 'custom', message: '종료일은 입력하면 안 돼요.', path: ['endedAt'] })
        }
        break
      case ReadingStatus.DONE:
        // DONE 상태일 때는 startedAt, endedAt 둘 다 필수
        if (!startedAt) {
          ctx.addIssue({ code: 'custom', message: '시작일을 입력해 주세요.', path: ['startedAt'] })
        }
        if (!endedAt) {
          ctx.addIssue({ code: 'custom', message: '종료일을 입력해 주세요.', path: ['endedAt'] })
        }
        break
      default:
        break
    }
  })

export type FormValues = z.infer<typeof formSchema>
