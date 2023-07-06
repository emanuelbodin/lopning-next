import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getRandomDate = (startDate: Date, endDate: Date) => {
  const timeDiff = endDate.getTime() - startDate.getTime()
  const randomOffset = Math.random() * timeDiff
  const randomDate = new Date(startDate.getTime() + randomOffset)
  return randomDate
}

async function main() {
  await prisma.result.deleteMany()
  await prisma.competitor.deleteMany()
  await prisma.competition.deleteMany()
  await prisma.competitionCategory.deleteMany()

  const category1 = await prisma.competitionCategory.create({ data: { name: '5k' } })
  const category2 = await prisma.competitionCategory.create({ data: { name: '10k' } })
  for (const index in Array(5).fill(1)) {
    await prisma.competitor.create({ data: { name: `competitor${index}` } })
  }
  for (const _ in Array(10).fill(1)) {
    await prisma.competition.create({
      data: {
        date: getRandomDate(new Date('2022-01-01'), new Date('2023-06-30')),
        categoryId: category1.id,
      },
    })
  }
  for (const _ in Array(3).fill(1)) {
    await prisma.competition.create({
      data: {
        date: getRandomDate(new Date('2022-01-01'), new Date('2023-06-30')),
        categoryId: category2.id,
      },
    })
  }

  // Create results
  const allCompetitions = await prisma.competition.findMany()
  const allCompetitors = await prisma.competitor.findMany()
  allCompetitions.forEach((competition) => {
    const pointsAndTime: { timeMin: number; timeSec: number; points: number }[] = Array(
      allCompetitors.length - 2
    ).fill({
      timeMin: Math.floor(Math.random() * (40 - 20 + 1) + 25),
      timeSec: Math.floor(Math.random() * 60),
      points: 1,
    })
    pointsAndTime.push({
      timeMin: Math.floor(Math.random() * (24 - 20 + 1) + 23),
      timeSec: Math.floor(Math.random() * 60),
      points: 2,
    })
    pointsAndTime.push({
      timeMin: Math.floor(Math.random() * (22 - 20 + 1) + 20),
      timeSec: Math.floor(Math.random() * 60),
      points: 3,
    })
    pointsAndTime.sort(() => 0.5 - Math.random())
    allCompetitors.forEach(async (competitor, index) => {
      const { points, timeMin, timeSec } = pointsAndTime[index]
      await prisma.result.create({
        data: {
          competitorId: competitor.id,
          competitionId: competition.id,
          points,
          timeMin,
          timeSec,
        },
      })
    })
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
