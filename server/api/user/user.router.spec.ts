const mockUserCtrlStub = {
  index: 'userCtrl.index',
  show: 'userCtrl.show',
  create: 'userCtrl.create',
  upsert: 'userCtrl.upsert',
  patch: 'userCtrl.patch',
  delete: 'userCtrl.delete'
}

const mockRouterStub = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn()
}

jest.mock('./user.controller', () => mockUserCtrlStub)

jest.mock('express', () => ({
  Router: () => mockRouterStub
}))

// Require the user routes with our stubbed out modules
const userRouter = require('./user.routes')

describe('User API Router:', () => {
  it('should return an express router instance', () => {
    expect(userRouter).toBe(mockRouterStub)
  })

  describe('GET /users', () => {
    it('should route to user.controller.index', () => {
      expect(mockRouterStub.get).toBeCalled()
    })
  })

  describe('GET /users/:id', () => {
    it('should route to user.controller.show', () => {
      expect(mockRouterStub.get).toBeCalledWith('/:id', 'userCtrl.show')
    })
  })

  describe('POST /users', () => {
    it('should route to user.controller.create', () => {
      expect(mockRouterStub.post).toBeCalledWith(
        '/',
        'userCtrl.create'
      )
    })
  })

  describe('PUT /users/:id', () => {
    it('should route to user.controller.upsert', () => {
      expect(mockRouterStub.put).toBeCalledWith(
        '/:id',
        'userCtrl.upsert'
      )
    })
  })

  describe('PATCH /users/:id', () => {
    it('should route to user.controller.upsert', () => {
      expect(mockRouterStub.patch).toBeCalledWith(
        '/:id',
        'userCtrl.patch'
      )
    })
  })

  describe('DELETE /users/:id', () => {
    it('should route to user.controller.delete', () => {
      expect(mockRouterStub.delete).toBeCalledWith(
        '/:id',
        'userCtrl.delete'
      )
    })
  })
})
