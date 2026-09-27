import express from "express"
import authRoutes from "./auth/auth.routes.js"

const app = express()

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

export default app