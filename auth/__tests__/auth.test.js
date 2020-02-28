const request = require('supertest');
const bcrypt = require('bcryptjs');
const server = require('../../api/server');

describe("API/AUTH: GET /", () => {

    describe("Router Values", () => {

        it("should return 200 OK", async () =>{
            const res = await request(server).get('/api/auth')

            expect(res.status).toBe(200);
        })

        it("should return an array of users as router value", async () => {
    
            const res = await request(server).get('/api/auth')
            
            expect(Array.isArray(res.body)).toBe(true); 
        });

        it("should return JSON formatted body", async () => {
            const res =  await request(server).get('/api/auth')

            expect(res.type).toMatch(/json/);
        });
    });
});

describe("API/AUTH: POST /REGISTER", () =>{

    describe("POST new user", () => {

        let  data = {
            "username": "dummy",
            "password": "password12345"
        }

        it("should send username/password in body", async () => {
            const res = await request(server).post('/api/auth/register').send(data)
            
            expect(res.status).toBe(201);
        });

        it("should return json formatted body", async () => {
            const res = await request(server).post('/api/auth/register').send(data)
            
            expect(res.type).toMatch(/json/);
        });

    });
});
 

describe("API/AUTH: POST /LOGIN", () => {
    describe("POST login user", () => {

        let  data = {
            "username": "dummy",
            "password": "password12345"
        }

        it("should return status 200", async () => {
            const res = await request(server).post('/api/auth/login').send(data)

            expect(res.status).toBe(200);
        });

        it("should return json type", async () => {
            const res = await request(server).post('/api/auth/login').send(data)
            
            expect(res.type).toMatch(/json/)
        });

        it("should return json body properties ", async () =>{
            const res = await request(server).post('/api/auth/login').send(data)
            
            expect(res.body.message.user).toBe(`Welcome ${data.username}`);
            expect(res.body.message.token).toHaveLength(175);
        });
    })
})
