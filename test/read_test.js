const assert = require('assert');
const User = require('../src/user');

describe('Read a user from the db', () =>{
  let joe, maria, alex, zach;

  beforeEach((done) => {
    alex = new User({name: 'alex'});
    maria = new User({name: 'maria'});
    joe = new User({name: 'joe'});
    zach = new User({name: 'zach'});
    Promise.all([alex.save(),maria.save(),joe.save(),zach.save()])
      .then(()=>done());
  })

  it('finds all users with name joe', (done) =>{
    User.find({name:'joe'})
      .then((users)=>{
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      })
  });

  it('finds a user with a particular id', (done) =>{
    User.findOne({_id: joe._id })
      .then((user)=>{
        assert(user.name === 'joe')
        done()
      });
  })

  it('can skip and limit the result set', (done) =>{
      User.find({})
        .sort({ name: 1 })
        .skip(1)
        .limit(2)
        .then((users) => {
          assert(users.length === 2)
          assert(users[0].name === "joe");
          assert(users[1].name === "maria");
          done()
        })
  });

});