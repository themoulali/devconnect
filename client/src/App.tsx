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
  const { user, logout } = useAuth()
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

          {!user ? (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-black"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Register
              </Link>
            </>
          ) : (
            <>
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

              <button
                onClick={logout}
                className="text-sm font-medium text-gray-700 hover:text-black"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

function Home() {
  const { user } = useAuth()

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900">
          Connect. Collaborate. Grow.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          DevConnect helps developers discover other developers,
          build meaningful connections, and grow together.
        </p>

        {!user && (
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/register"
              className="rounded-md bg-black px-6 py-3 font-medium text-white hover:bg-gray-800"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="rounded-md border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-100"
            >
              Login
            </Link>
          </div>
        )}

        {user && (
          <div className="mt-8">
            <Link
              to="/developers"
              className="rounded-md bg-black px-6 py-3 font-medium text-white hover:bg-gray-800"
            >
              Discover Developers
            </Link>
          </div>
        )}
      </section>

      {/* How DevConnect Works */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          How DevConnect Works
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-6 text-center shadow-sm">
            <div className="text-3xl">👤</div>

            <h3 className="mt-4 text-xl font-semibold">
              Create Your Profile
            </h3>

            <p className="mt-3 text-gray-600">
              Create your developer profile and showcase your
              skills, experience, and projects.
            </p>
          </div>

          <div className="rounded-lg border bg-white p-6 text-center shadow-sm">
            <div className="text-3xl">🔎</div>

            <h3 className="mt-4 text-xl font-semibold">
              Discover Developers
            </h3>

            <p className="mt-3 text-gray-600">
              Search and discover developers based on their
              name, role, skills, and location.
            </p>
          </div>

          <div className="rounded-lg border bg-white p-6 text-center shadow-sm">
            <div className="text-3xl">🤝</div>

            <h3 className="mt-4 text-xl font-semibold">
              Build Connections
            </h3>

            <p className="mt-3 text-gray-600">
              Send connection requests and build your professional
              developer network.
            </p>
          </div>
        </div>
      </section>
    </main>
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

        <Route
          path="/"
          element={
            <>
              <Navigation />
              <Home />
            </>
          }
        />

        <Route element={<ProtectedRoute />}>
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
            path="/developers/:id"
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