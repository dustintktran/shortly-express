const models = require('../models');
const Promise = require('bluebird');
// const cookie = require('./cookieParser.js')

module.exports.createSession = (req, res, next) => {
  // console.log(Object.keys(req.cookies));
  console.log(req)
  // let userId = models.Sessions.get({hash:req.cookies.shortlyid});
  if (JSON.stringify(req.cookies) === '{}') {
    models.Sessions.create()
      .then((data) => models.Sessions.get({id:data.insertId}))
      .then(data => {
        req.session = {hash: data.hash}

        res.cookies = {};
        res.cookies['shortlyid'] = {value: data.hash};
      })
      .then(() => next())
  } else if (true) {
    console.log(req)
    req.session = {hash: req.cookies.shortlyid}
    next();
  } else {
    //get out user id from Sessions
    //get our user by id from users
    //set session.user.username to equal it
  }

  // next();
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

