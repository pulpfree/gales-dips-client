import { renderHook, act } from '@testing-library/react-hooks'
import { nanoid } from 'nanoid'
import { useError } from './error-reducer'

const error1 = {
  id: nanoid(),
  message: 'test error One',
}
const error2 = {
  id: nanoid(),
  title: 'Serious Error dude',
  message: 'test error Two',
}
const error3 = {
  id: nanoid(),
  message: 'test error Three',
}

test('allows sending error', () => {
  const { result } = renderHook(() => useError([]))

  expect(result.current.errors).toEqual([])

  act(() => {
    result.current.send(error1)
  })

  expect(result.current.errors[0]).toEqual(error1)
  expect(result.current.errors[0].message).toEqual(error1.message)
  expect(result.current.errors[0].id).toEqual(error1.id)

  act(() => {
    result.current.send(error2)
  })

  expect(result.current.errors.length).toEqual(2)
  expect(result.current.errors[1].title).toEqual(error2.title)

  act(() => {
    result.current.send(error3)
  })

  expect(result.current.errors.length).toEqual(3)

  act(() => {
    result.current.dismiss(error2)
  })

  expect(result.current.errors.length).toEqual(2)
  expect(result.current.errors[0]).toEqual(error1)
  expect(result.current.errors[1]).toEqual(error3)

  act(() => {
    result.current.clear()
  })

  expect(result.current.errors.length).toEqual(0)
})
