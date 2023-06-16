import { redirect } from 'next/navigation'
import { isUserAdmin } from '@/server/auth'

export default async function CreateLayout({ children }: { children: React.ReactNode }) {
  const isAdmin = await isUserAdmin()
  if (!isAdmin) redirect('/api/auth/signin')
  return <div className="flex w-full justify-center p-5 h-full">{children}</div>
}
