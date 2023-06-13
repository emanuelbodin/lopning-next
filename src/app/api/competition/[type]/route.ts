import { prisma } from '@/server/db'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { id: string }
  }
) {
  const { id } = params
  const competitions = await prisma.competition.findMany({ where: { category: { id } } })
  return NextResponse.json({ data: competitions })
}
