import { useEffect, useRef, useState } from 'react'

export function useDelayedPreview<T>(value: T, delay: number) {
  const [data, setData] = useState<T>(value)
  const previousValueRef = useRef(value)

  useEffect(() => {
    if (Object.is(previousValueRef.current, value)) {
      return
    }

    previousValueRef.current = value
    const timer = setTimeout(() => {
      setData(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return data
}
