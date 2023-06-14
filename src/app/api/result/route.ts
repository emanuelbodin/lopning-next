import { prisma } from '@/server/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const res = await request.json()
  console.log(res)
  const { points, timeMin, timeSec, competitionId, competitorId } = res as {
    points: number
    timeMin: number
    timeSec: number
    competitionId: string
    competitorId: string
  }
  const newResult = await prisma.result.create({
    data: { points, timeMin, timeSec, competitionId, competitorId },
  })
  return NextResponse.json({ data: newResult })
}
