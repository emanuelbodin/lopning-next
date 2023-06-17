import { getServerSession, type NextAuthOptions } from 'next-auth'
import Email from 'next-auth/providers/email'
import { PrismaAdapter } from '@auth/prisma-adapter'
import type { Adapter } from 'next-auth/adapters'

import { prisma } from '@/server/db'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    Email({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
}

export const getServerAuthSession = () => {
  return getServerSession(authOptions)
}

export const isUserAdmin = async () => {
  const session = await getServerAuthSession()
  if (!session) return false
  const user = await prisma.user.findUnique({ where: { email: session.user?.email! } })
  return user?.role === 'ADMIN'
}
