import { Slug } from './value-objects/slug'
import { Entity } from '../../core/entities/Entity'

interface QuestionProps {
  title: string
  content: string
  slug: Slug
  authorId: string
}

export class Question extends Entity<QuestionProps> {

  constructor(props: QuestionProps, id?: string) {
    super(props, id)
  }
}
