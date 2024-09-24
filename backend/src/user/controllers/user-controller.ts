import { Request, Response } from 'express'
import GetUsers from '../../user/services/getUsers'
import { injectable } from 'inversify'

@injectable()
export default class UserController {
  constructor(private getUsers: GetUsers) {}

  public async getAll(req: Request, res: Response) {
    const users = await this.getUsers.execute()

    return res.json(users)
  }
}
