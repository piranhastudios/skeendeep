"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { HttpTypes } from "@medusajs/types"

export interface User {
  id: string
  email: string
  name: string
  first_name?: string
  last_name?: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  customer: HttpTypes.StoreCustomer | null
  isAuthenticated: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  refreshAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [customer, setCustomer] = useState<HttpTypes.StoreCustomer | null>(null)
  const [loading, setLoading] = useState(true)

  const updateUserState = useCallback((customerData: HttpTypes.StoreCustomer) => {
    setCustomer(customerData)
    setUser({
      id: customerData.id,
      email: customerData.email,
      name: `${customerData.first_name || ''} ${customerData.last_name || ''}`.trim(),
      first_name: customerData.first_name || undefined,
      last_name: customerData.last_name || undefined,
    })
  }, [])

  const refreshAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'include',
      })

      if (response.ok) {
        const data = await response.json()
        if (data.customer) {
          updateUserState(data.customer)
        } else {
          setUser(null)
          setCustomer(null)
        }
      } else {
        setUser(null)
        setCustomer(null)
      }
    } catch (error) {
      console.error("Error refreshing authentication:", error)
      setUser(null)
      setCustomer(null)
    }
  }, [updateUserState])

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true)
        await refreshAuth()
      } catch (error) {
        console.error("Error checking authentication:", error)
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [refreshAuth])

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true)
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      const result = await response.json()
      
      if (!response.ok) {
        return { success: false, error: result.message || 'Login failed' }
      }

      // Refresh auth state after successful login
      await refreshAuth()

      return { success: true }
    } catch (error: any) {
      console.error("Login error:", error)
      return { success: false, error: error.message || "Login failed" }
    } finally {
      setLoading(false)
    }
  }, [refreshAuth])

  const register = useCallback(async (firstName: string, lastName: string, email: string, password: string) => {
    try {
      setLoading(true)

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
          first_name: firstName,
          last_name: lastName,
          email, 
          password 
        }),
      })

      const result = await response.json()
      
      if (!response.ok) {
        return { success: false, error: result.message || 'Registration failed' }
      }

      // Refresh auth state after successful registration
      await refreshAuth()

      return { success: true }
    } catch (error: any) {
      console.error("Registration error:", error)
      return { success: false, error: error.message || "Registration failed" }
    } finally {
      setLoading(false)
    }
  }, [refreshAuth])

  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
      
      setUser(null)
      setCustomer(null)
    } catch (error) {
      console.error("Logout error:", error)
      // Still clear local state even if API call fails
      setUser(null)
      setCustomer(null)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        customer,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
