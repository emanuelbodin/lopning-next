import { getScoreboard } from '@/app/actions'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  {
    params: { year },
  }: {
    params: { year: string }
  }
) {
  const competitors = await getScoreboard(parseInt(year))
  return NextResponse.json({ data: competitors })
}
