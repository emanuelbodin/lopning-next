import { PrismaClient } from '@prisma/client'
import path from 'path'
import { promises as fs } from 'fs'

const prisma = new PrismaClient()
async function main() {
  await prisma.result.deleteMany()
  await prisma.competitor.deleteMany()
  await prisma.competition.deleteMany()
  await prisma.competitionCategory.deleteMany()

  const category1 = await prisma.competitionCategory.create({ data: { name: '5k' } })
  const category2 = await prisma.competitionCategory.create({ data: { name: '10k' } })
  const category3 = await prisma.competitionCategory.create({ data: { name: 'Biathlon (5k)' } })

  const jsonDirectory = path.join(process.cwd(), 'run')
  const competitionsString = await fs.readFile(jsonDirectory + '/competitions.json', 'utf8')
  const competitorsString = await fs.readFile(jsonDirectory + '/competitors.json', 'utf8')
  const resultsString = await fs.readFile(jsonDirectory + '/results.json', 'utf8')
  const competitions = JSON.parse(competitionsString) as any[]
  const competitors = JSON.parse(competitorsString) as any[]
  const results = JSON.parse(resultsString) as any[]
  let count = 0
  const competitorsWithOldId: any[] = []
  competitors.forEach(async (competitor) => {
    const newCompetitor = await prisma.competitor.create({ data: { name: competitor.name } })
    competitorsWithOldId.push({ ...newCompetitor, oldId: competitor._id['$oid'] })
  })

  competitions.forEach(async (competition) => {
    const categoryId =
      competition.type === 'söndagstävling'
        ? category1.id
        : competition.type === 'milen'
        ? category2.id
        : category3.id
    const newCompetition = await prisma.competition.create({
      data: { date: new Date(parseInt(competition.date['$date']['$numberLong'])), categoryId },
    })
    results.forEach(async (result) => {
      if (result.competition['$oid'] !== competition._id['$oid']) return
      const newCompetitor = competitorsWithOldId.find((c) => c.oldId === result.competitor['$oid'])
      await prisma.result.create({
        data: {
          timeMin: result.timeMin,
          timeSec: result.timeSec,
          points: result.points,
          competitionId: newCompetition.id,
          competitorId: newCompetitor.id,
        },
      })
      count++
      console.log(`${count}/${results.length}`)
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
