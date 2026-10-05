import db from "../db.js"
import { createNotification } from "./notification.service.js"

export async function sendConnectionRequest(
  requesterId: string,
  receiverId: string
) {
  if (requesterId === receiverId) {
    throw new Error("Cannot connect with yourself")
  }

  const existingConnection =
  (await db.orm.public.Connection
    .where({
      requesterId,
      receiverId,
    })
    .first()) ??
  (await db.orm.public.Connection
    .where({
      requesterId: receiverId,
      receiverId: requesterId,
    })
    .first())

  if (existingConnection) {
    throw new Error("Connection already exists")
  }

  const connection = await db.orm.public.Connection.create({
  requesterId,
  receiverId,
  status: "PENDING",
})

await createNotification(
  receiverId,
  "You received a new connection request.",
  requesterId
)

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

export async function acceptConnectionRequest(
  connectionId: string,
  receiverId: string
) {
  const connection = await db.orm.public.Connection
    .where({
      id: connectionId,
      receiverId,
      status: "PENDING",
    })
    .first()

  if (!connection) {
    throw new Error("Pending connection request not found")
  }

  const updatedConnection = await db.orm.public.Connection
  .where({ id: connectionId })
  .update({
    status: "ACCEPTED",
  })
 return updatedConnection
}

export async function getPendingConnectionRequests(
  receiverId: string
) {
  const connections = await db.orm.public.Connection
    .where({
      receiverId,
      status: "PENDING",
    })

  return connections
}