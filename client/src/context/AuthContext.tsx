import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: User, token: string) => void
  updateUser: (userData: User) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
  const storedUser = localStorage.getItem("devconnect_user")
  const storedToken = localStorage.getItem("devconnect_token")

  if (storedUser && storedToken) {
    setUser(JSON.parse(storedUser))
    setToken(storedToken)
  }

  setIsLoading(false)
}, [])

  const login = (userData: User, authToken: string) => {
    setUser(userData)
    setToken(authToken)

    localStorage.setItem("devconnect_user", JSON.stringify(userData))
    localStorage.setItem("devconnect_token", authToken)
  }

  const updateUser = (userData: User) => {
  setUser(userData)
  localStorage.setItem("devconnect_user", JSON.stringify(userData))
}

  const logout = () => {
    setUser(null)
    setToken(null)

    localStorage.removeItem("devconnect_user")
    localStorage.removeItem("devconnect_token")
  }

  return (
    <AuthContext.Provider
      value={{
  user,
  token,
  isAuthenticated: Boolean(user && token),
  isLoading,
  login,
  updateUser,
  logout,
}}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider")
  }

  return context
}