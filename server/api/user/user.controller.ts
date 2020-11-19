import { BaseController } from '../base/base.controller'
import { User } from './user.model'

export class UserController extends BaseController<User> {
  constructor () {
    super(User)
  }

  /**
   * This class inherits the basic CRUD from base controller,
   * you overwrite the methods or remove the extends
   * to implement your ones.
   * */
}

export default new UserController()
