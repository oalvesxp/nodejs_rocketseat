import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistisError } from './errors/user-already-exists-error'

describe('Register Use Case', () => {
  it('Should be able to register', async () => {
    const UsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(UsersRepository)

    const { user } = await registerUseCase.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should hash user password upon registration', async () => {
    const UsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(UsersRepository)

    const { user } = await registerUseCase.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.passwd_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('Should not be able to register with same email twice', async () => {
    const UsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(UsersRepository)

    const email = 'jhondoe@example.com'

    await registerUseCase.execute({
      name: 'Jhon Doe',
      email,
      password: '123456',
    })

    expect(() =>
      registerUseCase.execute({
        name: 'Jhon Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistisError)
  })
})
