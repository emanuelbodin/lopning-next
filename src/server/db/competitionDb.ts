import { prisma } from '@/server/db'

export const competitionDb = {
  getCompetitionsByType: async (type: string) => {
    const competitions = await prisma.competitions.findMany({ where: { type: type } })
    return competitions
  },
  getCompetitionsByYearAndType: async (type: string, year: number) => {
    const competitions = await prisma.competitions.findMany({
      where: {
        date: {
          gte: new Date(year, 0, 1),
          lt: new Date(year + 1, 0, 1),
        },
        type,
      },
    })
    return competitions
  },
}
