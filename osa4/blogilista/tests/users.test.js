const assert = require('node:assert')
const bcrypt = require('bcrypt')
const helper = require('../utils/list_helper')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const initialUsers = [
  {
    username: 'moore',
    name: 'Moore Mike',
    password: 'salainen',
  },
  {
    username: 'doore',
    name: 'Moore Don',
    password: 'salainen2',
  },
  {
    username: 'hoore',
    name: 'Humphrey Odessa',
    password: 'secret',
  },
]

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Moore Matt',
      password: 'salaisuus',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(result.body.error, 'expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'moore',
      name: 'Matt Doore',
      password: 'sa',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(result.body.error, 'password missing or too short, minimum length is 3')

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'moore',
      name: 'Matt Doore',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(result.body.error, 'password missing or too short, minimum length is 3')

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'MD',
      name: 'Matt Doore',
      password: 'test123',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(result.body.error, 'User validation failed: username: Path `username` (`MD`) is shorter than the minimum allowed length (3).')

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})