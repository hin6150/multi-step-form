export enum ReadingStatus {
  WANT = 'WANT',
  READING = 'READING',
  DONE = 'DONE',
  HOLD = 'HOLD',
}

export type Quote = { text: string; page?: number }

export type FormValues = {
  // Step 1
  bookTitle: string
  author: string
  publisher: string
  publishedAt: string
  totalPages: number
  status: ReadingStatus
  startedAt?: string
  endedAt?: string

  // Step 2
  recommend?: boolean
  rating?: number

  // Step 3
  review?: string

  // Step 4
  quotes: Quote[]

  // Step 5
  isPublic: boolean
}
