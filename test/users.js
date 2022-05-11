import chai from 'chai';
import chaiHttp from 'chai-http';

import {
  getTestData,
  populate,
  truncate,
  validateResponse
} from './helpers/index.js';
import app from '../src/app.js';

chai.should();
chai.use(chaiHttp);

let testData;

describe('Users', () => {
  before(async () => {
    testData = getTestData();
  });

  beforeEach(async () => {
    await populate();
  });

  it('index', async () => {
    const responseSignIn = await chai.request(app)
      .post('/api/auth/login')
      .send({ data: testData.users.existing});

    const { accessToken } = responseSignIn.body.data;

    const response = await chai.request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${accessToken}`);

    response.should.have.status(200);
    response.body.should.be.a('object');
    response.body.data.should.be.a('array');
  });

  it('registration', async () => {
      const response = await chai.request(app)
        .post('/api/auth/register')
        .send({ data: testData.users.new});

    validateResponse(response);
  });

  it('login', async () => {
    const response = await chai.request(app)
      .post('/api/auth/login')
      .send({ data: testData.users.existing});

    validateResponse(response);
  });

  it('logout', async () => {
    const agent = chai.request.agent(app);
    await agent
      .post('/api/auth/login')
      .send({ data: testData.users.existing});

    // The `agent` now has the refreshToken cookie saved, and will send it
    // back to the server in the next request:
    const response = await agent
      .post('/api/auth/logout');

    response.should.not.to.have.cookie('refreshToken');
    agent.close();
  });

  it ('refresh', async () => {
    const agent = chai.request.agent(app);
    await agent
      .post('/api/auth/login')
      .send({ data: testData.users.existing});

    const response = await agent
      .get('/api/auth/refresh');

    validateResponse(response);
    agent.close();
  });

  afterEach(async () => {
    await truncate();
  });
});
