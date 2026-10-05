import db from "../db.js"

export async function createNotification(
  receiverId: string,
  message: string,
  senderId?: string
) {
  const notification = await db.orm.public.Notification.create({
    receiverId,
    message,
    senderId,
  })

  return notification
}

export async function getNotifications(receiverId: string) {
  const notifications = await db.orm.public.Notification
    .where({
      receiverId,
    })

  return notifications
}

export async function getUnreadNotifications(receiverId: string) {
  const notifications = await db.orm.public.Notification
    .where({
      receiverId,
      read: false,
    })

  return notifications
}

export async function markNotificationAsRead(
  notificationId: string,
  receiverId: string
) {
  const notification = await db.orm.public.Notification
    .where({
      id: notificationId,
      receiverId,
    })
    .first()

  if (!notification) {
    throw new Error("Notification not found")
  }

  const updatedNotification = await db.orm.public.Notification
    .where({
      id: notificationId,
    })
    .update({
      read: true,
    })

  return updatedNotification
}