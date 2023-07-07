const request = require('supertest')
const app = require('../server')

describe("Calendar router test", () => {
    test('should return a 200 status code', async () => {
        let agent = request.agent(app);
        const res = await agent
          .get('/calendar')
        expect(res.statusCode).toEqual(200)
      })
})