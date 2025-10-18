import { ReadingStatus } from '@/types/type'

export const statusOptions = [
  { label: '읽고 싶은 책', value: ReadingStatus.WANT },
  { label: '읽는 중', value: ReadingStatus.READING },
  { label: '읽음', value: ReadingStatus.DONE },
  { label: '보류 중', value: ReadingStatus.HOLD },
]
