import { competitionDb } from '../db/competitionDb'
import { resultDb } from '../db/resultDb'
import { competitorDb } from '../db/competitorDb'
import { scoreboardRow } from '@/types/results'

export const getScoreboard = async (year: number) => {
  const competitions = await competitionDb.getCompetitionsByYearAndType('söndagstävling', year)
  const competitionIds = competitions.map((competition) => competition.id)
  const results = await resultDb.getResultsByComptitionIds(competitionIds)

  const scoreboard: scoreboardRow[] = []
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
        competitorId: competitorId.toString(),
        points,
        numberOfCompetitions: 1,
      })
    }
  })
  scoreboard.sort((a, b) => b.points - a.points)

  const competitors = await competitorDb.getByIds(competitorIds)
  scoreboard.forEach((scoreboardResult) => {
    const competitor = competitors.find(
      (competitor) => competitor.id.toString() === scoreboardResult.competitorId.toString()
    )
    scoreboardResult.competitorName = competitor ? competitor.name : undefined
  })

  return scoreboard
}
