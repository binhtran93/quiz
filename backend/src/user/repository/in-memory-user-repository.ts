import { User } from '../models/user'
import { injectable } from 'inversify'
import UserRepository from './user-repository'
import { users } from '../../fake'

@injectable()
export default class InMemoryUserRepository implements UserRepository {
  private users: User[]

  constructor() {
    this.users = users
  }

  public findAll(): Promise<User[]> {
    return Promise.resolve(this.users)
  }

  public findById(id: string): Promise<User | null> {
    return Promise.resolve(this.users.find((u) => u.id === id) ?? null)
  }
}
