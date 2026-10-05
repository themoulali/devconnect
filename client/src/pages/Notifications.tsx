import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext.tsx"

interface Notification {
  id: string
  message: string
  read: boolean
  createdAt: string
  senderId?: string
}

function Notifications() {
  const { user } = useAuth()

  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!user) {
      setIsLoading(false)
      return
    }

    const fetchNotifications = async () => {
      try {
        setIsLoading(true)
        setError("")

        const response = await fetch(
          `http://localhost:5000/notifications/${user.id}`
        )

        if (!response.ok) {
          throw new Error("Failed to fetch notifications")
        }

        const data = await response.json()

        setNotifications(
          Array.isArray(data) ? data : data.value ?? []
        )
      } catch (error) {
        console.error("Failed to fetch notifications:", error)
        setError("Unable to load notifications.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotifications()
  }, [user])

  const markAsRead = async (notificationId: string) => {
    if (!user) {
      return
    }

    try {
      const response = await fetch(
        `http://localhost:5000/notifications/${notificationId}/read`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            receiverId: user.id,
          }),
        }
      )

      if (!response.ok) {
        throw new Error("Failed to mark notification as read")
      }

      setNotifications((currentNotifications) =>
        currentNotifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      )
    } catch (error) {
      console.error(
        "Failed to mark notification as read:",
        error
      )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900">
          Notifications
        </h1>

        <p className="mt-2 text-gray-600">
          Stay updated with your DevConnect activity.
        </p>

        {isLoading && (
          <div className="mt-6 rounded-lg bg-white p-6 shadow">
            <p className="text-gray-500">
              Loading notifications...
            </p>
          </div>
        )}

        {!isLoading && error && (
          <div className="mt-6 rounded-lg bg-white p-6 shadow">
            <p className="text-red-600">
              {error}
            </p>
          </div>
        )}

        {!isLoading &&
          !error &&
          notifications.length === 0 && (
            <div className="mt-6 rounded-lg bg-white p-6 shadow">
              <p className="text-gray-500">
                No notifications yet.
              </p>
            </div>
          )}

        {!isLoading &&
          !error &&
          notifications.length > 0 && (
            <div className="mt-6 space-y-3">
              {notifications.map((notification) => (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() => {
                    if (!notification.read) {
                      markAsRead(notification.id)
                    }
                  }}
                  className={`w-full rounded-lg bg-white p-4 text-left shadow ${
                    notification.read
                      ? ""
                      : "cursor-pointer border-l-4 border-blue-500 hover:bg-gray-50"
                  }`}
                >
                  <p className="text-gray-900">
                    {notification.message}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    {notification.createdAt}
                  </p>

                  {!notification.read && (
                    <p className="mt-2 text-sm font-medium text-blue-600">
                      Unread
                    </p>
                  )}
                </button>
              ))}
            </div>
          )}
      </div>
    </div>
  )
}

export default Notifications