import { prisma } from '@/server/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const competitors = await prisma.competitor.findMany()
  return NextResponse.json({ data: competitors })
}
