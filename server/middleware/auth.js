const models = require('../models');
const Promise = require('bluebird');
// const cookie = require('./cookieParser.js')

module.exports.createSession = (req, res, next) => {
  // console.log(Object.keys(req.cookies));
  // console.log(req)
  let userId;
  let username;


  if (JSON.stringify(req.cookies) === '{}') {
    models.Sessions.create()
      .then((data) => models.Sessions.get({ id: data.insertId }))
      .then(data => {
        req.session = { hash: data.hash }

        res.cookies = {};
        res.cookies['shortlyid'] = { value: data.hash };
        next()
      })
  } else {
    models.Sessions.get({ hash: req.cookies.shortlyid })
      .then(data => {
        if (data) {
          userId = data.userId
        }
      })
      .then(() => {
        if (!userId) {
          req.session = { hash: req.cookies.shortlyid }
          next();
        } else {
          //get out user id from Sessions
          //get our user by id from users
          models.Users.get({ id: userId })
            .then(data => username = data.username)
            .then(() => {
              req.session = {};
              req.session.user = {};
              req.session.user.username = username;
              req.session.userId = userId;
              next();
            })
          //set session.user.username to equal it

        }
      })

    // console.log(req)
  }

  // next();
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

