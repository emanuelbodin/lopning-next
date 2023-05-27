import { prisma } from '@/server/db'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { type: string }
  }
) {
  const type = params.type
  const competitions = await prisma.competitions.findMany({ where: { type } })
  return NextResponse.json({ data: competitions })
}
