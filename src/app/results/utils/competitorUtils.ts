import { prisma } from '@/server/db'

export const getAllCompetitors = async () => {
  const competitors = await prisma.competitors.findMany()
  return competitors
}
