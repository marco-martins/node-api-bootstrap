import mongoose from 'mongoose'

export interface User extends mongoose.Document {
  firstName: string
  lastName: string
  email: string
  password: string

  fullName:Function
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    select: false
  }
})

userSchema.methods = {
  fullName () {
    return `${this.firstName} ${this.lastName}`
  }
}

// eslint-disable-next-line no-redeclare
export const User = mongoose.model<User>('User', userSchema)
