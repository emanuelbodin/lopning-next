import { prisma } from '@/server/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const competitors = await prisma.competitor.findMany()
  return NextResponse.json({ data: competitors })
}

export async function POST(request: Request) {
  const res = await request.json()
  const { name } = res.body as { name: string }
  const newCompetitor = await prisma.competitor.create({ data: { name } })
  return NextResponse.json({ data: newCompetitor })
}
