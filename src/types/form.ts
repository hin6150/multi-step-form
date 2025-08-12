export enum ReadingStatus {
  WANT = 'WANT',
  READING = 'READING',
  DONE = 'DONE',
  HOLD = 'HOLD',
}

export type Quote = { text: string; page?: number }

export type FormValues = {
  bookTitle: string
  author: string
  publishedAt: string // yyyy-mm-dd
  totalPages: number
  status: ReadingStatus
  startedAt?: string
  endedAt?: string
  recommend?: boolean
  rating?: number // 0..5 step 0.5
  review?: string
  quotes: Quote[]
  isPublic: boolean
}
