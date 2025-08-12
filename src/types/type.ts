export enum ReadingStatus {
  WANT = 'WANT',
  READING = 'READING',
  DONE = 'DONE',
  HOLD = 'HOLD',
}

export type Quote = { text: string; page?: number }

export type StepItem = {
  id: number
  label: string
  component: React.ComponentType
}
