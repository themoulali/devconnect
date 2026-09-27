import bcrypt from "bcrypt"
import db from "../db.js"
import { generateAccessToken } from "./auth.utils.js"

interface RegisterInput {
  name: string
  email: string
  password: string
}

export async function registerUser(input: RegisterInput) {
  const { name, email, password } = input

  const existingUser = await db.orm.public.User
    .where({ email })
    .first()

  if (existingUser) {
    throw new Error("Email already registered")
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await db.orm.public.User.create({
    name,
    email,
    password: hashedPassword,
  })

  const accessToken = generateAccessToken(user.id as string)

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
    accessToken,
  }
}

export async function loginUser(email: string, password: string) {
  const user = await db.orm.public.User
    .where({ email })
    .first()

  if (!user || !user.password) {
    throw new Error("Invalid email or password")
  }

  const passwordMatches = await bcrypt.compare(
    password,
    user.password as string
  )

  if (!passwordMatches) {
    throw new Error("Invalid email or password")
  }

  const accessToken = generateAccessToken(user.id as string)

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
    accessToken,
  }
}