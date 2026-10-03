import { Link } from "react-router-dom"

type Developer = {
  name: string
  role: string
  bio: string
}

const developers: Developer[] = [
  {
    name: "Alex Johnson",
    role: "Python Full Stack Developer",
    bio: "Building web applications with Python, Django, React, and REST APIs.",
  },
]

function Developers() {
  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">
          Developers
        </h1>

        <p className="mt-2 text-gray-600">
          Discover developers on DevConnect.
        </p>

        <div className="mt-8">
          {developers.map((developer) => (
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
          ))}
        </div>
      </div>
    </div>
  )
}

export default Developers