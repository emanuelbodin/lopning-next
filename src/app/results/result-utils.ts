import { prisma } from '@/server/db'
import { ScoreboardRow, CompetitorResult, CompetitionResult } from '@/types/results'

export const getScoreboard = async (year: number) => {
  const competitions = await prisma.competition.findMany({
    where: {
      date: {
        gte: new Date(year, 0, 1),
        lt: new Date(year + 1, 0, 1),
      },
      category: { name: 'Söndagstävling' },
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

export const getResultsByCompetitor = async (competitorId?: string) => {
  if (!competitorId) throw new Error('no id')
  const results = await prisma.result.findMany({ where: { competitorId } })
  results.sort((a, b) => a.timeMin * 60 + a.timeSec - (b.timeMin * 60 + b.timeSec))
  const competitionIds = results.map((result) => result.competitionId)
  const competitions = await prisma.competition.findMany({
    where: { id: { in: competitionIds } },
    include: { category: true },
  })
  const formattedResults: CompetitorResult[] = []
  results.forEach((result) => {
    const competition = competitions.find((competition) => competition.id === result.competitionId)
    if (!competition) return
    const { id, timeMin, timeSec, points } = result
    formattedResults.push({
      id,
      timeMin,
      timeSec,
      points,
      competitionId: competition.id,
      competitionType: competition.category.name,
      competitionDate: competition.date.toDateString(),
    })
  })
  return formattedResults
}

export const getResultsByCompetition = async (competitionId: string | undefined) => {
  if (!competitionId) throw new Error('no competiton id')
  const results = await prisma.result.findMany({ where: { competitionId } })
  results.sort((a, b) => a.timeMin * 60 + a.timeSec - (b.timeMin * 60 + b.timeSec))
  const competitorIds = results.map((result) => result.competitorId)
  const competitors = await prisma.competitor.findMany({ where: { id: { in: competitorIds } } })
  const formattedResults: CompetitionResult[] = []
  results.forEach((result) => {
    const competitor = competitors.find((competitor) => competitor.id === result.competitorId)
    const competitorName = competitor ? competitor.name : undefined
    const { id, timeMin, timeSec, points, competitionId } = result
    formattedResults.push({
      id,
      timeMin,
      timeSec,
      points,
      competitorName,
      competitor: competitor?.id ?? '',
      competition: competitionId,
    })
  })
  return formattedResults
}

export const getCompetitionCategories = async () => {
  const categories = await prisma.competitionCategory.findMany()
  return categories
}

export const getCompetitors = async () => {
  const competitors = await prisma.competitor.findMany()
  return competitors
}
