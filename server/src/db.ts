import "dotenv/config"
import path from "node:path"
import { readFileSync } from "node:fs"
import postgres from "@prisma/orm-postgres/runtime"

const contractPath = path.join(
  __dirname,
  "prisma",
  "contract.json"
)

const contractJson = JSON.parse(
  readFileSync(contractPath, "utf-8")
)

const db = postgres({
  contractJson,
  url: process.env.DATABASE_URL!,
})

export default db