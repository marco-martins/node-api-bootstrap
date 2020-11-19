import request from 'supertest'
import app from '../../app'
import { User } from './user.model'

describe('USER API', () => {
  let user: User

  afterAll(async () => {
    await User.deleteMany({})
  })

  describe('GET /users', () => {
    let users: User[]

    beforeEach(async () => {
      const res = await request(app).get('/users').expect(200).expect('Content-Type', /json/)
      users = res.body
    })

    it('should respond with JSON array', () => {
      expect(users).toBeInstanceOf(Array)
      expect(users).toHaveLength(0)
    })
  })

  describe('POST /users', () => {
    const payload = { firstName: 'John', lastName: 'Snow', email: 'john.snow@got.com', password: 'user-password' }
    it('should respond with a created user', async () => {
      const res = await request(app)
        .post('/users')
        .send(payload)
        .expect(201)

      user = res.body
    })

    it('should respond with user created', async () => {
      expect(user).toMatchObject(payload)
    })
  })

  describe('GET /users/:id', () => {
    beforeEach(async () => {
      const res = await request(app).get(`/users/${user._id}`).expect(200)
      user = res.body
    })

    it('should respond with the requested user', () => {
      expect(user).toMatchObject({ firstName: 'John', lastName: 'Snow', email: 'john.snow@got.com' })
    })
  })

  describe('PUT /users/:id', () => {
    const payload = { firstName: 'Daenerys', lastName: 'Targaryen', email: 'daenerys.targaryen@got.com' }

    beforeAll(async () => {
      const res = await request(app)
        .put(`/users/${user._id}`)
        .send(payload)
        .expect(200)

      user = res.body
    })

    it('should respond with the updated user', () => {
      expect(user).toMatchObject(payload)
    })

    it('should respond with the updated user on a subsequent GET', async () => {
      const res = await request(app).get(`/users/${user._id}`).expect(200)
      user = res.body
      expect(user).toMatchObject(payload)
    })
  })

  describe('PATCH /users/:id', () => {
    beforeAll(async () => {
      const res = await request(app)
        .patch(`/users/${user._id}`)
        .send([
          { op: 'replace', path: '/firstName', value: 'Sansa' },
          { op: 'replace', path: '/lastName', value: 'Stark' },
          { op: 'replace', path: '/email', value: 'sansa.stark@got.com' }
        ])
        .expect(200)

      user = res.body
    })

    it('should respond with the patched user', () => {
      expect(user).toMatchObject({ firstName: 'Sansa', lastName: 'Stark', email: 'sansa.stark@got.com' })
    })
  })

  describe('DELETE /users/:id', () => {
    it('should respond with 204 on successful removal', async () => {
      await request(app)
        .delete(`/users/${user._id}`)
        .expect(204)
    })

    it('should respond with 404 when user does not exist', async () => {
      await request(app)
        .get(`/users/${user._id}`)
        .expect(404)
    })
  })
})
