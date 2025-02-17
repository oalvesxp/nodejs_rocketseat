import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { ReadNotificationUseCase } from './read-notification'

import { makeNotification } from 'test/factories/make-notification'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: ReadNotificationUseCase

describe('Read notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('Should be able to read a notification', async () => {
    const newNotification = makeNotification()

    await inMemoryNotificationsRepository.create(newNotification)

    const result = await sut.execute({
      notificationId: newNotification.id.toString(),
      recipientId: newNotification.recipientId.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(
      expect.any(Date),
    )
  })

  it('Should not be able to read a notification from another user', async () => {
    const newNotification = makeNotification()

    await inMemoryNotificationsRepository.create(newNotification)

    const result = await sut.execute({
      notificationId: newNotification.id.toString(),
      recipientId: '1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
