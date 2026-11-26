import { useCallback, useMemo, useState, type ReactNode } from 'react'
import type { User } from '../types'
import { AuthContext } from './authContext'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = useCallback((username: string, password: string) => {
    if (!username.trim() || password !== '123456') {
      return false
    }
    setUser({ username: username.trim() })
    return true
  }, [])

  const logout = useCallback(() => setUser(null), [])
  const value = useMemo(() => ({ user, login, logout }), [user, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
