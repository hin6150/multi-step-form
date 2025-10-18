import type { ReactNode } from 'react'

type SwitchCasesProps<TKey extends PropertyKey> = {
  value?: TKey | null
  cases: Partial<Record<TKey, ReactNode>>
  fallback?: ReactNode
}

export function SwitchCases<TKey extends PropertyKey>({ value, cases, fallback = null }: SwitchCasesProps<TKey>) {
  if (value === undefined || value === null) return fallback ?? null
  return (cases[value] ?? fallback) ?? null
}
