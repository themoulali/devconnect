import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext.tsx"
import API_URL from "../api"

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
          `${API_URL}/notifications/${user.id}`
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
        `${API_URL}/notifications/${notificationId}/read`,
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

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow">
          <p className="text-gray-500">
            Loading notifications...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Notifications
            </h1>

            <p className="mt-2 text-gray-600">
              Stay updated with your DevConnect activity.
            </p>
          </div>

          {unreadCount > 0 && (
            <div className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              {unreadCount} unread
            </div>
          )}
        </div>

        {error && (
          <div className="mt-6 rounded-lg bg-white p-6 shadow">
            <p className="text-red-600">
              {error}
            </p>
          </div>
        )}

        {!error && notifications.length === 0 && (
          <div className="mt-6 rounded-lg bg-white p-6 text-center shadow">
            <p className="font-medium text-gray-700">
              No notifications yet.
            </p>

            <p className="mt-2 text-gray-500">
              New connection requests and activity will appear here.
            </p>
          </div>
        )}

        {!error && notifications.length > 0 && (
          <div className="mt-6 space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`rounded-lg bg-white p-4 shadow ${
                  notification.read
                    ? "border border-gray-100"
                    : "border-l-4 border-blue-500"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p
                      className={
                        notification.read
                          ? "text-gray-700"
                          : "font-medium text-gray-900"
                      }
                    >
                      {notification.message}
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                      {notification.createdAt}
                    </p>
                  </div>

                  {!notification.read && (
                    <span className="shrink-0 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
                      Unread
                    </span>
                  )}
                </div>

                {!notification.read && (
                  <button
                    type="button"
                    onClick={() => markAsRead(notification.id)}
                    className="mt-4 rounded-md border px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Notifications
