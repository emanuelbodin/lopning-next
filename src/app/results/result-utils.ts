import { prisma } from '@/server/db'
import { CompetitorResult, CompetitionResult } from '@/types/results'

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
