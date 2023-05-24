import { useQuery } from '@tanstack/react-query'
import { ScoreBoardResult } from 'common/interfaces/running.interface'
import { get } from 'common/api/api'
import { useAppDispatch } from 'app/store/hooks'
import { setToast } from 'toast/toast-slice'

export default function useGetScoreboard(year: string | undefined) {
  const dispatch = useAppDispatch()
  const onError = () => {
    dispatch(
      setToast({
        message: 'Could not load scoreboard',
        type: 'error',
        isVisible: true,
      })
    )
  }
  const { data = [] as ScoreBoardResult[], isFetching } = useQuery(
    ['scoreboard', year],
    () => get<ScoreBoardResult[]>(`/result/scoreboard/${year}`),
    { onError, enabled: !!year }
  )
  return { data, isFetching }
}
