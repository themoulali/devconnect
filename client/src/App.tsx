import { useEffect, useState } from "react"
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom"

import Login from "./pages/Login.tsx"
import Register from "./pages/Register.tsx"
import Profile from "./pages/Profile.tsx"
import Developers from "./pages/Developers.tsx"
import DeveloperProfile from "./pages/DeveloperProfile.tsx"
import ProtectedRoute from "./routes/ProtectedRoute.tsx"
import Notifications from "./pages/Notifications.tsx"
import { useAuth } from "./context/AuthContext.tsx"

function Navigation() {
  const { user } = useAuth()
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    if (!user) {
      setUnreadCount(0)
      return
    }

    const fetchUnreadNotifications = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/notifications/${user.id}/unread`
        )

        if (!response.ok) {
          throw new Error("Failed to fetch unread notifications")
        }

        const data = await response.json()

        setUnreadCount(
          Array.isArray(data) ? data.length : 0
        )
      } catch (error) {
        console.error(
          "Failed to fetch unread notifications:",
          error
        )
        setUnreadCount(0)
      }
    }

    fetchUnreadNotifications()

    const handleFocus = () => {
      fetchUnreadNotifications()
    }

    window.addEventListener("focus", handleFocus)

    return () => {
      window.removeEventListener("focus", handleFocus)
    }
  }, [user])

  return (
    <nav className="border-b bg-white px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link
          to="/"
          className="text-xl font-bold"
        >
          DevConnect
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-sm font-medium text-gray-700 hover:text-black"
          >
            Home
          </Link>

          <Link
            to="/profile"
            className="text-sm font-medium text-gray-700 hover:text-black"
          >
            Profile
          </Link>

          <Link
            to="/developers"
            className="text-sm font-medium text-gray-700 hover:text-black"
          >
            Developers
          </Link>

          <Link
            to="/notifications"
            className="text-sm font-medium text-gray-700 hover:text-black"
          >
            🔔 Notifications

            {unreadCount > 0 && (
              <span className="ml-2 rounded-full bg-red-500 px-2 py-1 text-xs text-white">
                {unreadCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          DevConnect
        </h1>

        <p className="mt-4">
          Welcome to DevConnect
        </p>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={
              <>
                <Navigation />
                <Home />
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>
                <Navigation />
                <Profile />
              </>
            }
          />

          <Route
            path="/developers"
            element={
              <>
                <Navigation />
                <Developers />
              </>
            }
          />

          <Route
            path="/developers/alex-johnson"
            element={
              <>
                <Navigation />
                <DeveloperProfile />
              </>
            }
          />

          <Route
            path="/notifications"
            element={
              <>
                <Navigation />
                <Notifications />
              </>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App