// 9-api/api.test.js
const request = require('supertest');
const app = require('./api'); // import the express app
const { describe, it } = require('mocha');
const { expect } = require('chai');

describe('API Tests', () => {
  // Existing tests for '/' if needed...

  describe('GET /cart/:id', () => {
    it('should return 200 and correct message for valid numeric id', (done) => {
      request(app)
        .get('/cart/12')
        .expect(200)
        .end((err, res) => {
          expect(res.text).to.equal('Payment methods for cart 12');
          done();
        });
    });

    it('should return 404 for non-numeric id', (done) => {
      request(app)
        .get('/cart/hello')
        .expect(404, done);
    });

    it('should return 404 for decimal id', (done) => {
      request(app)
        .get('/cart/12.5')
        .expect(404, done);
    });

    it('should return 404 for negative id', (done) => {
      request(app)
        .get('/cart/-5')
        .expect(404, done);
    });
  });
});

