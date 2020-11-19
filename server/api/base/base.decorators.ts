export function bindthis (target: any, methodName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  const changeDescriptor: PropertyDescriptor = {
    configurable: true,
    get () {
      return originalMethod.bind(this)
    }
  }
  return changeDescriptor
}
