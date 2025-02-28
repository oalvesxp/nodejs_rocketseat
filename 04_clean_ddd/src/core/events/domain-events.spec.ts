import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityID } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  private aggregate: CustomAggregate // eslint-disable-line

  constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate
    this.ocurredAt = new Date()
  }

  public getAggregateId(): UniqueEntityID {
    return this.aggregate.id
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}

describe('Domain events', () => {
  it('Should be able to dipatch and listen to events', () => {
    const callbackSpy = vi.fn()

    // Subscriber created ex:(listening event 'answer-created')
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

    // Creating an answer without persist it on database
    const aggregate = CustomAggregate.create()

    // Ensuring the event was created but not dispatched
    expect(aggregate.domainEvents).toHaveLength(1)

    // Saving answer in the database and dispatching the event
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    // Subscriber listens to the event and does anythin they need to do with information
    expect(callbackSpy).toHaveBeenCalled()
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
