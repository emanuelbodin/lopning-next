import { prisma } from '@/server/db'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { categoryId: string }
  }
) {
  const { categoryId } = params
  const competitions = await prisma.competition.findMany({ where: { categoryId } })
  const sortedCompetitions = competitions.sort(
    (a, b) => a.date.getMilliseconds() - b.date.getMilliseconds()
  )

  return NextResponse.json({ data: sortedCompetitions })
}
