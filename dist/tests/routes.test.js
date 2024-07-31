"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const request = require('supertest');
const { app } = require('../app');
describe('Public Route "/"', () => {
    it('should return a HTML page without Token', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .get('/');
        expect(res.statusCode).toEqual(200);
    }));
});
describe('Routes to GET all elements Json without authorization', () => {
    it('should return an Error with number 401 trying to get all Rooms', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .get('/rooms');
        expect(res.body.error).toEqual(401);
    }));
    it('should return an Error with number 401 trying to get all Users', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .get('/users');
        expect(res.body.error).toEqual(401);
    }));
    it('should return an Error with number 401 trying to get all Bookings', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .get('/bookings');
        expect(res.body.error).toEqual(401);
    }));
    it('should return an Error with number 401 trying to get all Comments', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .get('/contact');
        expect(res.body.error).toEqual(401);
    }));
});
describe('Routes to GET all elements Json with authorization', () => {
    let cookie = null;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const loginRes = yield request(app)
            .post('/login')
            .send({ email: "Kevinagudomontil@gmail.com", password: "1234" });
        cookie = loginRes.headers['set-cookie'];
    }));
    it('should return a Json with rooms trying to get all Rooms', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .get('/rooms')
            .set('Cookie', cookie);
        expect(res.statusCode).toEqual(200);
    }));
    it('should return a Json with users trying to get all Users', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .get('/users')
            .set('Cookie', cookie);
        expect(res.statusCode).toEqual(200);
    }));
    it('should return a Json with bookings trying to get all Bookings', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .get('/bookings')
            .set('Cookie', cookie);
        expect(res.statusCode).toEqual(200);
    }));
    it('should return a Json with comments trying to get all Comments', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .get('/contact')
            .set('Cookie', cookie);
        expect(res.statusCode).toEqual(200);
    }));
});
describe('Routes to GET a single element Json without authorization', () => {
    it('should return an Error with number 401 trying to get the room with id 0', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .get('/rooms/66a8dd493f6d282a217fc179');
        expect(res.body.error).toEqual(401);
    }));
    it('should return an Error with number 401 trying to get all the user with id 0', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .get('/users/66a8dd4a3f6d282a217fc1c9');
        expect(res.body.error).toEqual(401);
    }));
    it('should return an Error with number 401 trying to get all the booking with id 0', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .get('/bookings/66a8dd493f6d282a217fc18d');
        expect(res.body.error).toEqual(401);
    }));
    it('should return an Error with number 401 trying to get all comment with id 0', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .get('/contact/66a8dd493f6d282a217fc1a1');
        expect(res.body.error).toEqual(401);
    }));
});
describe('Routes to GET a single element Json with authorization', () => {
    let cookie = null;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const loginRes = yield request(app)
            .post('/login')
            .send({ email: "Kevinagudomontil@gmail.com", password: "1234" });
        cookie = loginRes.headers['set-cookie'];
    }));
    it('should return the room Json trying to get the Room with id 0', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .get('/rooms/66a8dd493f6d282a217fc179')
            .set('Cookie', cookie);
        expect(res.statusCode).toEqual(200);
        expect(res.body._id).toEqual("66a8dd493f6d282a217fc179");
    }));
    it('should return the user Json trying to get the User with id 0', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .get('/users/66a8dd4a3f6d282a217fc1c9')
            .set('Cookie', cookie);
        expect(res.statusCode).toEqual(200);
        expect(res.body._id).toEqual("66a8dd4a3f6d282a217fc1c9");
    }));
    it('should return the booking Json trying to get the booking with id 0', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .get('/bookings/66a8dd493f6d282a217fc18d')
            .set('Cookie', cookie);
        expect(res.statusCode).toEqual(200);
        expect(res.body._id).toEqual("66a8dd493f6d282a217fc18d");
    }));
    it('should return the contact Json trying to get the comment with id 0', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .get('/contact/66a8dd493f6d282a217fc1a1')
            .set('Cookie', cookie);
        expect(res.statusCode).toEqual(200);
        expect(res.body._id).toEqual("66a8dd493f6d282a217fc1a1");
    }));
});
