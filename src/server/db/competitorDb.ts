import { prisma } from '../db'

export const competitorDb = {
  getByIds: async (ids: string[]) => {
    const competitors = await prisma.competitors.findMany({ where: { id: { in: ids } } })
    return competitors
  },
}
