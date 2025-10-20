export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function getErrorMessage(obj: unknown, path: string) {
  return path.split('.').reduce<any>((acc, key) => acc?.[key], obj)?.message
}

export function maxDate(date1: string | undefined, date2: string | undefined) {
  if (!date1) return date2
  if (!date2) return date1
  return date1 > date2 ? date1 : date2
}
