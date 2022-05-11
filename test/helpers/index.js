import { URL } from 'url';
import fs from 'fs';
import path from 'path';
import User from '../../src/models/User.js';

const getFixturePath = (filename) => path.join('..', '..', 'fixtures', filename);
const readFixture = (filename) => fs.readFileSync(new URL(getFixturePath(filename), import.meta.url), 'utf-8').trim();
const getFixtureData = (filename) => JSON.parse(readFixture(filename));

export const getTestData = () => getFixtureData('testData.json');

export const populate = async () => {
  await User.bulkCreate(getFixtureData('users.json'), { individualHooks: true });
};

export const truncate = () => User.destroy({ truncate : true });

export const validateResponse = (response) => {
  response.should.have.status(200);
  response.should.to.have.cookie('refreshToken');
  response.body.should.be.a('object');
  response.body.should.have.property('data');
  response.body.data.should.have.property('accessToken');
  response.body.data.should.have.property('refreshToken');
  response.body.data.should.have.property('user');
}
