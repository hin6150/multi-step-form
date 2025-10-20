export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function getErrorMessage(obj: unknown, path: string): string | undefined {
  return path.split('.').reduce<any>((acc, key) => acc?.[key], obj)?.message
}
