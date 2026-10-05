
import "dotenv/config"
import {
  authenticateToken,
  type AuthenticatedRequest,
} from "./auth.middleware.js"
import { Router } from "express"
import db from "../db.js"
import {
  registerUser,
  loginUser,
} from "./auth.service.js"
import {
  getProfile,
  updateProfile,
} from "../services/profile.service.js"
import {
  sendConnectionRequest,
  getConnection,
  acceptConnectionRequest,
} from "../services/connection.service.js"

const router = Router()

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const result = await loginUser(email, password)

    res.status(200).json({
      success: true,
      data: result,
      message: "Login successful",
    })
  } catch (error) {
    console.error("❌ Login failed")
    console.error(error)

    res.status(401).json({
      success: false,
      data: null,
      message: "Invalid email or password",
    })
  }
})

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    const result = await registerUser({
      name,
      email,
      password,
    })

    res.status(201).json({
      success: true,
      data: result,
      message: "Registration successful",
    })
  } catch (error) {
    console.error("❌ Registration failed")
    console.error(error)

    if (
      error instanceof Error &&
      error.message === "Email already registered"
    ) {
      res.status(409).json({
        success: false,
        data: null,
        message: error.message,
      })

      return
    }

    res.status(500).json({
      success: false,
      data: null,
      message: "Registration failed",
    })
  }
})

router.get(
  "/me",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      const user = await getProfile(req.userId as string)

      res.status(200).json({
        success: true,
        data: user,
        message: "Profile retrieved successfully",
      })
    } catch (error) {
      console.error("❌ Failed to get profile")
      console.error(error)

      if (error instanceof Error && error.message === "User not found") {
        res.status(404).json({
          success: false,
          data: null,
          message: error.message,
        })

        return
      }

      res.status(500).json({
        success: false,
        data: null,
        message: "Failed to get profile",
      })
    }
  }
)

router.put(
  "/me",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      const { name } = req.body

      const user = await updateProfile(req.userId as string, {
        name,
      })

      res.status(200).json({
        success: true,
        data: user,
        message: "Profile updated successfully",
      })
    } catch (error) {
      console.error("❌ Failed to update profile")
      console.error(error)

      if (error instanceof Error && error.message === "User not found") {
        res.status(404).json({
          success: false,
          data: null,
          message: error.message,
        })

        return
      }

      res.status(500).json({
        success: false,
        data: null,
        message: "Failed to update profile",
      })
    }
  }
)

router.post(
  "/connections",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      const { receiverId } = req.body

      const connection = await sendConnectionRequest(
        req.userId as string,
        receiverId
      )

      res.status(201).json({
        success: true,
        data: connection,
        message: "Connection request sent",
      })
    } catch (error) {
      console.error("❌ Failed to send connection request")
      console.error(error)

      if (
        error instanceof Error &&
        error.message === "Cannot connect with yourself"
      ) {
        res.status(400).json({
          success: false,
          data: null,
          message: error.message,
        })

        return
      }

      if (
        error instanceof Error &&
        error.message === "Connection already exists"
      ) {
        res.status(409).json({
          success: false,
          data: null,
          message: error.message,
        })

        return
      }

      res.status(500).json({
        success: false,
        data: null,
        message: "Failed to send connection request",
      })
    }
  }
)

export default router

router.get(
  "/connections/:receiverId",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      const connection = await getConnection(
        req.userId as string,
        req.params.receiverId as string
      )

      res.status(200).json({
        success: true,
        data: connection,
        message: "Connection retrieved successfully",
      })
    } catch (error) {
      console.error("❌ Failed to get connection")
      console.error(error)

      res.status(500).json({
        success: false,
        data: null,
        message: "Failed to get connection",
      })
    }
  }
)

router.put(
  "/connections/:connectionId/accept",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      const connection = await acceptConnectionRequest(
        req.params.connectionId as string,
        req.userId as string
      )

      res.status(200).json({
        success: true,
        data: connection,
        message: "Connection request accepted",
      })
    } catch (error) {
      console.error("❌ Failed to accept connection request")
      console.error(error)

      if (
        error instanceof Error &&
        error.message === "Pending connection request not found"
      ) {
        res.status(404).json({
          success: false,
          data: null,
          message: error.message,
        })

        return
      }

      res.status(500).json({
        success: false,
        data: null,
        message: "Failed to accept connection request",
      })
    }
  }
)