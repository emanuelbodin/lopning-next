'use server'
import { isUserAdmin } from '@/server/auth'
import { prisma } from '@/server/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const deleteCompetition = async (id: string) => {
  const isAdmin = await isUserAdmin()
  if (!isAdmin) redirect('/api/auth/signin')
  await prisma.result.deleteMany({ where: { competitionId: id } })
  await prisma.competition.delete({ where: { id } })
  redirect('/results/competition')
}

export const deleteCompetitor = async (id: string) => {
  const isAdmin = await isUserAdmin()
  if (!isAdmin) redirect('/api/auth/signin')
  await prisma.result.deleteMany({ where: { competitorId: id } })
  await prisma.competitor.delete({ where: { id } })
  revalidatePath('/results/competitors')
}

export const deleteResult = async (id: string) => {
  const isAdmin = await isUserAdmin()
  if (!isAdmin) redirect('/api/auth/signin')
  await prisma.result.delete({ where: { id } })
  revalidatePath(`/results/competition/${id}`)
}
