
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

    if (
      error instanceof Error &&
      error.message === "Invalid email or password"
    ) {
      res.status(401).json({
        success: false,
        data: null,
        message: error.message,
      })

      return
    }

    res.status(500).json({
      success: false,
      data: null,
      message: "Login failed",
    })
  }
})

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    const user = await registerUser({
      name,
      email,
      password,
    })

    res.status(201).json({
      success: true,
      data: user,
      message: "User registered successfully",
    })
  } catch (error) {
    console.error("❌ Registration failed")
    console.error(error)

    if (error instanceof Error && error.message === "Email already registered") {
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
      const user = await db.orm.public.User
        .where({ id: req.userId })
        .first()

      if (!user) {
        res.status(404).json({
          success: false,
          data: null,
          message: "User not found",
        })

        return
      }

      res.status(200).json({
        success: true,
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
        message: "Authenticated user retrieved successfully",
      })
    } catch (error) {
      console.error("❌ Failed to get authenticated user")
      console.error(error)

      res.status(500).json({
        success: false,
        data: null,
        message: "Failed to get user",
      })
    }
  }
)

export default router