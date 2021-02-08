import { renderHook, act } from '@testing-library/react-hooks'
import { subDays } from 'date-fns'

import { useDips } from './useDips'

// const stationID = '64493efb-faeb-4a80-9051-6a025ecb6347'
const date = new Date()
/**
 * todo: add tests
 */
describe('useDips methods', () => {
  it('sets loading variable', () => {
    const { result } = renderHook(() => useDips())
    expect(result.current.loading).toEqual(false)

    const lastDate = subDays(date, 1)
    act(() => {
      result.current.setDate(subDays(date, 1))
    })
    expect(result.current.date).toEqual(lastDate)
  })
})
