const request = require('supertest')
const { app } = require('../app')
import roomData from '../data/rooms.json'
import userData from '../data/users.json'
import bookingData from '../data/bookings.json'
import contactData from '../data/comments.json'

describe('Public Route "/"', () => {
    it('should return a HTML page without Token', async() => {
      const res = await request(app)
      .get('/')

      expect(res.statusCode).toEqual(200)
    })
})

describe('Routes to GET all elements Json without authorization', () => {
  it('should return an Error with number 401 trying to get all Rooms', async() => {
    const res = await request(app)
    .get('/rooms')

    expect(res.body.error).toEqual(401)
  })
  it('should return an Error with number 401 trying to get all Users', async() => {
    const res = await request(app)
    .get('/users')

    expect(res.body.error).toEqual(401)
  })
  it('should return an Error with number 401 trying to get all Bookings', async() => {
    const res = await request(app)
    .get('/bookings')

    expect(res.body.error).toEqual(401)
  })
  it('should return an Error with number 401 trying to get all Comments', async() => {
    const res = await request(app)
    .get('/contact')

    expect(res.body.error).toEqual(401)
  })
})

describe('Routes to GET all elements Json with authorization', () => {
  let cookie: any = null;

  beforeAll(async () => {
    const loginRes = await request(app)
      .post('/login')
      .send({ email: "Kevinagudomontil@gmail.com", password: "1234" });
    cookie = loginRes.headers['set-cookie'];
  });

  it('should return a Json with rooms trying to get all Rooms', async() => {
    const res = await request(app)
    .get('/rooms')
    .set('Cookie', cookie);

    expect(res.body).toEqual(roomData)
  })
  it('should return a Json with users trying to get all Users', async() => {
    const res = await request(app)
    .get('/users')
    .set('Cookie', cookie);

    expect(res.body).toEqual(userData)
  })
  it('should return a Json with bookings trying to get all Bookings', async() => {
    const res = await request(app)
    .get('/bookings')
    .set('Cookie', cookie);

    expect(res.body).toEqual(bookingData)
  })
  it('should return a Json with comments trying to get all Comments', async() => {
    const res = await request(app)
    .get('/contact')
    .set('Cookie', cookie);

    expect(res.body).toEqual(contactData)
  })
})

describe('Routes to GET a single element Json without authorization', () => {
  it('should return an Error with number 401 trying to get the room with id 0', async() => {
    const res = await request(app)
    .get('/rooms/0')

    expect(res.body.error).toEqual(401)
  })
  it('should return an Error with number 401 trying to get all the user with id 0', async() => {
    const res = await request(app)
    .get('/users/0')

    expect(res.body.error).toEqual(401)
  })
  it('should return an Error with number 401 trying to get all the booking with id 0', async() => {
    const res = await request(app)
    .get('/bookings/0')

    expect(res.body.error).toEqual(401)
  })
  it('should return an Error with number 401 trying to get all comment with id 0', async() => {
    const res = await request(app)
    .get('/contact/0')

    expect(res.body.error).toEqual(401)
  })
})

describe('Routes to GET a single element Json with authorization', () => {
  let cookie: any = null;

  beforeAll(async () => {
    const loginRes = await request(app)
      .post('/login')
      .send({ email: "Kevinagudomontil@gmail.com", password: "1234" });
    cookie = loginRes.headers['set-cookie'];
  });

  it('should return the room Json trying to get the Room with id 0', async() => {
    const res = await request(app)
    .get('/rooms/0')
    .set('Cookie', cookie);

    expect(res.body).toEqual(roomData[0])
  })
  it('should return the user Json trying to get the User with id 0', async() => {
    const res = await request(app)
    .get('/users/0')
    .set('Cookie', cookie);

    expect(res.body).toEqual(userData[0])
  })
  it('should return the booking Json trying to get the booking with id 0', async() => {
    const res = await request(app)
    .get('/bookings/0')
    .set('Cookie', cookie);

    expect(res.body).toEqual(bookingData[0])
  })
  it('should return the contact Json trying to get the comment with id 0', async() => {
    const res = await request(app)
    .get('/contact/0')
    .set('Cookie', cookie);

    expect(res.body).toEqual(contactData[0])
  })
})