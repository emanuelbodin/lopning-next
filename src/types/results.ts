export type ScoreboardRow = {
  competitorId: string
  competitorName: string
  points: number
  numberOfCompetitions: number
}

export type CompetitorResult = {
  id: string
  timeMin: number
  timeSec: number
  points: number
  competitionId: string
  competitionType: string
  competitionDate: string
}

export interface CompetitionResult {
  id: string
  timeMin: number
  timeSec: number
  points: number
  competitor: string
  competition: string
  competitorName?: string
}
