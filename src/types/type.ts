export enum ReadingStatus {
  WANT = 'WANT',
  READING = 'READING',
  DONE = 'DONE',
  HOLD = 'HOLD',
}

export type Quote = { text: string; page?: number }
