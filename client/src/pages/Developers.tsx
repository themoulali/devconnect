import { Link } from "react-router-dom"
import { useState } from "react"

type Developer = {
  name: string
  role: string
  location: string
  bio: string
}

const developers: Developer[] = [
  {
    name: "Alex Johnson",
    role: "Python Full Stack Developer",
    location: "Hyderabad, India",
    bio: "Building web applications with Python, Django, React, and REST APIs.",
  },
  {
    name: "Sarah Williams",
    role: "Django Backend Developer",
    location: "Bengaluru, India",
    bio: "Building backend services with Django, REST APIs, PostgreSQL, and Python.",
  },
]

function Developers() {
  const [search, setSearch] = useState("")

  const normalizedSearch = search.toLowerCase()

const filteredDevelopers = developers.filter((developer) =>
  developer.name.toLowerCase().includes(normalizedSearch) ||
  developer.role.toLowerCase().includes(normalizedSearch) ||
  developer.location.toLowerCase().includes(normalizedSearch) ||
  developer.bio.toLowerCase().includes(normalizedSearch)
)

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">
          Developers
        </h1>

        <p className="mt-2 text-gray-600">
          Discover developers on DevConnect.
        </p>

        <div className="mt-6">
          <label
            htmlFor="developer-search"
            className="mb-2 block text-sm font-medium"
          >
            Search developers
          </label>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>

            <input
              id="developer-search"
              type="text"
              placeholder="Search by name, role, skill, or location..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-md border bg-gray-50 px-4 py-2 pl-10 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {search && (
            <button
              type="button"
              aria-label="Clear developer search"
              onClick={() => setSearch("")}
              className="mt-2 rounded-md border px-3 py-1 text-sm"
            >
              Clear
            </button>
          )}
        </div>

        <div className="mt-8 space-y-4">
          <p className="mb-4 text-sm text-gray-600">
            {filteredDevelopers.length}{" "}
            {filteredDevelopers.length === 1 ? "developer" : "developers"} found
          </p>

          {filteredDevelopers.length === 0 ? (
              <div className="rounded-lg border p-6 text-center">
                <p className="font-medium">
                  No developers found.
                </p>

                <p className="mt-2 text-sm text-gray-600">
                  Try a different name, role, skill, or location.
                </p>
              </div>
            ) : (
              filteredDevelopers.map((developer) => (
                  <div
                    key={developer.name}
                    className="rounded-lg border p-6 shadow-sm"
                  >
                    <h2 className="text-xl font-semibold">
                      {developer.name}
                    </h2>

                    <p className="mt-1 text-gray-600">
                      {developer.role}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      📍 {developer.location}
                    </p>

                    <p className="mt-4">
                      {developer.bio}
                    </p>

                    <Link
                      to="/developers/alex-johnson"
                      className="mt-6 inline-block rounded-md bg-black px-4 py-2 text-white"
                    >
                      View Profile
                    </Link>
                  </div>
                ))
            )}
        </div>
      </div>
    </div>
  )
}

export default Developers