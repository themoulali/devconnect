import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import API_URL from "../api"

function Profile() {
  const { user, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user?.name || "")
  const [role, setRole] = useState("Python Full Stack Developer")
  const [location, setLocation] = useState("Hyderabad, India")
  const [about, setAbout] = useState(
  "I am a Python Full Stack Developer interested in building modern web applications using Python, Django, React, and REST APIs."
)
const saveProfile = async () => {
  try {
    const token = localStorage.getItem("devconnect_token")

    const response = await fetch(`${API_URL}/auth/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || "Failed to update profile")
    }

    console.log("Profile updated successfully:", result)

    updateUser(result.data)

    setIsEditing(false)
  } catch (error) {
    console.error("Profile update failed:", error)
  }
}

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-4xl">

        {/* Profile Header */}
        <div className="rounded-2xl bg-white p-8 shadow-md">
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-blue-600 text-4xl font-bold text-white">
              {user?.name?.charAt(0).toUpperCase() || "M"}
            </div>

            <div className="flex-1 text-center sm:text-left">
              {isEditing ? (
                <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-2xl font-bold text-gray-900"
                />
              ) : (
                <h1 className="text-3xl font-bold text-gray-900">
                    {name || "User"}
                </h1>
              )}

              {isEditing ? (
                <input
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                    className="mt- 2 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700"
                />
              ) : (
                <p className="mt-2 text-lg text-gray-600">
                    {role}
                </p>
              )}

              <p className="mt-2 text-sm text-gray-500">
                {user?.email || "No email available"}
              </p>

              {isEditing ? (
  <div className="mt-4 flex gap-3">
    <button
      onClick={() => setIsEditing(false)}
      className="rounded-lg bg-gray-500 px-5 py-2 text-sm font-medium text-white hover:bg-gray-600"
    >
      Cancel
    </button>

    <button
      onClick={saveProfile}
      className="rounded-lg bg-green-600 px-5 py-2 text-sm font-medium text-white hover:bg-green-700"
    >
      Save Changes
    </button>
        </div>
    ) : (
    <button
        onClick={() => setIsEditing(true)}
        className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
    >
        Edit Profile
    </button>
    )}
            
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-6 rounded-2xl bg-white p-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900">
            About Me
          </h2>

          {isEditing ? (
            <textarea
                value={about}
                onChange={(event) => setAbout(event.target.value)}
                rows={4}
                className="mt-4 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700"
            />
          ) : (
            <p className="mt-4 text-gray-600">
                {about}
            </p>
          )}

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">
                Role
              </p>
              <p className="mt-1 font-medium text-gray-900">
                Python Full Stack Developer
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Location
              </p>
              {isEditing ? (
                <input
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700"
                />
              ) : (
                <p className="mt-1 font-medium text-gray-900">
                    {location}
                </p>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Email
              </p>
              <p className="mt-1 font-medium text-gray-900">
                {user?.email || "No email available"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Profile Status
              </p>
              <p className="mt-1 font-medium text-green-600">
                Active
              </p>
            </div>
          </div>
        </div>

                {/* Skills Section */}
        <div className="mt-6 rounded-2xl bg-white p-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900">
            Skills
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              "Python",
              "Django",
              "Django REST Framework",
              "React",
              "JavaScript",
              "TypeScript",
              "HTML5",
              "CSS3",
              "SQL",
              "PostgreSQL",
              "Git",
              "REST APIs",
            ].map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

                {/* Projects Section */}
        <div className="mt-6 rounded-2xl bg-white p-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900">
            Projects
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">

            {/* Project 1 */}
            <div className="rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900">
                E-Commerce Platform
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                A full-stack e-commerce platform with product browsing,
                shopping cart, user authentication, and order management.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  React
                </span>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  Node.js
                </span>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  JavaScript
                </span>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  Tailwind CSS
                </span>
              </div>
            </div>

            {/* Project 2 */}
            <div className="rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Movie Streaming Website
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                A movie streaming interface with search, category filters,
                watchlist functionality, and user authentication.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  React
                </span>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  JavaScript
                </span>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  HTML5
                </span>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  Tailwind CSS
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Profile