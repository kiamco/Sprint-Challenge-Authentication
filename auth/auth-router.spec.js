const db = require('../database/dbConfig.js');
const request = require('supertest');
const authRouter = require('./auth-router');
const server = require('../api/server');

// the data access file we are testing
const UserDb = require('../models/userModel.js');

beforeEach(async() => {
    await db('users').truncate();
});


describe('Auth-router', () => {
    describe('create a user', () => {
        it('should createa a new user', async() => {
            await UserDb.addUser({ username: "test", password: "test" });
            await UserDb.addUser({ username: "test1", password: "test1" });
            const users = await db("users");

            expect(users).toHaveLength(2);
        });
    });

    setTimeout(() => {

        describe('login', () => {
            it('should login with right credentials', async() => {
                const credentials = {
                    username: "test",
                    password: "test"
                };

                const expectedBody = {
                    "message": `Welcome ${credentials.username}`
                }

                const login = await request(server).post('/api/login').send(credentials)

                expect(login.body).toEqual(expectedBody);
            })
        })

    }, 5000)


})