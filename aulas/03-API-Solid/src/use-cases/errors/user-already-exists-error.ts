export class UserAlreadyExistisError extends Error {
  constructor() {
    super('E-mail already exists.')
  }
}
