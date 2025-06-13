const request = require('supertest');
const { expect } = require('chai');
const app = require('./api');

describe('API Tests', () => {
  it('GET / should return welcome message', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.equal('Welcome to the payment system');
        done();
      });
  });

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

