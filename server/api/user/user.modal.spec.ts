import { User } from './user.model'
// NOTE: We need to use 'require' to setup DB connect
require('../../app')

describe('USER MODEL', () => {
  const userMock = { firstName: 'John', lastName: 'Snow', email: 'john.snow@got.com', password: 'user-password' }
  let user: User

  beforeAll(async () => {
    user = await User.create(userMock)
  })

  afterAll(async () => {
    await User.deleteMany({})
  })

  it('should return the full name', () => {
    expect(user.fullName()).toBe('John Snow')
  })
})
