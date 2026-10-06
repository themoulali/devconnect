import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

type Developer = {
  id: string
  name: string
  role: string
  location: string
  bio: string
}

const developers: Developer[] = [
  {
    id: "alex-johnson",
    name: "Alex Johnson",
    role: "Python Full Stack Developer",
    location: "Hyderabad, India",
    bio: "Building web applications with Python, Django, React, and REST APIs.",
  },
  {
    id: "sarah-williams",
    name: "Sarah Williams",
    role: "Django Backend Developer",
    location: "Bengaluru, India",
    bio: "Building backend services with Django, REST APIs, PostgreSQL, and Python.",
  },
]

function DeveloperProfile() {
    const { id } = useParams()

    const developer = developers.find((item) => item.id === id)
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

    const [connected, setConnected] = useState(false)
    const { token } = useAuth()

    useEffect(() => {
    const checkConnection = async () => {
        if (!token) {
            return
        }

        const response = await fetch(
            "http://localhost:5000/auth/connections/9f8c92ff-73e5-4884-9296-e184361bb800",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )

        const data = await response.json()

        if (data.data) {
            setConnected(true)
        }
    }

    checkConnection()
}, [token])

    const sendConnectionRequest = async () => {
    if (!token) {
        return
    }

    const response = await fetch("http://localhost:5000/auth/connections", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            receiverId: "9f8c92ff-73e5-4884-9296-e184361bb800",
        }),
    })

    const data = await response.json()

    if (response.ok) {
        setConnected(true)
        console.log(data)
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

        <div className="mt-8 rounded-lg border p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">
            {developer?.name}
          </h2>

          <p className="mt-2 text-gray-600">
            {developer?.role}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            📍 {developer?.location}
          </p>

          <p className="mt-6">
            {developer?.bio}
          </p>

        <div className="mt-8">
            <h3 className="text-lg font-semibold">
                Skills
            </h3>

            <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border px-3 py-1 text-sm">
                    Python
                </span>

                <span className="rounded-full border px-3 py-1 text-sm">
                    Django
                </span>

                <span className="rounded-full border px-3 py-1 text-sm">
                    React
                </span>

                <span className="rounded-full border px-3 py-1 text-sm">
                    REST APIs
                </span>
            </div>
        </div>

        <div className="mt-8">
            <button
                type="button"
                onClick={sendConnectionRequest}
                disabled={connected}
                className="rounded-md bg-black px-5 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
                {connected ? "Request Sent" : "Connect"}
            </button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default DeveloperProfile
