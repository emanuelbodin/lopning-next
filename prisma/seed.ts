import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  await prisma.competitionCategory.deleteMany()
  await prisma.competition.deleteMany()
  await prisma.competitor.deleteMany()
  await prisma.result.deleteMany()

  const category1 = await prisma.competitionCategory.create({ data: { name: 'Söndagstävling' } })
  const competitor1 = await prisma.competitor.create({ data: { name: 'competitor1' } })
  const competition1 = await prisma.competition.create({
    data: { date: new Date(), categoryId: category1.id },
  })
  await prisma.result.create({
    data: {
      competitorId: competitor1.id,
      competitionId: competition1.id,
      points: 3,
      timeMin: 20,
      timeSec: 15,
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
