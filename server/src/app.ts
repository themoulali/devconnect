import express from "express"
import cors from "cors"
import authRoutes from "./auth/auth.routes.js"
import notificationRoutes from "./notifications.routes.js"

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  }),
)

app.use(express.json())

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    data: {
      status: "healthy",
    },
    message: "DevConnect API is running",
  })
})

app.use("/auth", authRoutes)
app.use("/notifications", notificationRoutes)

export default app