import { useEffect, useState } from 'react'

export function useDelayedPreview<T>(value: T, delay: number) {
  const [data, setData] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return data
}
