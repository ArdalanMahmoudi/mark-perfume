import { prisma } from "../prisma";
import { verifySession } from "../session";

export async function getCurrentUser() {
  const session = await verifySession();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.id },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      image: true,
    },
  });

  return user;
}