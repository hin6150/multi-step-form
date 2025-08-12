import { z } from 'zod'
import { ReadingStatus } from '@/types/form'

export const formSchema = z
  .object({
    bookTitle: z.string().min(1, '도서 제목을 입력해주세요.'),
    author: z.string().min(1, '저자를 입력해주세요.'),
    publisher: z.string().min(1, '출판사를 입력해주세요.'),
    publishedAt: z.string().min(1, '출판일을 선택해주세요.'),
    status: z.nativeEnum(ReadingStatus),
    startedAt: z.string().optional(),
    endedAt: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { startedAt, endedAt, publishedAt } = data

    if (startedAt && endedAt && new Date(startedAt) > new Date(endedAt)) {
      ctx.addIssue({ code: 'custom', message: '독서 시작일은 종료일보다 이후일 수 없습니다.', path: ['endedAt'] })
    }
    if (startedAt && publishedAt && new Date(startedAt) < new Date(publishedAt)) {
      ctx.addIssue({ code: 'custom', message: '독서 시작일은 출판일보다 이전일 수 없습니다.', path: ['startedAt'] })
    }
  })

export type FormValues = z.infer<typeof formSchema>
