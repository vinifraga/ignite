import { test, expect } from 'vitest'

test('o usuário consegue criar uma nova transação', () => {
  const responseStatusCode = 201

  expect(responseStatusCode).toEqual(201)
})
