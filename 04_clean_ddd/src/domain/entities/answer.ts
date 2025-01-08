import { Entity } from '../../core/entities/Entity'
import { UniqueEntityID } from '../../core/entities/unique-entity-id'

interface AnswerProps {
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {

  constructor(props: AnswerProps, id?: string) {
    super(props, id)
  }

  get content() {
    return this.props.content
  }
}