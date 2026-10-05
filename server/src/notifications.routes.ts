import { Router } from "express"
import {
  getNotifications,
  getUnreadNotifications,
  markNotificationAsRead,
} from "./services/notification.service.js"

const router = Router()

router.get("/:userId", async (req, res) => {
  try {
    const notifications = await getNotifications(req.params.userId)
    res.json(notifications)
  } catch (error) {
    res.status(500).json({
      message: "Failed to get notifications",
    })
  }
})

router.get("/:userId/unread", async (req, res) => {
  try {
    const notifications = await getUnreadNotifications(req.params.userId)
    res.json(notifications)
  } catch (error) {
    res.status(500).json({
      message: "Failed to get unread notifications",
    })
  }
})

router.patch("/:notificationId/read", async (req, res) => {
  try {
    const notification = await markNotificationAsRead(
      req.params.notificationId,
      req.body.receiverId
    )

    res.json(notification)
  } catch (error) {
    res.status(404).json({
      message: "Notification not found",
    })
  }
})

export default router