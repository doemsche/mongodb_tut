const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {

  let joe;

  beforeEach((done) => {
    joe = new User({name: 'joe'});
    joe.save()
      .then(() => {
        done();
      })
  })

  it('model instance remove', (done) => {
    joe.remove()
      // one liner (you can write without return)
      .then(() => User.findOne({name: 'joe'}))
      .then((user) => {
        assert(user === null);
        done();
      }); 
  });

  it('class method remove', (done) => {
    // multiple line needs return statement
    User.remove({name: 'joe'})
      .then(() => {
        return User.findOne({name:'joe'})
      })
      .then((user) => {
        assert(user === null);
        done()
      })
  });

  it('class method findAndRemove', (done) => {
    User.findOneAndRemove({name: 'joe'})
    .then(() => User.findOne({name: 'joe'}))
    .then((user) => {
        assert(user === null);
        done();
      }); 
  });

  it('class method findByIdRemove', (done) => {
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({naem:'joe'}))
      .then((user) =>{
        assert(user === null);
        done();
      })
  });

})