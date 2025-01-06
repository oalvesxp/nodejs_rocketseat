import { randomUUID } from 'node:crypto'

export class Answer {
  id: string
  content: string

  constructor(content: string, id?: string) {
    this.content = content
    this.id = id ?? randomUUID()
  }
}