import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { ToastContext } from './toastContext'

interface Toast {
  id: number
  message: string
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null)
  const nextId = useRef(0)
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showToast = useCallback((message: string) => {
    if (timeoutId.current !== null) {
      clearTimeout(timeoutId.current)
    }

    nextId.current += 1
    setToast({ id: nextId.current, message })
    timeoutId.current = setTimeout(() => {
      setToast(null)
      timeoutId.current = null
    }, 2600)
  }, [])

  useEffect(
    () => () => {
      if (timeoutId.current !== null) {
        clearTimeout(timeoutId.current)
      }
    },
    [],
  )

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast && (
        <div className="toast-notification" key={toast.id} role="status" aria-live="polite">
          <span className="toast-check" aria-hidden="true">✓</span>
          <span>{toast.message}</span>
        </div>
      )}
    </ToastContext.Provider>
  )
}
