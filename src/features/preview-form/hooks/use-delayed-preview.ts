import { useEffect, useRef, useState } from 'react'

export function useDelayedPreview<T>(value: T, delay: number) {
  const [data, setData] = useState<T>(value)
  const [isPending, setIsPending] = useState(true)
  const hasInitializedRef = useRef(false)
  const previousValueRef = useRef(value)

  useEffect(() => {
    if (hasInitializedRef.current && Object.is(previousValueRef.current, value)) {
      return
    }

    previousValueRef.current = value
    if (!hasInitializedRef.current) {
      setIsPending(true)
    }

    const timer = setTimeout(() => {
      setData(value)
      if (!hasInitializedRef.current) {
        setIsPending(false)
        hasInitializedRef.current = true
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return { data, isPending }
}
