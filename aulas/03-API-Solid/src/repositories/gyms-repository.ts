import { Gym } from '@prisma/client'

export class GymsRepository {
  findById(id: string): Promise<Gym | null>
}
