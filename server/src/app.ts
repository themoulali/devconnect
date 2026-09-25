import express from "express"

const app = express()

app.use(express.json())

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    data: {
      status: "healthy"
    },
    message: "DevConnect API is running"
  })
})

export default app