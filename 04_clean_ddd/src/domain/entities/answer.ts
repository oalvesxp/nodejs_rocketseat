import { Entity } from '../../core/entities/Entity'

interface AnswerProps {
  content: string
  authorId: string
  questionId: string
}

export class Answer extends Entity<AnswerProps> {
  constructor(props: AnswerProps, id?: string) {
    super(props, id)
  }

  get content() {
    return this.props.content
  }
}