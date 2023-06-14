import { prisma } from '@/server/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const competitions = await prisma.competition.findMany()
  return NextResponse.json({ data: competitions })
}

export async function POST(request: Request) {
  const res = await request.json()
  const { categoryId, date } = res.body as { categoryId: string; date: string }
  const newCompetition = await prisma.competition.create({ data: { categoryId, date } })
  return NextResponse.json({ data: newCompetition })
}
