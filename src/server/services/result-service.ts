import { prisma } from '../db'
import { competitionDb } from '../db/competitionDb'
import { resultDb } from '../db/resultDb'
import { competitorDb } from '../db/competitorDb'
import { ScoreboardRow, CompetitorResult, CompetitionResult } from '@/types/results'

export const getScoreboard = async (year: number) => {
  const competitions = await competitionDb.getCompetitionsByYearAndType('söndagstävling', year)
  const competitionIds = competitions.map((competition) => competition.id)
  const results = await resultDb.getResultsByComptitionIds(competitionIds)

  const scoreboard: ScoreboardRow[] = []
  const competitorIds: string[] = []
  results.forEach((result) => {
    const competitorId = result.competitor
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

  const competitors = await competitorDb.getByIds(competitorIds)
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
  const results = await prisma.results.findMany({ where: { competitor: competitorId } })
  results.sort((a, b) => a.timeMin * 60 + a.timeSec - (b.timeMin * 60 + b.timeSec))
  const competitionIds = results.map((result) => result.competition)
  const competitions = await prisma.competitions.findMany({ where: { id: { in: competitionIds } } })
  const formattedResults: CompetitorResult[] = []
  results.forEach((result) => {
    const competition = competitions.find(
      (competition) => competition.id.toString() === result.competition.toString()
    )
    const competitionDate = competition!.date.toISOString().split('T')[0]
    const { id, timeMin, timeSec, points, competition: competitionId } = result
    formattedResults.push({
      id,
      timeMin,
      timeSec,
      points,
      competitionId: competitionId.toString(),
      competitionType: competition?.type ?? 'no type',
      competitionDate,
    })
  })
  return formattedResults
}

export const getResultsByCompetition = async (competitionId: string | undefined) => {
  if (!competitionId) throw new Error('no competiton id')
  const results = await prisma.results.findMany({ where: { competition: competitionId } })
  results.sort((a, b) => a.timeMin * 60 + a.timeSec - (b.timeMin * 60 + b.timeSec))
  const competitorIds = results.map((result) => result.competitor)
  const competitors = await prisma.competitors.findMany({ where: { id: { in: competitorIds } } })
  const formattedResults: CompetitionResult[] = []
  results.forEach((result) => {
    const competitor = competitors.find(
      (competitor) => competitor.id.toString() === result.competitor.toString()
    )
    const competitorName = competitor ? competitor.name : undefined
    const { id, timeMin, timeSec, points, competition } = result
    formattedResults.push({
      id,
      timeMin,
      timeSec,
      points,
      competitorName,
      competitor: competitor ? competitor.toString() : '',
      competition: competition.toString(),
    })
  })
  return formattedResults
}
