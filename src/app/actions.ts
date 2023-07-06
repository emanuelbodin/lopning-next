'use server'
import { prisma } from '@/server/db'
import { ScoreboardRow } from '@/types/results'

export const getYears = async () => {
  const competitions = await prisma.competition.findMany({
    select: {
      date: true,
    },
    orderBy: {
      date: 'asc',
    },
  })

  const yearsSet = new Set<string>()

  competitions.forEach((competition) => {
    const year = competition.date.getFullYear().toString()
    yearsSet.add(year)
  })

  const years = Array.from(yearsSet)
  return years
}

export const getScoreboard = async (year?: number) => {
  if (!year) return []
  const competitions = await prisma.competition.findMany({
    where: {
      date: {
        gte: new Date(year, 0, 1),
        lt: new Date(year + 1, 0, 1),
      },
      category: { name: '5k' },
    },
  })
  const competitionIds = competitions.map((competition) => competition.id)
  const results = await prisma.result.findMany({
    where: {
      competitionId: {
        in: competitionIds,
      },
    },
  })
  const scoreboard: ScoreboardRow[] = []
  const competitorIds: string[] = []
  results.forEach((result) => {
    const competitorId = result.competitorId
    if (!competitorIds.includes(competitorId)) competitorIds.push(competitorId)
    const points = result.points
    const existingScore = scoreboard.find(
      (score) => score.competitorId.toString() === competitorId.toString()
    )
    if (existingScore) {
      existingScore.points += points
      existingScore.numberOfCompetitions += 1
    } else {
      scoreboard.push({
        competitorId,
        competitorName: 'no name',
        points,
        numberOfCompetitions: 1,
      })
    }
  })
  scoreboard.sort((a, b) => b.points - a.points)

  const competitors = await prisma.competitor.findMany({ where: { id: { in: competitorIds } } })
  scoreboard.forEach((scoreboardResult) => {
    const competitor = competitors.find(
      (competitor) => competitor.id === scoreboardResult.competitorId
    )
    scoreboardResult.competitorName = competitor ? competitor.name : 'no name'
  })

  return scoreboard
}
