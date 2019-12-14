const db = require('../database/dbConfig.js');
const request = require('supertest');
const server = require('../api/server');

// the data access file we are testing
const UserDb = require('../models/userModel.js');

beforeEach(async() => {
    await db('users').truncate();
});

describe('Jokes Router', () => {
    describe('is it getting the jokes after login', () => {
        describe('create a user', () => {
            it('should createa a new user', async() => {
                await UserDb.addUser({
                    username: "kim",
                    password: "test"
                });

                const users = await db("users");

                expect(users).toHaveLength(1);
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
                    if (login.status === 201) {
                        const jokes = await request(server).get('/api/jokes')
                        expect(jokes.status).toBe(200);
                    }
                })
            })

        }, 7000)


    })
})