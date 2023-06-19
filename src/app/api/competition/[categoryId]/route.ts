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
  return NextResponse.json({ data: competitions })
}
