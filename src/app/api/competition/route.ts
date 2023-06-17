import { isUserAdmin } from '@/server/auth'
import { prisma } from '@/server/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const competitions = await prisma.competition.findMany()
  return NextResponse.json({ data: competitions })
}

export async function POST(request: Request) {
  const isAdmin = await isUserAdmin()
  if (!isAdmin) return new NextResponse('Unauthenticated', { status: 401 })
  const data = await request.json()
  const { categoryId, date } = data as { categoryId: string; date: string }
  const newCompetition = await prisma.competition.create({
    data: { categoryId, date: new Date(date) },
  })
  return NextResponse.json({ data: newCompetition })
}
