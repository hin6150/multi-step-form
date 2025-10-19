import { z } from 'zod'
import { ReadingStatus } from '@/types/type'

export const recommendationValues = ['RECOMMEND', 'NOT_RECOMMEND'] as const
export type RecommendationValue = (typeof recommendationValues)[number]

// 1단계의 공통 필드
const baseBookSchema = z.object({
  bookTitle: z.string().min(1, '도서 제목을 입력해주세요.'),
  author: z.string().min(1, '저자를 입력해주세요.'),
  publisher: z.string().min(1, '출판사를 입력해주세요.'),
  publishedAt: z.string().min(1, '출판일을 선택해주세요.'),
})

// 2단계 필드
const reviewSchema = z.object({
  isRecommended: z.enum(recommendationValues, { error: '도서 추천 여부를 선택해주세요.' }),
  rating: z
    .number({ error: '별점을 선택해주세요.' })
    .min(1, '별점은 최소 1점 이상 선택해주세요.')
    .max(5, '별점은 최대 5점입니다.')
    .refine((value) => Number.isFinite(value) && Number.isInteger(value * 2), {
      error: '별점은 0.5점 단위로 입력해주세요.',
    }),
})

const reflectionSchema = z
  .object({
    rating: reviewSchema.shape.rating.optional(),
    reflection: z
      .string()
      .max(1000, '독후감은 최대 1000자까지 입력할 수 있습니다.')
      .optional(),
  })
  .superRefine((data, ctx) => {
    const shouldRequireEssay = data.rating === 1 || data.rating === 5
    const trimmedLength = data.reflection?.trim().length ?? 0

    if (shouldRequireEssay && trimmedLength < 100) {
      ctx.addIssue({
        code: 'custom',
        message: '별점이 1점 또는 5점이라면 최소 100자 이상 작성해주세요.',
        path: ['reflection'],
      })
    }
  })

// --- 1단계: 상태별 스키마 정의 (discriminatedUnion) ---
const wantSchema = baseBookSchema.extend({
  status: z.literal(ReadingStatus.WANT),
  startedAt: z
    .string()
    .optional()
    .refine((val) => !val, { error: '읽고 싶은 책은 시작일을 입력할 수 없어요.' }),
  endedAt: z
    .string()
    .optional()
    .refine((val) => !val, { error: '읽고 싶은 책은 종료일을 입력할 수 없어요.' }),
})

const readingSchema = baseBookSchema.extend({
  status: z.literal(ReadingStatus.READING),
  startedAt: z.string({ error: '시작일을 입력해 주세요.' }).min(1, '시작일을 입력해 주세요.'),
  endedAt: z
    .string()
    .optional()
    .refine((val) => !val, { error: '종료일은 입력할 수 없어요' }),
})

const holdSchema = baseBookSchema.extend({
  status: z.literal(ReadingStatus.HOLD),
  startedAt: z.string({ error: '시작일을 입력해 주세요.' }).min(1, '시작일을 입력해 주세요.'),
  endedAt: z
    .string()
    .optional()
    .refine((val) => !val, { error: '종료일은 입력할 수 없어요' }),
})

const doneSchema = baseBookSchema.extend({
  status: z.literal(ReadingStatus.DONE),
  startedAt: z.string({ error: '시작일을 입력해 주세요.' }).min(1, '시작일을 입력해 주세요.'),
  endedAt: z.string({ error: '종료일을 입력해 주세요.' }).min(1, '종료일을 입력해 주세요.'),
})

// --- 단계별 스키마 Export ---
export const step1Schema = z
  .discriminatedUnion('status', [wantSchema, readingSchema, holdSchema, doneSchema])
  .superRefine((data, ctx) => {
    const { startedAt, endedAt, publishedAt } = data

    // 시작일-종료일 순서 검사 (DONE 상태일 때만 의미 있음)
    if (startedAt && endedAt && new Date(startedAt) > new Date(endedAt)) {
      ctx.addIssue({ code: 'custom', message: '독서 시작일은 종료일보다 이후일 수 없습니다.', path: ['startedAt'] })
      ctx.addIssue({ code: 'custom', message: '독서 종료일은 시작일보다 이전일 수 없습니다.', path: ['endedAt'] })
    }

    // 시작일-출판일 순서 검사 (WANT 아닐 때 의미 있음)
    if (startedAt && publishedAt && new Date(startedAt) < new Date(publishedAt)) {
      ctx.addIssue({ code: 'custom', message: '독서 시작일은 출판일보다 이전일 수 없습니다.', path: ['startedAt'] })
    }
  })

// 2단계 스키마
export const step2Schema = reviewSchema

// 3단계 스키마
export const step3Schema = reflectionSchema

// --- 최종 스키마 (전체 제출용) ---
export const formSchema = step1Schema.and(step2Schema).and(step3Schema)

// 최종 FormValues 타입
export type FormValues = z.infer<typeof formSchema>
