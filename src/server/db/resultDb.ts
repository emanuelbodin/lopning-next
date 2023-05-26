import { prisma } from '@/server/db'

export const resultDb = {
  getResultsByComptitionIds: async (competitionIds: string[]) => {
    const results = await prisma.results.findMany({
      where: {
        competition: {
          in: competitionIds,
        },
      },
    })
    return results
  },
}
