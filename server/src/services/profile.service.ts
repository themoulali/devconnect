
import db from "../db.js"

interface UpdateProfileInput {
  name?: string
}

export async function getProfile(userId: string) {
  const user = await db.orm.public.User
    .where({ id: userId })
    .first()

  if (!user) {
    throw new Error("User not found")
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}

export async function updateProfile(
  userId: string,
  input: UpdateProfileInput
) {
  const user = await db.orm.public.User
    .where({ id: userId })
    .first()

  if (!user) {
    throw new Error("User not found")
  }

  const updatedUser = await db.orm.public.User
    .where({ id: userId })
    .update({
      ...(input.name !== undefined && { name: input.name }),
    })

  if (!updatedUser) {
    throw new Error("User not found")
  }

  return {
    id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
    createdAt: updatedUser.createdAt,
    updatedAt: updatedUser.updatedAt,
  }
}
