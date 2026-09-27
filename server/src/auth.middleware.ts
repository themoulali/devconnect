import "dotenv/config"

import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not configured")
}

export interface AuthenticatedRequest extends Request {
  userId?: string
}

export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      data: null,
      message: "Authentication token required",
    })

    return
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string)

    if (
      typeof decoded !== "object" ||
      decoded === null ||
      !("userId" in decoded) ||
      typeof decoded.userId !== "string"
    ) {
      res.status(401).json({
        success: false,
        data: null,
        message: "Invalid authentication token",
      })

      return
    }

    req.userId = decoded.userId

    next()
  } catch (error) {
    console.error("❌ JWT verification failed")
    console.error(error)

    res.status(401).json({
      success: false,
      data: null,
      message: "Invalid or expired authentication token",
    })
  }
}