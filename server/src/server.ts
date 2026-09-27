import app from "./app.js"
import db from "./db.js"

const PORT = process.env.PORT || 5000

async function startServer() {
  try {
    await db.connect()

    console.log("✅ Neon database connected")

    app.listen(PORT, () => {
      console.log(`DevConnect API running on port ${PORT}`)
    })
  } catch (error) {
    console.error("❌ Neon database connection failed")
    console.error(error)
    process.exit(1)
  }
}

startServer()