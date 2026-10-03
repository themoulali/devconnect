import db from "../db.js"

export async function sendConnectionRequest(
  requesterId: string,
  receiverId: string
) {
  if (requesterId === receiverId) {
    throw new Error("Cannot connect with yourself")
  }

  const existingConnection = await db.orm.public.Connection
    .where({
      requesterId,
      receiverId,
    })
    .first()

  if (existingConnection) {
    throw new Error("Connection already exists")
  }

  const connection = await db.orm.public.Connection.create({
    requesterId,
    receiverId,
    status: "PENDING",
  })

  return connection
}

export async function getConnection(
  requesterId: string,
  receiverId: string
) {
  const connection = await db.orm.public.Connection
    .where({
      requesterId,
      receiverId,
    })
    .first()

  return connection
}