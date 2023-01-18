const request = require('supertest');

const app = require('../src/app');

describe('Endpoint /api/v1/tasks', () => {
 
  it('should respond with 200 when called with GET request', (done) => {
  request(app)
    .get('/api/v1/tasks')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
  
  it('should return a list of tasks when called with GET', (done) => {
    const expected = [
      {
        id: 1,
        name: 'Feed the dog'
      },
      {
        id: 2,
        name: 'Repair the car'
      },
      {
        id: 3,
        name: 'Clean the apartment'
      },
    ]; 
      request(app)
        .get('/api/v1/tasks')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, expected, done);
  });

  it('should return the task when called with GET id', (done) => {
    const expected = {
      id: 2,
      name: 'Repair the car',
    };
    request(app)
      .get('/api/v1/tasks/2')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, expected, done);
  });

  it('should return 404 if nothing was found with the id', (done) => {
    request(app)
      .get('/api/v1/tasks/20')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, { message: 'Not found' }, done);
  });

  it('should return 201 when new task was added', async () => {
    await request(app)
      .post('/api/v1/tasks/')
      .set('Accept', 'application/json')
      .send({ id: 4, name: 'Go fishing' })
      .expect('Content-Type', /json/)
      .expect(201, { message: 'Added' });
    const expected = {
      id: 4,
      name: 'Go fishing',
    };
    await request(app)
      .get('/api/v1/tasks/4')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, expected);
  });

  it('should return 200 when task was updated', async () => {
    await request(app)
      .patch('/api/v1/tasks/3')
      .set('Accept', 'application/json')
      .send({ name: 'Go skiing' })
      .expect('Content-Type', /json/)
      .expect(200, { message: 'Updated' });
    // Check that it was actually added as well
    const expected = {
      id: 3,
      name: 'Go skiing',
    };
    await request(app)
      .get('/api/v1/tasks/3')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, expected);
  });
  
  it('should return 200 when task was deleted', async () => {
    await request(app)
      .delete('/api/v1/tasks/4')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, { message: 'Deleted' });
    await request(app)
      .get('/api/v1/tasks/4')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, { message: 'Not found' });
  });
  
});
