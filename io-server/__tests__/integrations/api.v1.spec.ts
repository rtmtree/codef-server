import request from 'supertest'
import server from '../../src/server'
describe('API V1', () => {
  it('status check should return empty user', async () => {
    const status = await request(server)
      .get('/api/health')
      .expect('Content-Type', /json/)
      .then((result) => result.body)

    expect(status.totalClients).toBe(0)
    expect(status.clients).toEqual([])
  })
})
