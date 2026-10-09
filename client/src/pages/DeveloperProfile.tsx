import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import API_URL from "../api"

type Developer = {
  id: string
  userId: string
  name: string
  role: string
  location: string
  bio: string
}

const developers: Developer[] = [
  {
    id: "alex-johnson",
    userId: "0e466e9d-168f-4e47-b935-faa26a2cbd40",
    name: "Alex Johnson",
    role: "Python Full Stack Developer",
    location: "Hyderabad, India",
    bio: "Building web applications with Python, Django, React, and REST APIs.",
  },
  {
    id: "sarah-williams",
    userId: "daa900c2-74d3-4de6-be6f-20dca0714f80",
    name: "Sarah Williams",
    role: "Django Backend Developer",
    location: "Bengaluru, India",
    bio: "Building backend services with Django, REST APIs, PostgreSQL, and Python.",
  },
]

function DeveloperProfile() {
  const { id } = useParams()
  const { token } = useAuth()

  const [connectionStatus, setConnectionStatus] = useState<
    "NONE" | "PENDING" | "ACCEPTED"
  >("NONE")

  const developer = developers.find((item) => item.id === id)

  useEffect(() => {
    const checkConnection = async () => {
      if (!token || !developer) {
        return
      }

      const response = await fetch(
        `${API_URL}/auth/connections/${developer.userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (data.data) {
        setConnectionStatus(data.data.status)
      }
    }

    checkConnection()
  }, [token, developer])

  if (!developer) {
    return (
      <div className="min-h-screen p-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold">
            Developer Not Found
          </h1>

          <Link
            to="/developers"
            className="mt-4 inline-block text-sm underline"
          >
            ← Back to Developers
          </Link>
        </div>
      </div>
    )
  }
  const sendConnectionRequest = async () => {
    if (!token) {
      return
    }

    const response = await fetch(
      `${API_URL}/auth/connections`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiverId: developer.userId,
        }),
      }
    )

    const data = await response.json()

    if (response.ok) {
      setConnectionStatus("PENDING")
    } else {
      console.error(data)
    }
  }
  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold">
          Developer Profile
        </h1>

        <Link
            to="/developers"
            className="mt-4 inline-block text-sm underline"
        >
            ← Back to Developers
        </Link>

                <div className="mt-8 overflow-hidden rounded-lg border bg-white shadow-sm">
          <div className="border-b bg-gray-50 px-6 py-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gray-900 text-3xl font-bold text-white">
                {developer.name.charAt(0)}
              </div>

              <div>
                <h2 className="text-3xl font-bold">
                  {developer.name}
                </h2>

                <p className="mt-2 text-lg text-gray-600">
                  {developer.role}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  📍 {developer.location}
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-8">
            <section>
              <h3 className="text-xl font-semibold">
                About
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                {developer.bio}
              </p>
            </section>

            <section className="mt-8">
              <h3 className="text-xl font-semibold">
                Skills
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border bg-gray-50 px-4 py-2 text-sm">
                  Python
                </span>

                <span className="rounded-full border bg-gray-50 px-4 py-2 text-sm">
                  Django
                </span>

                <span className="rounded-full border bg-gray-50 px-4 py-2 text-sm">
                  React
                </span>

                <span className="rounded-full border bg-gray-50 px-4 py-2 text-sm">
                  REST APIs
                </span>
              </div>
            </section>

            <section className="mt-8 border-t pt-6">
              <button
                type="button"
                onClick={sendConnectionRequest}
                disabled={connectionStatus !== "NONE"}
                className="rounded-md bg-black px-5 py-2.5 font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {connectionStatus === "PENDING"
                  ? "Request Sent"
                  : connectionStatus === "ACCEPTED"
                  ? "Connected"
                  : "Connect"}
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeveloperProfile
