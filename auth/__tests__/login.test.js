const request = require('supertest');
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

    describe("Router Values", () => {


    })
})
